'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Inner kinetic gemstone core that rotates and reacts to mouse and scroll
function KineticCrystal({ mousePos, scrollY }: { mousePos: { x: number; y: number }; scrollY: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Scroll factor for dynamic rotation and translation
    const scrollFactor = Math.min(scrollY / 1200, 2);

    if (meshRef.current) {
      // Smooth continuous spin + mouse reaction + scroll rotation
      const targetRotX = mousePos.y * 0.5 + scrollFactor * 1.2 + Math.sin(time * 0.35) * 0.15;
      const targetRotY = mousePos.x * 0.6 + scrollFactor * 1.8 + time * 0.25;
      
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, delta * 2.5);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, delta * 2.5);

      // Subtle breathing scale
      const scale = 1.15 + Math.sin(time * 1.1) * 0.03 - scrollFactor * 0.15;
      meshRef.current.scale.set(scale, scale, scale);
    }

    if (wireRef.current) {
      wireRef.current.rotation.x = -time * 0.15 + mousePos.y * 0.2;
      wireRef.current.rotation.y = time * 0.3 + mousePos.x * 0.2;
      wireRef.current.rotation.z = time * 0.1;
    }

    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 3 + Math.sin(time * 0.4) * 0.15 + mousePos.y * 0.3;
      ringRef.current.rotation.y = time * 0.35 + scrollFactor * 1.4;
      ringRef.current.rotation.z = Math.cos(time * 0.25) * 0.15;
    }

    if (innerCoreRef.current) {
      const pulse = 0.42 + Math.sin(time * 2.2) * 0.05;
      innerCoreRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group position={[0, -0.15, 0]}>
      {/* Outer Faceted Geometric Crystal — Ethereal frosted mint glass */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.35, 0]} />
        <meshPhysicalMaterial
          color="#d1fae5"
          roughness={0.08}
          metalness={0.05}
          transmission={0.94}
          thickness={0.9}
          ior={1.5}
          reflectivity={0.7}
          clearcoat={0.9}
          clearcoatRoughness={0.08}
          emissive="#10b981"
          emissiveIntensity={0.12}
          transparent
          opacity={0.38}
        />
      </mesh>

      {/* Futuristic Wireframe Energy Shell */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.55, 1]} />
        <meshBasicMaterial
          color="#00e676"
          wireframe
          transparent
          opacity={0.16}
        />
      </mesh>

      {/* Orbiting Tech Gyro Rings */}
      <group ref={ringRef}>
        <mesh>
          <torusGeometry args={[1.9, 0.015, 16, 64]} />
          <meshBasicMaterial color="#059669" transparent opacity={0.35} />
        </mesh>
        <mesh rotation={[Math.PI / 2.2, 0, 0]}>
          <torusGeometry args={[1.7, 0.012, 16, 64]} />
          <meshBasicMaterial color="#00e676" transparent opacity={0.3} />
        </mesh>
      </group>

      {/* Luminous Inner Core */}
      <mesh ref={innerCoreRef}>
        <dodecahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color="#10e872"
          emissive="#00e676"
          emissiveIntensity={1.4}
          roughness={0.15}
          wireframe={false}
          transparent
          opacity={0.75}
        />
      </mesh>

      {/* Point Light inside the crystal for neon emerald glow */}
      <pointLight color="#00e676" intensity={2.2} distance={5} decay={2} />
    </group>
  );
}

// Floating ambient light particles
function AmbientSparks({ count = 35 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  });

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00e676"
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  );
}

export default function SplineHeroCanvas() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-36 h-36 rounded-full border border-emerald-500/20 animate-pulse bg-emerald-500/5" />
      </div>
    );
  }

  return (
    <div className="w-full h-full relative pointer-events-none select-none">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 40 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 6, 5]} intensity={2.0} color="#ffffff" />
        <directionalLight position={[-4, -2, -2]} intensity={0.9} color="#a7f3d0" />
        <pointLight position={[0, 2, 2]} intensity={1.8} color="#00e676" distance={8} />

        <Float speed={1.5} rotationIntensity={0.35} floatIntensity={0.6}>
          <KineticCrystal mousePos={mousePos} scrollY={scrollY} />
        </Float>

        <AmbientSparks count={30} />
      </Canvas>
    </div>
  );
}
