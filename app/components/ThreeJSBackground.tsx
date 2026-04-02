'use client';

import { useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useThree } from '@react-three/fiber';
import { Stars, PerspectiveCamera, OrbitControls } from '@react-three/drei';

// Import our divine celestial components
import CosmicNebula from './CosmicNebula';
import CelestialParticles from './CelestialParticles';
import CosmicEnergyWaves from './CosmicEnergyWaves';
import CelestialOrbs from './CelestialOrbs';

// Canvas configuration with enhanced settings for divine visuals
const canvasConfig = {
  dpr: [1, 2] as [number, number],
  gl: {
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance' as const,
    stencil: false,
    depth: true,
    premultipliedAlpha: false
  }
};

// Divine celestial backdrop with advanced ethereal effects
const DivineBackdrop = () => {
  const { scene } = useThree();
  
  useEffect(() => {
    scene.fog = new THREE.FogExp2('#070b34', 0.02);

    return () => {
      scene.fog = null;
    };
  }, [scene]);

  return (
    <>
      {/* Rich deep space background */}
      <color attach="background" args={['#070b34']} />
      
      {/* Interactive camera setup */}
      <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={70} />
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.15}
        rotateSpeed={0.4}
        maxPolarAngle={Math.PI / 1.6}
        minPolarAngle={Math.PI / 2.4}
      />
      
      {/* Enhanced ambient lighting for better colors */}
      <ambientLight intensity={0.15} />
      <hemisphereLight args={['#4200c4', '#080c1f', 0.4]} />
      
      {/* Divine celestial components */}
      <group position={[0, 0, -10]}>
        {/* Cosmic nebula background */}
        <CosmicNebula
          colors={['#6100c2', '#3c096c', '#5a189a', '#7b2cbf', '#6930c3']}
          intensity={1.6}
          speed={0.08}
          distortionScale={1.2}
          noiseScale={4.5}
        />
        
        {/* Celestial particles */}
        <CelestialParticles 
          count={7000} 
          radius={30}
          size={0.03} 
          colors={['#ffffff', '#b88dff', '#7b2cbf', '#9d4edd', '#c77dff']} 
          speed={0.04}
        />
        
        {/* Energy waves */}
        <CosmicEnergyWaves 
          count={8} 
          colors={['#9d4edd', '#7b2cbf', '#5a189a', '#480ca8', '#3f37c9']} 
          radius={12}
          width={0.2}
          length={20}
          speed={0.25}
        />
        
        {/* Celestial orbs */}
        <CelestialOrbs />
        
        {/* Deep space stars */}
        <Stars
          radius={100}
          depth={50}
          count={8000}
          factor={6}
          saturation={0.2}
          fade
          speed={0.3}
        />
      </group>
    </>
  );
};

const ThreeJSBackground = () => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  if (!domLoaded) {
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#070b34] via-[#2d1062] to-[#070b34]">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,rgba(114,9,183,0.4),transparent_70%)]" />
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 -z-10 bg-gradient-radial from-[#070b34] via-[#2d1062] to-[#070b34] pointer-events-none">
        <div className="absolute inset-0 opacity-50 bg-[radial-gradient(ellipse_at_center,rgba(114,9,183,0.3),transparent_70%)]" />
        <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[linear-gradient(to_bottom_right,rgba(123,44,191,0.2),rgba(15,11,52,0.2),rgba(89,29,176,0.2))]" />
      </div>
      
      <div className="fixed inset-0 -z-20 overflow-hidden">
        <Canvas {...canvasConfig}>
          <DivineBackdrop />
        </Canvas>
      </div>
    </>
  );
};

export default ThreeJSBackground;
