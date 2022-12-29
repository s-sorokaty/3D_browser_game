/* eslint-disable */
import * as React from 'react'
import * as THREE from 'three'
import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame,  } from '@react-three/fiber'
import { Sky, PointerLockControls, KeyboardControls } from "@react-three/drei"
import { useGLTF, useFBO, Stage, Effects } from '@react-three/drei'
import { CuboidCollider, RigidBody, Debug } from "@react-three/rapier"

import { Physics } from "@react-three/rapier"
import Ground from './components/Ground/Ground'
import Player from './components/Player/Player'

function Elf() {
//@ts-ignore
  const group = useRef()
  const { nodes } = useGLTF('/scene.glb')
//@ts-ignore
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({ color: new THREE.Color('#2a2a1t'), roughness: 1, metalness: 0.9 })
  }, [])
    //@ts-ignore
  console.log()
  return (<>
  <group 
    //@ts-ignore
    ref={group} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 10, 0]}>
        <mesh //@ts-ignore 
        geometry={nodes.mesh_0.geometry} colliders material={material} receiveShadow castShadow />
        <mesh //@ts-ignore
        geometry={nodes.mesh_1.geometry} material={material}  receiveShadow castShadow />
        <mesh //@ts-ignore
        
        geometry={nodes.mesh_2.geometry} material={material} receiveShadow castShadow />
 
      </group>

    </group>

  </>

    
  )
}


export default function App() {
  return (
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "w", "W"] },
        { name: "backward", keys: ["ArrowDown", "s", "S"] },
        { name: "left", keys: ["ArrowLeft", "a", "A"] },
        { name: "right", keys: ["ArrowRight", "d", "D"] },
        { name: "jump", keys: ["Space"] },
      ]}>
    <Canvas>
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.5} penumbra={10} />
      <pointLight position={[10, 10, 100]} />
      


      
      <PointerLockControls />
      <Elf/>
      <Physics gravity={[0, -10, 0]}>
          <Ground/>
          <Player/>
          <CuboidCollider args={[3, 12, 4]} position={[-1, 0, 0]} />
          <Debug />
      </Physics>
    </Canvas>
    </KeyboardControls>

  )
}
//