import * as THREE from 'three'

import { useGLTF, useFBO, Stage, Effects } from '@react-three/drei'
import { Suspense, useRef, useMemo } from 'react'



export default function GLBloader() {
    //@ts-ignore
      const group = useRef()
      const { nodes } = useGLTF('/scene.glb')
    //@ts-ignore
      const material = useMemo(() => {
        return new THREE.MeshStandardMaterial({ color: new THREE.Color('#2a2a1t'), roughness: 1, metalness: 0.9 })
      }, [])
        //@ts-ignore
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