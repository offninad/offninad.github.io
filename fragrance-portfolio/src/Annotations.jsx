import { useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'

/*
 * Line-diagram hotspots pinned to local 3D points on the bottle and plate.
 * Each renders a dot at the anchor, a hairline, and a clickable tag.
 * Html's default screen-space mode is an intentional billboard: Drei projects
 * the local anchor every frame while the DOM label stays camera-facing.
 */
const ANNOS = {
  bottle: [
    { id: 'education', label: 'Education', pos: [0.32, 1.78, 0], len: 96 },
    // The back label sits at z=-0.392. Keep the anchor just outside that plane.
    { id: 'experience', label: 'Experience', pos: [0.48, 0.28, -0.405], len: 118 },
    // Mid-right edge: clear of the hero copy (lower-left) and the
    // persistent contact card (lower-right).
    { id: 'beyond', label: 'Beyond', pos: [0.72, -0.52, 0.3], len: 96 },
  ],
  plate: [
    // This coordinate is local to the plate group, whose origin is its center.
    { id: 'projects', label: 'Projects', pos: [-1.18, 0.11, 0.45], len: 140 },
  ],
}

const anchorWorld = new THREE.Vector3()
const axisWorld = new THREE.Vector3()

function Anno({ a, section, setSection }) {
  const group = useRef()
  // Whichever way the anchor sits relative to the bottle's center axis on
  // screen, extend the tag further that way — never back across the bottle.
  // Re-evaluated per frame because orbiting mirrors the anchors.
  const [side, setSide] = useState('right')
  const sideRef = useRef('right')

  useFrame(({ camera }) => {
    if (!group.current) return
    group.current.getWorldPosition(anchorWorld)
    // Bottle and plate are both centered on the world Y axis.
    axisWorld.set(0, anchorWorld.y, 0)
    const dx = anchorWorld.project(camera).x - axisWorld.project(camera).x
    // Deadband so the tag doesn't flap while the anchor crosses the axis.
    const next = dx > 0.012 ? 'right' : dx < -0.012 ? 'left' : null
    if (next && next !== sideRef.current) {
      sideRef.current = next
      setSide(next)
    }
  })

  return (
    <group ref={group} position={a.pos}>
      <Html center distanceFactor={4.6} transform={false} zIndexRange={[40, 10]}>
        <button
          className={`anno ${side}${section === a.id ? ' hidden' : ''}`}
          onClick={() => setSection(a.id)}
          aria-label={a.label}
        >
          <span className="anno-dot" />
          <span className="anno-line" style={{ width: a.len }} />
          <span className="anno-tag">{a.label}</span>
        </button>
      </Html>
    </group>
  )
}

export default function Annotations({ scope = 'bottle', section, setSection }) {
  return ANNOS[scope].map((a) => (
    <Anno key={a.id} a={a} section={section} setSection={setSection} />
  ))
}
