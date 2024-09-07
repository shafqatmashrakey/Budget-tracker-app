import React, { useRef } from "react";
import { useGLTF,PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function Modelhome(props) {
  const group = useRef();
  const { nodes, materials} = useGLTF('/creditcard101.gltf');
  const scaleFactor = 100;
  //const xRotation = Math.PI / 2;
  const xRotation = 3.1448; // Rotate around the x-axis by 90 degrees
  const yRotation = 0; // No rotation around the y-axis
  const zRotation = 0; // No rotation around the z-axis

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    const rotationSpeed = 0.2; // Adjust the rotation speed as needed

    // Smoothly rotate the model around the y-axis based on time
    group.current.rotation.x = Math.sin(elapsed * rotationSpeed) * Math.PI; // Rotate by 180 degrees (Math.PI) back and forth
    group.current.rotation.y = Math.cos(elapsed * rotationSpeed) * Math.PI;
  });
  return (
    
    <group ref ={group} {...props} dispose={null}>
      <PerspectiveCamera
        makeDefault={false}
        far={100}
        near={0.1}
        fov={22.895}
        position={[1.082, 0.676, 1.095]}
        rotation={[-0.627, 0.71, 0.441]}
        scale={0.445}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material-color = {"white"}
        position={[0.068, -0.01, -0.485]}
        scale={28.257}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        
        material-color = {"gold"}
        position={[-0.063, 0.004, 0.264]}
        scale={[0.115, 0.011, 0.138]}
      />
      
      <group position={[-0.058, 0.05, 0.268]} scale={[0.115, 0.011, 0.138]} rotation={[xRotation, yRotation, zRotation]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002.geometry}
          material-color={"gold"}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002_1.geometry}
          material-color={"black"}
        />
      </group>
    </group>
  );
}
//0.044