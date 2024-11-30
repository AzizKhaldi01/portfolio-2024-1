import * as THREE from 'three'
import { useRef, useReducer, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, Lightformer } from '@react-three/drei'
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier'
import { EffectComposer, N8AO } from '@react-three/postprocessing'
import { easing } from 'maath'

const accents = ['#4060ff', '#20ffa0', '#ff4060', '#ffcc00']
const shuffle = (accent = 0) => [
  { color: '#444', roughness: 0.1 },
  { color: 'white', roughness: 0.5 },
  { color: accents[accent], roughness: 0.5, accent: true },
]

export function ShuffleModals(props) {
  const [accent, click] = useReducer((state) => ++state % accents.length, 0)
  const connectors = useMemo(() => shuffle(accent), [accent])

  return (
    <Canvas
      onClick={click}
      shadows
      dpr={[1, 1.5]}
      className="h-[50vh] w-[50vh] bg-black"
      gl={{ antialias: true }}
      camera={{ position: [0, 0, 12], fov: 20 }}
      {...props}
    >
      <color attach="background" args={['#1E1E1E']} />
      <ambientLight intensity={0.4} />
      <Physics gravity={[0, -9.81, 0]}>
        {connectors.map((props, i) => (
          <Connector key={i} {...props} />
        ))}
      </Physics>
      <EffectComposer multisampling={4}>
        <N8AO intensity={2} aoRadius={0.5} />
      </EffectComposer>
      <Environment resolution={128}>
        <Lightformer form="circle" intensity={1.5} position={[0, 5, -5]} scale={2} />
      </Environment>
    </Canvas>
  )
}

function Connector({ position, vec = new THREE.Vector3(), scale, r = THREE.MathUtils.randFloatSpread, accent, ...props }) {
  const api = useRef()
  const pos = useMemo(() => position || [r(5), r(5), r(5)], [])
  useFrame((state, delta) => {
    delta = Math.min(0.05, delta)
    api.current?.applyImpulse(vec.copy(api.current.translation()).negate().multiplyScalar(0.1))
  })


  return (
    <RigidBody
      linearDamping={4}
      angularDamping={1}
      position={pos}
      ref={api}
      colliders={false} // No colliders will make objects not collide
      type="kinematicPosition" // Makes the object kinematic, preventing physics interaction
    >
      <Model {...props} />
      {accent && <pointLight intensity={2} distance={1.5} color={props.color} />}
    </RigidBody>
  )
}

 

function Model({ color = 'white', roughness = 0.5, ...props }) {
  const ref = useRef()
  const { nodes } = useGLTF('/c-transformed.glb')
  useFrame((state, delta) => {
    easing.dampC(ref.current.material.color, color, 0.2, delta)
  })
  return (
    <mesh ref={ref} scale={5} geometry={nodes.connector.geometry}>
      <meshStandardMaterial metalness={0.1} roughness={roughness} />
    </mesh>
  )
}
