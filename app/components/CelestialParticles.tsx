'use client';

import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Points } from '@react-three/drei';

interface CelestialParticlesProps {
  count?: number;
  radius?: number;
  size?: number;
  colors?: string[];
  speed?: number;
}

const CelestialParticles: React.FC<CelestialParticlesProps> = ({
  count = 5000,
  radius = 20,
  size = 0.03,
  colors = ['#ffffff', '#a463f5', '#5b3df5', '#27d1ff', '#5ef2d7'],
  speed = 0.05
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const colorPalette = useMemo(() => colors.map(color => new THREE.Color(color)), [colors]);

  // Generate particle positions and color values
  const [positions, colorValues, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colorArray = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Create a sphere distribution with varying distances
      const distance = Math.random() * radius;
      const theta = Math.random() * 2 * Math.PI; // around the y-axis
      const phi = Math.acos(2 * Math.random() - 1); // from top to bottom

      // Convert spherical coordinates to Cartesian
      const i3 = i * 3;
      positions[i3] = distance * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = distance * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = distance * Math.cos(phi);

      // Assign a random color from our palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colorArray[i3] = color.r;
      colorArray[i3 + 1] = color.g;
      colorArray[i3 + 2] = color.b;

      // Vary the size slightly for a more natural look
      sizes[i] = size * (0.5 + Math.random() * 0.5);
    }

    return [positions, colorArray, sizes];
  }, [count, radius, size, colorPalette]);

  // Animate the particles
  useFrame(({ clock }) => {
    if (pointsRef.current) {
      const time = clock.getElapsedTime();
      
      // Create gentle wave motion
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const y = positions[i3 + 1];
        const z = positions[i3 + 2];
        
        const distance = Math.sqrt(x * x + y * y + z * z);
        const factor = 1 + Math.sin(distance + time * speed) * 0.05;

        pointsRef.current.geometry.attributes.position.array[i3] = positions[i3] * factor;
        pointsRef.current.geometry.attributes.position.array[i3 + 1] = positions[i3 + 1] * factor;
        pointsRef.current.geometry.attributes.position.array[i3 + 2] = positions[i3 + 2] * factor;
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={pointsRef} limit={10000}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colorValues}
          itemSize={3}
          args={[colorValues, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
};

export default CelestialParticles;
