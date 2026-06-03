import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'

/* ─── Particle dust floating in light beams ─────────────────────── */
function DustParticles() {
  const ref = useRef<THREE.Points>(null)

  const { positions, speeds } = useMemo(() => {
    const count = 3200
    const pos   = new Float32Array(count * 3)
    const spd   = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const beam  = Math.floor(Math.random() * 3)
      const beamZ = [-10, 0, 10][beam]
      const side  = Math.random() < 0.5 ? -1 : 1

      pos[i * 3]     = side * (11 + (Math.random() - 0.5) * 3)
      pos[i * 3 + 1] = Math.random() * 9
      pos[i * 3 + 2] = beamZ + (Math.random() - 0.5) * 5

      spd[i] = 0.0008 + Math.random() * 0.0018
    }
    return { positions: pos, speeds: spd }
  }, [])

  useFrame(() => {
    if (!ref.current) return
    const arr = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < arr.length / 3; i++) {
      arr[i * 3 + 1] += speeds[i]
      if (arr[i * 3 + 1] > 9) arr[i * 3 + 1] = 0
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#E8D8B4"
        transparent
        opacity={0.32}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

/* ─── Animated camera dolly ─────────────────────────────────────── */
function CameraRig({ onComplete }: { onComplete?: () => void }) {
  const { camera } = useThree()
  const elapsed    = useRef(0)
  const done       = useRef(false)
  const start      = useMemo(() => new THREE.Vector3(0, 3.5, 18), [])
  const end        = useMemo(() => new THREE.Vector3(0, 2.0, 5.5), [])
  const target     = useMemo(() => new THREE.Vector3(0, 1.8, -28), [])

  useFrame((_, delta) => {
    if (done.current) return
    elapsed.current += delta
    const dur = 5.2
    const t   = Math.min(elapsed.current / dur, 1)
    // Ease in-out cubic
    const e   = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

    camera.position.lerpVectors(start, end, e)
    camera.lookAt(target)

    if (t >= 1 && !done.current) {
      done.current = true
      onComplete?.()
    }
  })

  return null
}

/* ─── The full courtroom geometry ──────────────────────────────── */
function Courtroom() {
  const darkWood    = '#120C08'
  const wallColor   = '#09090F'
  const colColor    = '#0C0C16'
  const floorColor  = '#05050A'
  const ceilingColor= '#080812'

  return (
    <group>
      {/* Fog */}
      <fog attach="fog" args={['#050508', 18, 52]} />

      {/* Lights */}
      <ambientLight intensity={0.035} color="#1A1520" />
      <hemisphereLight intensity={0.06} color="#151020" groundColor="#080600" />

      {/* Window spotlights — left wall (3 windows) */}
      {([-10, 0, 10] as number[]).map((z, i) => (
        <group key={`lw-${i}`}>
          <spotLight
            position={[-12, 7.5, z]}
            target-position={[2, 0, z]}
            angle={0.22}
            penumbra={0.92}
            intensity={7}
            color="#DDB87A"
            decay={1.8}
          />
          {/* Emissive window pane */}
          <mesh position={[-13.8, 6, z]}>
            <boxGeometry args={[0.15, 2.6, 1.6]} />
            <meshStandardMaterial
              color="#000"
              emissive="#D4A855"
              emissiveIntensity={4}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}

      {/* Window spotlights — right wall (3 windows) */}
      {([-10, 0, 10] as number[]).map((z, i) => (
        <group key={`rw-${i}`}>
          <spotLight
            position={[12, 7.5, z]}
            target-position={[-2, 0, z]}
            angle={0.22}
            penumbra={0.92}
            intensity={5.5}
            color="#CCA060"
            decay={1.8}
          />
          <mesh position={[13.8, 6, z]}>
            <boxGeometry args={[0.15, 2.6, 1.6]} />
            <meshStandardMaterial
              color="#000"
              emissive="#C89840"
              emissiveIntensity={3.5}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}

      {/* Soft fill — front */}
      <pointLight position={[0, 4, 14]} intensity={0.3} color="#180E04" />

      {/* Bench accent light */}
      <pointLight position={[0, 5, -28]} intensity={1.2} color="#C89840" distance={12} decay={2} />

      {/* ── Floor ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -10]} receiveShadow>
        <planeGeometry args={[28, 80]} />
        <meshStandardMaterial color={floorColor} roughness={0.04} metalness={0.88} />
      </mesh>

      {/* ── Ceiling ── */}
      <mesh position={[0, 9.2, -10]}>
        <boxGeometry args={[28, 0.35, 80]} />
        <meshStandardMaterial color={ceilingColor} roughness={0.95} />
      </mesh>

      {/* ── Left wall ── */}
      <mesh position={[-14, 4.5, -10]}>
        <boxGeometry args={[0.35, 10, 80]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>

      {/* ── Right wall ── */}
      <mesh position={[14, 4.5, -10]}>
        <boxGeometry args={[0.35, 10, 80]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>

      {/* ── Back wall ── */}
      <mesh position={[0, 4.5, -38]}>
        <boxGeometry args={[28, 10, 0.35]} />
        <meshStandardMaterial color="#0C0C1A" roughness={0.85} />
      </mesh>

      {/* ── Back wall upper decoration panel ── */}
      <mesh position={[0, 7, -37.8]}>
        <boxGeometry args={[20, 3.5, 0.25]} />
        <meshStandardMaterial color="#0E0C20" roughness={0.9} />
      </mesh>

      {/* ── Coat of arms disc (emblem placeholder) ── */}
      <mesh position={[0, 7, -37.7]}>
        <cylinderGeometry args={[1.1, 1.1, 0.15, 32]} />
        <meshStandardMaterial
          color="#140E06"
          emissive="#C9A45A"
          emissiveIntensity={0.25}
          roughness={0.4}
          metalness={0.5}
        />
      </mesh>

      {/* ── Columns left ── */}
      {([-12, -4, 4, 12] as number[]).map((z, i) => (
        <group key={`cl-${i}`}>
          <mesh position={[-11.5, 4.6, z]}>
            <cylinderGeometry args={[0.28, 0.34, 9.5, 10]} />
            <meshStandardMaterial color={colColor} roughness={0.78} metalness={0.15} />
          </mesh>
          {/* Column capital */}
          <mesh position={[-11.5, 9.0, z]}>
            <boxGeometry args={[0.8, 0.25, 0.8]} />
            <meshStandardMaterial color={colColor} roughness={0.6} />
          </mesh>
        </group>
      ))}

      {/* ── Columns right ── */}
      {([-12, -4, 4, 12] as number[]).map((z, i) => (
        <group key={`cr-${i}`}>
          <mesh position={[11.5, 4.6, z]}>
            <cylinderGeometry args={[0.28, 0.34, 9.5, 10]} />
            <meshStandardMaterial color={colColor} roughness={0.78} metalness={0.15} />
          </mesh>
          <mesh position={[11.5, 9.0, z]}>
            <boxGeometry args={[0.8, 0.25, 0.8]} />
            <meshStandardMaterial color={colColor} roughness={0.6} />
          </mesh>
        </group>
      ))}

      {/* ── Judge's bench platform ── */}
      <mesh position={[0, 0.28, -30]}>
        <boxGeometry args={[14, 0.55, 6]} />
        <meshStandardMaterial color={darkWood} roughness={0.82} />
      </mesh>

      {/* ── Steps leading to bench (2 steps) ── */}
      <mesh position={[0, 0.12, -26.5]}>
        <boxGeometry args={[14, 0.22, 1.5]} />
        <meshStandardMaterial color={darkWood} roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.22, -27.8]}>
        <boxGeometry args={[14, 0.22, 1.5]} />
        <meshStandardMaterial color={darkWood} roughness={0.85} />
      </mesh>

      {/* ── Bench face ── */}
      <mesh position={[0, 1.25, -27.8]}>
        <boxGeometry args={[12, 1.8, 0.28]} />
        <meshStandardMaterial color="#1C1008" roughness={0.72} metalness={0.05} />
      </mesh>

      {/* ── Bench top surface ── */}
      <mesh position={[0, 2.18, -28.8]}>
        <boxGeometry args={[12, 0.12, 2.4]} />
        <meshStandardMaterial color="#241508" roughness={0.5} metalness={0.12} />
      </mesh>

      {/* ── Judge's chair back (abstract) ── */}
      <mesh position={[0, 3.8, -31]}>
        <boxGeometry args={[1.8, 3.2, 0.2]} />
        <meshStandardMaterial color="#180E08" roughness={0.8} />
      </mesh>
      <mesh position={[0, 2.3, -31]}>
        <boxGeometry args={[1.8, 0.15, 1.2]} />
        <meshStandardMaterial color="#1A1008" roughness={0.7} />
      </mesh>

      {/* ── Gallery benches (4 rows, left + right sections) ── */}
      {([4, 8, 12, 16] as number[]).map((z, i) => (
        <group key={`bench-row-${i}`}>
          {/* Left section */}
          <mesh position={[-4.5, 0.42, z]}>
            <boxGeometry args={[6, 0.2, 0.95]} />
            <meshStandardMaterial color={darkWood} roughness={0.88} />
          </mesh>
          <mesh position={[-4.5, 0.88, z - 0.38]}>
            <boxGeometry args={[6, 0.75, 0.12]} />
            <meshStandardMaterial color={darkWood} roughness={0.88} />
          </mesh>
          {/* Right section */}
          <mesh position={[4.5, 0.42, z]}>
            <boxGeometry args={[6, 0.2, 0.95]} />
            <meshStandardMaterial color={darkWood} roughness={0.88} />
          </mesh>
          <mesh position={[4.5, 0.88, z - 0.38]}>
            <boxGeometry args={[6, 0.75, 0.12]} />
            <meshStandardMaterial color={darkWood} roughness={0.88} />
          </mesh>
        </group>
      ))}

      {/* ── Central dividing railing ── */}
      <mesh position={[0, 0.55, 1.8]}>
        <boxGeometry args={[16, 0.85, 0.12]} />
        <meshStandardMaterial color="#1A1308" roughness={0.7} metalness={0.08} />
      </mesh>
      <mesh position={[-8, 0.55, 2.4]}>
        <boxGeometry args={[0.12, 0.85, 1.2]} />
        <meshStandardMaterial color="#1A1308" roughness={0.7} />
      </mesh>
      <mesh position={[8, 0.55, 2.4]}>
        <boxGeometry args={[0.12, 0.85, 1.2]} />
        <meshStandardMaterial color="#1A1308" roughness={0.7} />
      </mesh>

      {/* ── Lectern / podium ── */}
      <mesh position={[0, 0.55, -22]}>
        <boxGeometry args={[1.2, 1.1, 0.8]} />
        <meshStandardMaterial color="#1A0E06" roughness={0.75} />
      </mesh>
      <mesh position={[0, 1.15, -22.1]}>
        <boxGeometry args={[1.4, 0.1, 0.85]} />
        <meshStandardMaterial color="#221208" roughness={0.55} metalness={0.1} />
      </mesh>

      {/* ── Dust particles ── */}
      <DustParticles />
    </group>
  )
}

/* ─── Exported component ────────────────────────────────────────── */
interface CourtroomSceneProps {
  onComplete?: () => void
}

export default function CourtroomScene({ onComplete }: CourtroomSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 3.5, 18], fov: 50 }}
      gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}
      dpr={[1, 1.5]}
      shadows={false}
      style={{ background: '#050508' }}
      className="r3f-canvas"
    >
      <CameraRig onComplete={onComplete} />
      <Courtroom />
      <EffectComposer>
        <Bloom
          intensity={1.4}
          luminanceThreshold={0.45}
          luminanceSmoothing={0.85}
          mipmapBlur
        />
        <Vignette offset={0.32} darkness={0.88} />
      </EffectComposer>
    </Canvas>
  )
}
