'use client'

import { Canvas } from '@react-three/fiber'
import Character from './Character'

export default function Scene({ intensity }) {
  return (
    <Canvas
      className="w-full h-full"
      camera={{ position: [0.2, 0.2, 3], fov: 45 }}
    >
      <color attach="background" args={['#eaeaea']} />

      <ambientLight intensity={0.2} />
      <directionalLight position={[2, 4, 3]} intensity={1.8} />

      <Character intensity={intensity} />
    </Canvas>
  )
}