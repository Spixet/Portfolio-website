'use client';

import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

interface CelestialOrbProps {
  position?: [number, number, number];
  size?: number;
  color?: string;
  intensity?: number;
  pulseSpeed?: number;
  floatIntensity?: number;
}

const CelestialOrb: React.FC<CelestialOrbProps> = ({
  position = [0, 0, 0],
  size = 1,
  color = '#9c27b0',
  intensity = 1.5,
  pulseSpeed = 0.4,
  floatIntensity = 0.3
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current && glowRef.current) {
      const t = clock.getElapsedTime();
      
      // Gentle breathing effect
      const scale = size * (1 + Math.sin(t * pulseSpeed) * 0.05);
      meshRef.current.scale.set(scale, scale, scale);
      
      // Inverse phase for glow to create dimensional effect
      const glowScale = size * 1.8 * (1 + Math.sin(t * pulseSpeed + Math.PI) * 0.1);
      glowRef.current.scale.set(glowScale, glowScale, glowScale);
      
      // Subtle color pulsing
      if (meshRef.current.material instanceof THREE.MeshPhysicalMaterial) {
        const emissiveIntensity = 0.6 + Math.sin(t * pulseSpeed * 0.5) * 0.2;
        meshRef.current.material.emissiveIntensity = emissiveIntensity;
      }
    }
  });
  
  return (
    <Float 
      speed={1.5} 
      rotationIntensity={0.2} 
      floatIntensity={floatIntensity}
      position={position}
    >
      {/* Core orb */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[size * 0.4, 64, 64]} />
        <meshPhysicalMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.2}
          clearcoat={1.0}
          clearcoatRoughness={0.2}
          transmission={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Glow effect */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[size * 0.5, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Light source */}
      <pointLight color={color} intensity={intensity} distance={15} decay={2} />
    </Float>
  );
};

// Collection of celestial orbs
const CelestialOrbs: React.FC = () => {
  const orbs = [
    { position: [0, 0, -5] as [number, number, number], size: 1.2, color: '#9c27b0', intensity: 1.8, pulseSpeed: 0.3, floatIntensity: 0.2 },
    { position: [-7, 3, -12] as [number, number, number], size: 0.8, color: '#3f51b5', intensity: 1.4, pulseSpeed: 0.5, floatIntensity: 0.4 },
    { position: [8, -2, -16] as [number, number, number], size: 1.0, color: '#2196f3', intensity: 1.6, pulseSpeed: 0.35, floatIntensity: 0.3 },
    { position: [-5, -4, -10] as [number, number, number], size: 0.6, color: '#00bcd4', intensity: 1.2, pulseSpeed: 0.45, floatIntensity: 0.5 },
    { position: [10, 5, -20] as [number, number, number], size: 0.9, color: '#673ab7', intensity: 1.5, pulseSpeed: 0.4, floatIntensity: 0.35 },
  ];
  
  return (
    <group>
      {orbs.map((orb, index) => (
        <CelestialOrb 
          key={index}
          position={orb.position}
          size={orb.size}
          color={orb.color}
          intensity={orb.intensity}
          pulseSpeed={orb.pulseSpeed}
          floatIntensity={orb.floatIntensity}
        />
      ))}
    </group>
  );
};

export default CelestialOrbs;
