import { Html } from '@react-three/drei'

/*
 * Line-diagram hotspots pinned to local 3D points on the bottle and plate.
 * Each renders a dot at the anchor, a hairline, and a clickable tag.
 * Html's default screen-space mode is an intentional billboard: Drei projects
 * the local anchor every frame while the DOM label stays camera-facing.
 */
const ANNOS = {
  bottle: [
    { id: 'education', n: '03', label: 'Education', pos: [0.32, 1.78, 0], side: 'right' },
    // The back label sits at z=-0.392. Keep the anchor just outside that plane.
    { id: 'experience', n: '02', label: 'Experience', pos: [0.48, 0.28, -0.405], side: 'right' },
    { id: 'beyond', n: '05', label: 'Beyond', pos: [-0.62, -1.08, 0.32], side: 'left' },
  ],
  plate: [
    // This coordinate is local to the plate group, whose origin is its center.
    { id: 'projects', n: '04', label: 'Projects', pos: [-1.18, 0.11, 0.45], side: 'left' },
  ],
}

export default function Annotations({ scope = 'bottle', section, setSection }) {
  return ANNOS[scope].map((a) => (
    <Html
      key={a.id}
      position={a.pos}
      center
      distanceFactor={6}
      transform={false}
      zIndexRange={[40, 10]}
    >
      <button
        className={`anno ${a.side}${section === a.id ? ' hidden' : ''}`}
        onClick={() => setSection(a.id)}
        aria-label={a.label}
      >
        <span className="anno-dot" />
        <span className="anno-line" />
        <span className="anno-tag">
          <b>{a.n}</b>
          {a.label}
        </span>
      </button>
    </Html>
  ))
}
