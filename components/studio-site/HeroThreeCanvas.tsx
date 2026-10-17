'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroThreeCanvasProps {
  className?: string;
}

export default function HeroThreeCanvas({ className = '' }: HeroThreeCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    let width = container.clientWidth || 300;
    let height = container.clientHeight || 300;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 7.5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Group for all core 3D items to allow global parallax tilt
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Inner Faceted Holographic Crystal
    const innerGeo = new THREE.IcosahedronGeometry(1.22, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x00ff85,
      emissive: 0x003d1f,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.4,
      transparent: true,
      opacity: 0.24,
      flatShading: true,
    });
    const innerCrystal = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerCrystal);

    // 2. Outer Kinetic Wireframe Cage
    const outerGeo = new THREE.IcosahedronGeometry(1.65, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x00ff85,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const outerCage = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerCage);

    // 3. Orbital Ring 1 (Tilted Gyro Ring)
    const ring1Geo = new THREE.TorusGeometry(2.3, 0.024, 16, 120);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x00ff85,
      transparent: true,
      opacity: 0.75,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    coreGroup.add(ring1);

    // Orbiting Satellite on Ring 1
    const sat1Geo = new THREE.SphereGeometry(0.08, 16, 16);
    const sat1Mat = new THREE.MeshBasicMaterial({ color: 0x10ff96 });
    const sat1 = new THREE.Mesh(sat1Geo, sat1Mat);
    coreGroup.add(sat1);

    // 4. Orbital Ring 2 (Counter-tilted Ring)
    const ring2Geo = new THREE.TorusGeometry(2.7, 0.018, 16, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x00e676,
      transparent: true,
      opacity: 0.5,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 3.5;
    ring2.rotation.z = Math.PI / 4;
    coreGroup.add(ring2);

    // Orbiting Satellite on Ring 2
    const sat2Geo = new THREE.SphereGeometry(0.065, 16, 16);
    const sat2Mat = new THREE.MeshBasicMaterial({ color: 0x00ff85 });
    const sat2 = new THREE.Mesh(sat2Geo, sat2Mat);
    coreGroup.add(sat2);

    // 5. Constellation Cloud (Floating Dust & Sparks)
    const particleCount = 65;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 1.9 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00ff85,
      size: 0.07,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    coreGroup.add(particles);

    // 6. Strategic Lights
    const ambientLight = new THREE.AmbientLight(0x042316, 2.5);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(0x00ff85, 4.5, 12);
    keyLight.position.set(2.5, 3, 3);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x00e676, 3, 10);
    fillLight.position.set(-3, -2, 2);
    scene.add(fillLight);

    // Mouse Tracking & Drag Interaction
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let dragVelocityX = 0;
    let dragVelocityY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        dragVelocityX = deltaX * 0.006;
        dragVelocityY = deltaY * 0.006;
        targetRotationY += dragVelocityX;
        targetRotationX += dragVelocityY;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
        return;
      }

      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY = normX * 0.45;
      targetRotationX = -normY * 0.45;
    };

    const handlePointerDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);

    // Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    resizeObserver.observe(container);

    // Visibility Check (Pause rendering when scrolled out of view)
    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    intersectionObserver.observe(container);

    // Animation Loop
    let animId = 0;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Inertia interpolation
      currentRotationX += (targetRotationX - currentRotationX) * 0.08;
      currentRotationY += (targetRotationY - currentRotationY) * 0.08;

      // Spin crystal & cage
      innerCrystal.rotation.y = elapsedTime * 0.4 + currentRotationY;
      innerCrystal.rotation.x = Math.sin(elapsedTime * 0.3) * 0.2 + currentRotationX;

      outerCage.rotation.y = -elapsedTime * 0.3 + currentRotationY * 1.2;
      outerCage.rotation.x = Math.cos(elapsedTime * 0.25) * 0.25 + currentRotationX * 1.2;

      // Gyro Rings Spin
      ring1.rotation.z = elapsedTime * 0.6;
      ring2.rotation.y = -elapsedTime * 0.45;

      // Satellite Orbits
      const sat1Angle = elapsedTime * 1.2;
      sat1.position.x = 2.3 * Math.cos(sat1Angle);
      sat1.position.y = 2.3 * Math.sin(sat1Angle) * Math.cos(Math.PI / 3);
      sat1.position.z = 2.3 * Math.sin(sat1Angle) * Math.sin(Math.PI / 3);

      const sat2Angle = -elapsedTime * 0.9;
      sat2.position.x = 2.7 * Math.cos(sat2Angle);
      sat2.position.y = 2.7 * Math.sin(sat2Angle) * Math.cos(-Math.PI / 3.5);
      sat2.position.z = 2.7 * Math.sin(sat2Angle) * Math.sin(-Math.PI / 3.5);

      // Rotate particle constellation
      particles.rotation.y = elapsedTime * 0.08;
      particles.rotation.x = Math.sin(elapsedTime * 0.05) * 0.1;

      // Subtle breathing pulse on lights
      keyLight.intensity = 4.2 + Math.sin(elapsedTime * 2.5) * 0.8;
      innerMat.emissiveIntensity = 0.65 + Math.sin(elapsedTime * 2) * 0.2;

      // Parallax group tilt
      coreGroup.rotation.y = currentRotationY * 0.35;
      coreGroup.rotation.x = currentRotationX * 0.35;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      innerGeo.dispose();
      innerMat.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      sat1Geo.dispose();
      sat1Mat.dispose();
      sat2Geo.dispose();
      sat2Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();

      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing ${className}`}
      aria-label="Interactive 3D Kinetic Core"
    />
  );
}
