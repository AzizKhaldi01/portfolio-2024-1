import React, { useRef } from "react";
import { Float, useGLTF } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";

export function Model(props) {
  const { nodes, materials } = useGLTF("/diamond.glb");
  const diamondRef = useRef();

  // Media queries
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // Determine the scale based on screen size
  const scale = isMobile ? [0.28, 0.30, 0.30] : [0.27, 0.29, 0.29];

  return (
    <group {...props} dispose={null} scale={scale}>
      <Float
        speed={2.5} // Increase the speed of the floating motion
        rotationIntensity={1.5} // Increase the intensity of rotation
        floatIntensity={5} // Increase the intenqbsity of floating motion
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pPyramid2_lambert1_0.geometry}
          material={materials.lambert1}
        />
      </Float>
    </group>
  );
}

useGLTF.preload("/diamond.glb");
