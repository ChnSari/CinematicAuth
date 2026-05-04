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

  useEffect(() => {
    if (!actions) return
    const idle = Object.values(actions)[0]
    if (idle) {
      idle.play()
      idle.timeScale = 0.35
    }
  }, [actions])

  useEffect(() => {
    if (!group.current) return
    group.current.position.set(-3.2, -1.7, -1.6)
    group.current.rotation.set(0, 1.3, -0.1)
  }, [])

  useFrame((state, dt) => {
    if (!group.current) return

    const t = state.clock.elapsedTime

    //PHASES
    const look = clamp01(intensity / 0.15)
    const head = clamp01((intensity - 0.15) / 0.15)
    const body = clamp01((intensity - 0.3) / 0.4)
    const full = clamp01((intensity - 0.7) / 0.3)

    const headEase = head * head
    const bodyEase = 1 - Math.pow(1 - body, 2)
    const fullEase = Math.pow(full, 1.6)


    const targetZ = -1.6 + headEase * 0.9
    const targetX = -3.2 + bodyEase * 2.0
    const finalX = targetX + fullEase * 0.5
    const finalZ = targetZ + fullEase * 0.4

    group.current.position.x = damp(group.current.position.x, finalX, 2.2, dt)
    group.current.position.z = damp(group.current.position.z, finalZ, 2.2, dt)
    group.current.position.y = -1.3


    // gaze at the screen
    const lookWeight = 1 - head
    const lookRotY = 1.1
    const curiosity = Math.sin(t * 1.2) * 0.2 * (1 - fullEase)
    const normalRotY = 1.5 - fullEase * 1.3 + curiosity
    const targetRotZ = -0.1 + fullEase * 0.05

    //BLEND
    const finalRotY =
      lookRotY * lookWeight + normalRotY * (1 - lookWeight)

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