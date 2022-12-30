/* eslint-disable */
import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sky, PointerLockControls, KeyboardControls, TorusKnot } from "@react-three/drei";
import { CuboidCollider, RigidBody, Debug } from "@react-three/rapier";

import { Physics } from "@react-three/rapier";
import Ground from "./components/Ground/Ground";
import Player from "./components/Player/Player";
import GLBloader from "./components/GLBloader/GLBloader";

export default function App() {
  return (
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "w", "W"] },
        { name: "backward", keys: ["ArrowDown", "s", "S"] },
        { name: "left", keys: ["ArrowLeft", "a", "A"] },
        { name: "right", keys: ["ArrowRight", "d", "D"] },
        { name: "jump", keys: ["Space"] },
        { name: "run", keys: ["Shift"] },

      ]}
    >
      <Canvas>
        <Physics gravity={[0, -10, 0]}>
          <PointerLockControls />

          <Sky sunPosition={[100, 20, 100]} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.5} penumbra={10} />
          <pointLight position={[10, 10, 100]} />


          <Ground />
          <Player />
          <GLBloader />

          <Debug />
        </Physics>
      </Canvas>
    </KeyboardControls>
  );
}
//
