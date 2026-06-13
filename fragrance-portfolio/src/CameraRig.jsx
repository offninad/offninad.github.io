import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import gsap from 'gsap'

/*
 * Camera = OrbitControls (free drag/zoom anytime) + GSAP.
 * Clicking a section tweens the orbit *spherical* (radius/polar/azimuth) and
 * the target to a preset pose, rebuilding camera.position from them each
 * frame so OrbitControls (with damping) never fights the tween. Controls are
 * disabled mid-flight, then handed back. During free orbit we read the angles
 * and report the nearest section so the HUD can highlight in sync.
 */
const POSES = {
  intro: { pos: [0, 9, 0.02], tgt: [0, 0.2, 0] },
  home: { pos: [0, 0.35, 6.2], tgt: [0, 0.25, 0] },
  experience: { pos: [0, 0.3, -5.5], tgt: [0, 0.15, 0] }, // square to the back label
  education: { pos: [1.5, 3.1, 3.4], tgt: [0, 0.95, 0] }, // high angle on the cap
  // Stay off the polar singularity so OrbitControls retains a stable azimuth
  // and the plate lettering remains oriented toward the user.
  projects: { pos: [0, 5.4, 3.2], tgt: [0, -1.34, 0] },
  // Aim at the glass base from just above the plate instead of orbiting below
  // it, where the plate would occlude the bottle and trigger near-plane clips.
  beyond: { pos: [0, -1.27, 4.35], tgt: [0, -1.02, 0] },
}

function poseFor(section, mobile) {
  const v = POSES[section] ?? POSES.home
  if (!mobile || section === 'intro') return v
  // Portrait home: ride the bottle high in the frame (aim below it) so the
  // hero text + dock have clear room in the lower third.
  if (section === 'home') {
    return { pos: [0, 1.35, 8.0], tgt: [0, -0.7, 0] }
  }
  // Other sections: pull back and lift framing so the bottom sheet doesn't
  // cover the focal point.
  return {
    pos: [v.pos[0] * 0.7, v.pos[1] * 0.82 + 0.15, v.pos[2] * 1.25],
    tgt: [v.tgt[0], v.tgt[1] + 0.15, v.tgt[2]],
  }
}

/* Spherical (radius, polar=phi, azimuth=theta) of a camera pose about target. */
function sphericalOf(pose) {
  const off = new THREE.Vector3(...pose.pos).sub(new THREE.Vector3(...pose.tgt))
  const s = new THREE.Spherical().setFromVector3(off)
  return { radius: s.radius, polar: s.phi, azimuth: s.theta }
}

/* Map current orbit angles to the section the user is "looking at". */
function nearestSection(azimuth, polar) {
  if (polar < 0.65) return 'projects' // looking down at the plate
  if (polar > 1.61) return 'beyond' // low, gazing up at the base
  const a = Math.abs(azimuth)
  if (a > 2.0) return 'experience' // behind the bottle
  if (polar < 1.2 && a < 1.0) return 'education' // raised, toward the cap
  return 'home'
}

export default function CameraRig({ section, onSync }) {
  const camera = useThree((s) => s.camera)
  const size = useThree((s) => s.size)
  const controls = useRef()
  const animating = useRef(false)
  const lastSync = useRef('home')
  const mobile = size.width / size.height < 0.78

  useEffect(() => {
    const c = controls.current
    if (!c) return
    const pose = poseFor(section, mobile)
    const end = sphericalOf(pose)
    const isFlyIn = section === 'home' && camera.position.y > 6
    const duration = isFlyIn ? 2.6 : 1.6
    const ease = isFlyIn ? 'power4.inOut' : 'power3.inOut'

    // Start from wherever the orbit currently is.
    const startOff = camera.position.clone().sub(c.target)
    const startS = new THREE.Spherical().setFromVector3(startOff)
    const state = {
      radius: startS.radius,
      polar: startS.phi,
      azimuth: startS.theta,
      tx: c.target.x,
      ty: c.target.y,
      tz: c.target.z,
    }
    // Always choose the shortest arc. Without this normalization, entering the
    // back view from a negative azimuth can cause an almost-complete revolution.
    let endAz = end.azimuth
    while (endAz - state.azimuth > Math.PI) endAz -= Math.PI * 2
    while (endAz - state.azimuth < -Math.PI) endAz += Math.PI * 2

    animating.current = true
    c.enabled = false
    const apply = () => {
      c.target.set(state.tx, state.ty, state.tz)
      const sph = new THREE.Spherical(state.radius, state.polar, state.azimuth)
      camera.position.setFromSpherical(sph).add(c.target)
      // Sync the controls' internal spherical so its per-frame (damped)
      // update() re-derives the same pose instead of snapping us back.
      c.update()
    }
    const tween = gsap.to(state, {
      radius: end.radius,
      polar: end.polar,
      azimuth: endAz,
      tx: pose.tgt[0],
      ty: pose.tgt[1],
      tz: pose.tgt[2],
      duration,
      ease,
      overwrite: 'auto',
      onUpdate: apply,
      onComplete: () => {
        apply()
        animating.current = false
        c.enabled = true
        c.update()
      },
    })
    return () => {
      tween.kill()
      animating.current = false
      c.enabled = true
    }
  }, [section, mobile, camera])

  // While the user free-orbits, surface the nearest section to the HUD.
  const handleChange = () => {
    if (animating.current || !onSync) return
    const c = controls.current
    if (!c) return
    const near = nearestSection(c.getAzimuthalAngle(), c.getPolarAngle())
    if (near !== lastSync.current) {
      lastSync.current = near
      onSync(near)
    }
  }

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={0.6}
      zoomSpeed={0.6}
      minDistance={3.4}
      maxDistance={9.5}
      minPolarAngle={0.05}
      maxPolarAngle={2.35}
      target={[0, 0.25, 0]}
      onChange={handleChange}
    />
  )
}
