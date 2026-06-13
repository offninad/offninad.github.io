import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, MeshTransmissionMaterial } from '@react-three/drei'

/*
 * Procedurally built flacon (no glTF): frosted-glass rounded box, amber
 * "juice" inside, brushed-metal cap, and paper labels rendered to
 * CanvasTextures so the serif type stays crisp and ships with no assets.
 */

const INK = '#241a12'

function paperBase(x, w, h) {
  const g = x.createLinearGradient(0, 0, 0, h)
  g.addColorStop(0, '#f2ecdf')
  g.addColorStop(1, '#e6dfcf')
  x.fillStyle = g
  x.fillRect(0, 0, w, h)
  x.strokeStyle = 'rgba(43,33,24,0.4)'
  x.lineWidth = 3
  x.strokeRect(22, 22, w - 44, h - 44)
  x.strokeStyle = 'rgba(43,33,24,0.16)'
  x.lineWidth = 1
  x.strokeRect(32, 32, w - 64, h - 64)
  x.fillStyle = INK
  x.textAlign = 'center'
  x.textBaseline = 'middle'
}

function drawFrontLabel(c) {
  const w = (c.width = 560)
  const h = (c.height = 688)
  const x = c.getContext('2d')
  paperBase(x, w, h)
  const cx = w / 2

  x.letterSpacing = '3px'
  x.font = '600 76px "Cormorant Garamond", Georgia, serif'
  x.fillText('NINAD RADE', cx, 252)

  x.letterSpacing = '1px'
  x.font = 'italic 500 30px "Cormorant Garamond", Georgia, serif'
  x.fillText('Machine Learning Engineer', cx, 318)

  x.fillRect(cx - 32, 384, 64, 2)

  x.letterSpacing = '5px'
  x.font = '400 21px Inter, system-ui, sans-serif'
  x.fillText('NYU TANDON', cx, 446)
  x.fillText('NEW YORK', cx, 482)
  return c
}

function drawBackLabel(c) {
  const w = (c.width = 560)
  const h = (c.height = 448)
  const x = c.getContext('2d')
  paperBase(x, w, h)
  const cx = w / 2

  x.letterSpacing = '6px'
  x.font = '400 21px Inter, system-ui, sans-serif'
  x.fillText('EXPERIENCE', cx, 92)

  x.fillRect(cx - 32, 128, 64, 2)

  x.letterSpacing = '1px'
  x.font = '600 36px "Cormorant Garamond", Georgia, serif'
  x.fillText('DavaNinja', cx, 196)
  x.letterSpacing = '0.5px'
  x.font = '400 18px Inter, system-ui, sans-serif'
  x.fillText('Software Engineering Intern · 2024 – 25', cx, 232)

  x.letterSpacing = '1px'
  x.font = '600 36px "Cormorant Garamond", Georgia, serif'
  x.fillText('AIESEC in India', cx, 308)
  x.letterSpacing = '0.5px'
  x.font = '400 18px Inter, system-ui, sans-serif'
  x.fillText('VP, Organizing Committee · 2022', cx, 344)
  return c
}

function useLabelTexture(draw) {
  const tex = useMemo(() => {
    const t = new THREE.CanvasTexture(draw(document.createElement('canvas')))
    t.colorSpace = THREE.SRGBColorSpace
    t.anisotropy = 8
    return t
  }, [draw])
  // Redraw once webfonts are in so the serif actually renders on the label.
  useEffect(() => {
    let alive = true
    document.fonts.ready.then(() => {
      if (!alive) return
      draw(tex.image)
      tex.needsUpdate = true
    })
    return () => {
      alive = false
    }
  }, [draw, tex])
  return tex
}

function drawCapEngraving(c) {
  const w = (c.width = 1024)
  const h = (c.height = 256)
  const x = c.getContext('2d')

  x.clearRect(0, 0, w, h)

  x.textAlign = 'center'
  x.textBaseline = 'middle'
  x.letterSpacing = '8px'
  x.font = '600 78px Inter, system-ui, sans-serif'
  x.lineWidth = 5
  x.strokeStyle = 'rgba(12,9,7,0.94)'
  x.fillStyle = 'rgba(225,190,144,0.92)'
  x.strokeText('NYU & MUMBAI', w / 2, h / 2 + 2)
  x.fillText('NYU & MUMBAI', w / 2, h / 2)
  return c
}

/* Top face of the presentation plate, with an engraved "PROJECTS" arc. */
function drawPlateTop(c) {
  const s = (c.width = c.height = 512)
  const x = c.getContext('2d')
  const r = s / 2
  const g = x.createRadialGradient(r, r, 40, r, r, r)
  g.addColorStop(0, '#181210')
  g.addColorStop(0.7, '#0e0a07')
  g.addColorStop(1, '#070504')
  x.fillStyle = g
  x.fillRect(0, 0, s, s)
  // concentric hairline rings
  x.strokeStyle = 'rgba(200,169,126,0.22)'
  x.lineWidth = 1.5
  x.beginPath()
  x.arc(r, r, r - 26, 0, Math.PI * 2)
  x.stroke()
  x.strokeStyle = 'rgba(200,169,126,0.1)'
  x.beginPath()
  x.arc(r, r, r - 40, 0, Math.PI * 2)
  x.stroke()
  // engraved word near the front edge
  x.fillStyle = 'rgba(214,184,142,0.85)'
  x.textAlign = 'center'
  x.textBaseline = 'middle'
  x.letterSpacing = '12px'
  x.font = '500 34px Inter, system-ui, sans-serif'
  x.fillText('PROJECTS', r, r + 170)
  return c
}

export default function Bottle({
  setSection,
  bottleAnnotations,
  plateAnnotations,
}) {
  const floatRef = useRef()
  const spinRef = useRef()
  const [plateHover, setPlateHover] = useState(false)
  const frontTex = useLabelTexture(drawFrontLabel)
  const backTex = useLabelTexture(drawBackLabel)
  const capTex = useLabelTexture(drawCapEngraving)
  const plateTex = useLabelTexture(drawPlateTop)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    floatRef.current.position.y = Math.sin(t * 0.7) * 0.045
    floatRef.current.rotation.z = Math.sin(t * 0.4) * 0.012
  })

  const metal = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#b9bdc3',
        metalness: 1,
        roughness: 0.22,
        envMapIntensity: 1.6,
      }),
    []
  )
  const engravedMetal = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#d2d4d8',
        metalness: 0.92,
        roughness: 0.28,
        envMapIntensity: 1.6,
      }),
    []
  )

  return (
    <>
      {/* presentation plate — grounded, holds the Projects inscription */}
      <group
        position={[0, -1.42, 0]}
        onClick={(e) => {
          e.stopPropagation()
          setSection('projects')
        }}
        onPointerOver={() => {
          setPlateHover(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setPlateHover(false)
          document.body.style.cursor = ''
        }}
      >
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[1.68, 1.78, 0.16, 64]} />
          <meshStandardMaterial
            color="#0d0a08"
            metalness={0.7}
            roughness={0.34}
            envMapIntensity={0.7}
          />
        </mesh>
        <mesh position={[0, 0.082, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.66, 64]} />
          <meshStandardMaterial
            map={plateTex}
            roughness={0.5}
            metalness={0.25}
            emissive="#c8884a"
            emissiveIntensity={plateHover ? 0.32 : 0}
          />
        </mesh>
        {plateAnnotations}
      </group>

      <group ref={floatRef}>
      <group ref={spinRef}>
        {/* glass body */}
        <RoundedBox
          args={[1.55, 2.3, 0.78]}
          radius={0.1}
          smoothness={6}
          onDoubleClick={() => setSection('home')}
        >
          <MeshTransmissionMaterial
            backside
            samples={6}
            resolution={512}
            backsideResolution={256}
            transmission={1}
            roughness={0.26}
            thickness={0.9}
            ior={1.45}
            chromaticAberration={0.03}
            anisotropicBlur={0.2}
            distortion={0.06}
            distortionScale={0.4}
            temporalDistortion={0}
            attenuationDistance={2.4}
            attenuationColor="#ffe9cf"
            color="#f6efe6"
          />
        </RoundedBox>

        {/* amber juice */}
        <RoundedBox args={[1.28, 1.76, 0.5]} radius={0.09} position={[0, -0.2, 0]}>
          <meshStandardMaterial
            color="#d28e3f"
            roughness={0.45}
            emissive="#6b3a0e"
            emissiveIntensity={0.3}
          />
        </RoundedBox>

        {/* neck */}
        <mesh position={[0, 1.27, 0]}>
          <cylinderGeometry args={[0.21, 0.25, 0.26, 40]} />
          <meshPhysicalMaterial
            color="#f3e9da"
            transparent
            opacity={0.55}
            roughness={0.3}
            clearcoat={1}
          />
        </mesh>

        {/* collar + cap */}
        <mesh position={[0, 1.44, 0]} material={metal}>
          <cylinderGeometry args={[0.24, 0.24, 0.09, 40]} />
        </mesh>
        <mesh position={[0, 1.74, 0]} material={engravedMetal}>
          <cylinderGeometry args={[0.35, 0.37, 0.52, 48]} />
        </mesh>
        <mesh position={[0, 1.74, 0]} renderOrder={2}>
          <cylinderGeometry args={[0.362, 0.362, 0.15, 32, 1, true, -0.58, 2]} />
          <meshBasicMaterial
            map={capTex}
            transparent
            depthWrite={false}
            toneMapped={false}
            polygonOffset
            polygonOffsetFactor={-2}
          />
        </mesh>
        <mesh position={[0, 2.005, 0]} material={metal}>
          <cylinderGeometry args={[0.33, 0.35, 0.02, 48]} />
        </mesh>

        {/* labels */}
        <mesh position={[0, -0.08, 0.392]}>
          <planeGeometry args={[1.16, 1.42]} />
          <meshStandardMaterial map={frontTex} roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.16, -0.392]} rotation-y={Math.PI}>
          <planeGeometry args={[1.16, 0.93]} />
          <meshStandardMaterial map={backTex} roughness={0.85} />
        </mesh>
      </group>

      {/* annotations ride the float but not the spin */}
      {bottleAnnotations}
      </group>
    </>
  )
}
