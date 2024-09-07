'use client'
import { useState } from 'react';
import { Modelhome } from "../modelhomedata.js";
import { Canvas } from "@react-three/fiber";
import { Suspense } from 'react';
import { OrbitControls, Text } from '@react-three/drei';

export default function Homepage() {
  const [modelClicked, setModelClicked] = useState(false);
  const [showBalancePopup, setShowBalancePopup] = useState(false);
  const [balanceInput, setBalanceInput] = useState('');

  const handleModelClick = () => {
    setModelClicked(true);
  };

  return (
    <div className="h-screen bg-gray-900">
      <Canvas camera={{ position: [0, 0, 2] }}>
        <Suspense fallback={null}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <spotLight intensity={0.9} angle={0.1} penumbra={1} position={[10, 15, 10]} />
          <directionalLight position={[0, 2, 0]} />
          <directionalLight position={[0, -2, 0]} />
          <Modelhome
            position={[0.3, 0,0]}
            rotation={[0, 0, 0]}
            
          />
          <Text
            color="black"
            fontSize={0.1}
            position={[-0.5, -0.4, 0.03]}
            rotation={[0, 0, 0]}
            textAlign="center"
          >
            
          </Text>
          <OrbitControls enablePan={true} enableZoom={false} enableRotate={true} />
        </Suspense>
      </Canvas>
    </div>
  );
}
