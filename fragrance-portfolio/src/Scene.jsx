import { useMemo } from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { Environment, Lightformer, ContactShadows } from '@react-three/drei'
import Bottle from './Bottle.jsx'
import Annotations from './Annotations.jsx'
import CameraRig from './CameraRig.jsx'

/* Warm sun-glow billboard behind the bottle (procedural, no assets). */
function Glow() {
  const tex = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = c.height = 512
    const x = c.getContext('2d')
    const g = x.createRadialGradient(256, 256, 0, 256, 256, 256)
    g.addColorStop(0, 'rgba(255,158,72,0.9)')
    g.addColorStop(0.3, 'rgba(219,110,40,0.4)')
    g.addColorStop(0.65, 'rgba(122,52,18,0.1)')
    g.addColorStop(1, 'rgba(0,0,0,0)')
    x.fillStyle = g
    x.fillRect(0, 0, 512, 512)
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    return t
  }, [])
  return (
    <mesh position={[0, 0.3, -8]} renderOrder={-1}>
      <planeGeometry args={[24, 24]} />
      <meshBasicMaterial
        map={tex}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

export default function Scene({ section, setSection, onSync }) {
  const aspect = useThree((s) => s.size.width / s.size.height)
  // Shrink the whole stage on narrow screens so the bottle never clips.
  const stageScale = THREE.MathUtils.clamp(aspect / 0.95, 0.52, 1)

  return (
    <>
      <color attach="background" args={['#0a0604']} />
      <fog attach="fog" args={['#0a0604', 16, 34]} />

      <CameraRig section={section} onSync={onSync} />

      <ambientLight intensity={0.35} />
      <spotLight
        position={[5, 6, 6]}
        angle={0.45}
        penumbra={1}
        intensity={120}
        color="#ffd9ae"
      />
      <directionalLight position={[-4, 2, -4]} intensity={1.2} color="#ff9655" />

      {/* Procedural HDR-style studio: soft warm boxes for glass reflections. */}
      <Environment resolution={256}>
        <Lightformer
          form="rect"
          intensity={2.4}
          color="#ffdcb4"
          position={[4, 2.5, 4]}
          scale={[3.5, 3.5, 1]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={1.4}
          color="#ffffff"
          position={[0, 5, 1]}
          rotation-x={-Math.PI / 2}
          scale={[7, 2, 1]}
        />
        <Lightformer
          form="rect"
          intensity={0.9}
          color="#aebfff"
          position={[-5, 0.5, 3]}
          scale={[2, 5, 1]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="ring"
          intensity={2}
          color="#ff9a4d"
          position={[0, 0.6, -6]}
          scale={[6, 6, 1]}
        />
      </Environment>

      <Glow />

      <group scale={stageScale}>
        <Bottle
          setSection={setSection}
          bottleAnnotations={
            <Annotations scope="bottle" section={section} setSection={setSection} />
          }
          plateAnnotations={
            <Annotations scope="plate" section={section} setSection={setSection} />
          }
        />
      </group>

      <ContactShadows
        position={[0, -1.52 * stageScale, 0]}
        opacity={0.7}
        scale={10}
        blur={2.8}
        far={3.4}
        color="#160a03"
      />
    </>
  )
}
