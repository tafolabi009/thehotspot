'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function FloatingFood({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={2}
      floatingRange={[-0.5, 0.5]}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
        <pointLight position={[0, 0, 0]} intensity={0.5} color={color} />
      </mesh>
    </Float>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Floating Food Elements with Brand Colors */}
      <FloatingFood position={[-4, 2, -5]} color="#FF7A00" scale={0.8} />
      <FloatingFood position={[4, -2, -5]} color="#E60000" scale={1} />
      <FloatingFood position={[-3, -3, -8]} color="#FFA940" scale={0.6} />
      <FloatingFood position={[5, 3, -6]} color="#FF7A00" scale={0.9} />
      <FloatingFood position={[0, 4, -7]} color="#E60000" scale={0.7} />
      <FloatingFood position={[-5, 0, -9]} color="#FFA940" scale={1.1} />
      
      {/* Large Glowing Sphere in Background */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={1}>
        <Sphere args={[3, 64, 64]} position={[0, 0, -15]}>
          <MeshDistortMaterial
            color="#FF7A00"
            attach="material"
            distort={0.5}
            speed={1.5}
            roughness={0.1}
            metalness={0.9}
            opacity={0.3}
            transparent
          />
        </Sphere>
      </Float>
    </group>
  );
}

export default function FloatingFoods() {
  return (
    <div className="fixed inset-0 -z-10 opacity-60">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
