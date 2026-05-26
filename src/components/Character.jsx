'use client'

import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'

function damp(current, target, lambda, dt) {
  return current + (target - current) * (1 - Math.exp(-lambda * dt))
}

function clamp01(v) {
  return Math.max(0, Math.min(1, v))
}

export default function Character({ intensity }) {
  const group = useRef()
  const { scene, animations } = useGLTF('/models/character.glb')
  const { actions } = useAnimations(animations, group)

  // idle anim
  useEffect(() => {
    if (!actions) return
    const idle = Object.values(actions)[0]
    if (idle) {
      idle.play()
      idle.timeScale = 0.35
    }
  }, [actions])

  // initial pose
  useEffect(() => {
    if (!group.current) return
    group.current.position.set(-3.2, -1.7, -1.6)
    group.current.rotation.set(0, 1.4, -0.1)
  }, [])

  useFrame((state, dt) => {
    if (!group.current) return

    const t = state.clock.elapsedTime

    // PHASES
    const look = clamp01(intensity / 0.15)
    const full = clamp01((intensity - 0.7) / 0.3)

    const fullEase = Math.pow(full, 1.6)

    // POSITION (Kenardan Bakmak)

    const baseX = -3.2
    const baseZ = -1.6

    // çok hafif peek
    const peek = look * 0.25

    // canlılık için micro hareket
    const idleShift = Math.sin(t * 0.8) * 0.03 * (1 - fullEase)

    const finalX = baseX + peek + idleShift
    const finalZ = baseZ + peek * 0.2

    group.current.position.x = damp(group.current.position.x, finalX, 2.2, dt)
    group.current.position.z = damp(group.current.position.z, finalZ, 2.2, dt)
    group.current.position.y = -1.3

    // ROTATION (Bakış - canlılık)
    const lookWeight = 1 - full

    const lookRotY = 1.1

    // merak efekti
    const curiosity =
      Math.sin(t * 1.2) * 0.2 * (1 - fullEase)

    // ekstra mikro kafa hareketi
    const microHead =
      Math.sin(t * 2.3) * 0.05 * (1 - fullEase)

    const normalRotY =
      1.5 - fullEase * 1.2 + curiosity + microHead

    const lookTilt = look * -0.25
    
    const targetRotZ =
      -0.1 +
      lookTilt +
      Math.sin(t * 1.5) * 0.03 * (1 - fullEase) +
      fullEase * 0.05
  
    const finalRotY =
      lookRotY * lookWeight +
      normalRotY * (1 - lookWeight)

    group.current.rotation.y = damp(group.current.rotation.y, finalRotY, 2.5, dt)
    group.current.rotation.z = damp(group.current.rotation.z, targetRotZ, 2.5, dt)
  })

  return (
    <group ref={group} scale={0.85}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/models/character.glb')