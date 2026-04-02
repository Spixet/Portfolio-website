'use client';

import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface CosmicEnergyWavesProps {
  count?: number;
  colors?: string[];
  radius?: number;
  width?: number;
  length?: number;
  speed?: number;
}

const CosmicEnergyWaves: React.FC<CosmicEnergyWavesProps> = ({
  count = 5,
  colors = ['#a463f5', '#5b3df5', '#27d1ff', '#5ef2d7', '#f59c27'],
  radius = 8,
  width = 0.15,
  length = 15,
  speed = 0.3
}) => {
  const orbitRefs = useRef<Array<THREE.Group | null>>([]);
  const orbRefs = useRef<Array<THREE.Mesh | null>>([]);

  const params = useRef(Array.from({ length: count }, (_, i) => ({
    radius: radius * (0.7 + Math.random() * 0.6),
    phase: Math.random() * Math.PI * 2,
    speed: speed * (0.8 + Math.random() * 0.4),
    verticalFactor: 0.2 + Math.random() * 0.4,
    color: colors[i % colors.length],
    tiltX: Math.random() * Math.PI,
    tiltY: Math.random() * Math.PI,
    pulseOffset: Math.random() * Math.PI * 2,
  }))).current;

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    orbitRefs.current.forEach((orbit, i) => {
      const orb = orbRefs.current[i];
      if (!orbit || !orb) {
        return;
      }

      const {
        radius: orbitRadius,
        phase,
        speed: orbitSpeed,
        verticalFactor,
        tiltX,
        tiltY,
        pulseOffset,
      } = params[i];

      const theta = time * orbitSpeed + phase;
      const pulse = 1 + Math.sin(time * orbitSpeed * 0.7 + pulseOffset) * 0.08;

      orbit.rotation.x = tiltX + Math.sin(time * orbitSpeed * 0.15) * 0.08;
      orbit.rotation.y = tiltY + Math.cos(time * orbitSpeed * 0.12) * 0.08;
      orbit.rotation.z = theta * 0.15;
      orbit.scale.setScalar(pulse);

      orb.position.set(
        Math.cos(theta) * orbitRadius,
        Math.sin(theta * 1.4) * orbitRadius * verticalFactor * 0.35,
        Math.sin(theta) * orbitRadius
      );
    });
  });

  return (
    <group>
      {Array.from({ length: count }).map((_, i) => (
        <group
          key={i}
          ref={(el) => {
            orbitRefs.current[i] = el;
            return undefined;
          }}
        >
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[params[i].radius, width, 12, 96]} />
            <meshBasicMaterial
              color={params[i].color}
              transparent
              opacity={0.08}
              toneMapped={false}
            />
          </mesh>
          <mesh
            ref={(el) => {
              orbRefs.current[i] = el;
              return undefined;
            }}
          >
            <sphereGeometry args={[Math.max(width * 0.9, 0.12), 16, 16]} />
            <meshBasicMaterial
              color={params[i].color}
              transparent
              opacity={0.9}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export default CosmicEnergyWaves;
