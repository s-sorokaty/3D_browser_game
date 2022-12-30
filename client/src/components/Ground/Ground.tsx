  //@ts-nocheck
import * as THREE from "three"
import { useTexture } from "@react-three/drei"
import { CuboidCollider, RigidBody } from "@react-three/rapier"
import grass from "./../../assets/ground.jpeg"

export default function Ground(props: JSX.IntrinsicElements['mesh']) {
  const texture = useTexture(grass)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  return (<RigidBody  colliders="hull" {...props} type="fixed" colliders={false}>
      <mesh receiveShadow position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial map={texture} map-repeat={[24, 24]} />
      </mesh>
      <CuboidCollider args={[500, 2, 500]} position={[0, -2, 0]} />
      
    </RigidBody>)
}
