  //@ts-nocheck
import * as THREE from "three"
import * as RAPIER from "@dimforge/rapier3d-compat"
import { useRef, useState } from "react"
import { useThree, useFrame } from "@react-three/fiber"
import { useKeyboardControls } from "@react-three/drei"
import { CapsuleCollider, RigidBody, useRapier } from "@react-three/rapier"

let SPEED = 5
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()

export default function Player({ lerp = THREE.MathUtils.lerp }) {
  const ref = useRef()
  const rapier = useRapier()
  const { camera } = useThree()
  const [, get] = useKeyboardControls()
  const [runState, setRunState] = useState(false)
  useFrame((state) => {
    const { forward, backward, left, right, jump, run } = get()
    const velocity = ref.current.linvel()
    // update camera
    camera.position.set(...ref.current.translation())
    // movement
    frontVector.set(0, 0, backward - forward)
    sideVector.set(left - right, 0, 0)
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(camera.rotation)
    ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z })
    // jumping
    const world = rapier.world.raw()
    const ray = world.castRay(new RAPIER.Ray(ref.current.translation(), { x: 0, y: -1, z: 0 }))
    const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1.75
    if (jump && grounded) ref.current.setLinvel({ x: 0, y: 5, z: 0 })
    if (runState !== run){
      if (run) SPEED=10
      else SPEED=5
      setRunState(run)
    } 
    
  })
  return (
    <>
      <RigidBody ref={ref} colliders={false} mass={60} type="dynamic" position={[0, 1, 0]} enabledRotations={[false, false, false]}>
        <CapsuleCollider args={[1, 0.5]} />
      </RigidBody>
    </>
  )
}
