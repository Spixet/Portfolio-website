'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

const FloatingCube = ({ position, color }: { position: [number, number, number]; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const rotationSpeed = useRef({
    x: Math.random() * 0.01,
    y: Math.random() * 0.01,
    z: Math.random() * 0.01
  });
  
  const floatSpeed = useRef(0.0025 + Math.random() * 0.0025);
  const floatRange = useRef(0.2 + Math.random() * 0.3);
  const startingY = useRef(position[1]);
  const floatOffset = useRef(Math.random() * Math.PI * 2);

  useFrame((_, delta) => {
    if (meshRef.current) {
      // Rotation
      meshRef.current.rotation.x += rotationSpeed.current.x * delta * 60;
      meshRef.current.rotation.y += rotationSpeed.current.y * delta * 60;
      meshRef.current.rotation.z += rotationSpeed.current.z * delta * 60;
      
      // Floating motion
      const elapsedTime = performance.now() * 0.001; // Convert to seconds
      meshRef.current.position.y = startingY.current + 
        Math.sin(elapsedTime * floatSpeed.current + floatOffset.current) * floatRange.current;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
    </mesh>
  );
};

// Properly clean up ThreeJS resources
const SceneCleanup = () => {
  const { gl, scene } = useThree();
  
  useEffect(() => {
    // Function to dispose resources
    const disposeResources = () => {
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose();
          
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
    };
    
    // Listen for navigation events from our NavigationEvents component
    const handleNavigation = () => {
      disposeResources();
      if (gl.dispose) gl.dispose();
      if (gl.forceContextLoss) gl.forceContextLoss();
    };
    
    document.addEventListener('app:navigation', handleNavigation);
    
    return () => {
      document.removeEventListener('app:navigation', handleNavigation);
      disposeResources();
    };
  }, [gl, scene]);
  
  return null;
};

const ThreeBackground = () => {
  // Generate a unique key on component mount
  const [instanceKey] = useState(`three-bg-${Date.now()}`);
  
  // Handle component mounting and unmounting
  useEffect(() => {
    return () => {
      // Make doubly sure we clean up on unmount
      setTimeout(() => {
        const canvases = document.querySelectorAll('canvas');
        canvases.forEach(canvas => {
          const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
          if (gl && gl.getExtension) {
            const ext = gl.getExtension('WEBGL_lose_context');
            if (ext) ext.loseContext();
          }
        });
      }, 0);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas 
        key={instanceKey}
        camera={{ position: [0, 0, 5], fov: 75 }} 
        dpr={[1, 2]}
        gl={{
          powerPreference: 'high-performance',
          antialias: true,
          stencil: false,
          depth: true
        }}
      >
        <SceneCleanup />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <Stars
          radius={100}
          depth={50}
          count={2000}
          factor={4}
          saturation={0}
          fade
          speed={0.5}
        />
        <FloatingCube position={[-2, 0, 0]} color="#6366f1" />
        <FloatingCube position={[0, 0, 0]} color="#8b5cf6" />
        <FloatingCube position={[2, 0, 0]} color="#ec4899" />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;