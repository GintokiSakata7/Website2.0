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

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030508, 0.00075);

    const camera = new THREE.PerspectiveCamera(65, width / height, 1, 2000);
    camera.position.z = 400;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x030508, 0);
    container.appendChild(renderer.domElement);

    // ----------------------------------------------------
    // 1. Warp Starfield (Traveling forward towards viewer)
    // ----------------------------------------------------
    const STAR_COUNT = 1500;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(STAR_COUNT * 3);
    const starColors = new Float32Array(STAR_COUNT * 3);
    const starSizes = new Float32Array(STAR_COUNT);
    const starVelocities = new Float32Array(STAR_COUNT);

    const baseColors = [
      new THREE.Color('#ffffff'), // pure starlight
      new THREE.Color('#ffffff'),
      new THREE.Color('#f0f9ff'), // silver
      new THREE.Color('#a7f3d0'), // soft emerald
      new THREE.Color('#6ee7b7'), // lime/mint starlight
      new THREE.Color('#e0f2fe'), // subtle ice blue
    ];

    for (let i = 0; i < STAR_COUNT; i++) {
      const radius = 25 + Math.random() * 950;
      const angle = Math.random() * Math.PI * 2;
      starPositions[i * 3] = Math.cos(angle) * radius;
      starPositions[i * 3 + 1] = Math.sin(angle) * radius;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 1600;

      const col = baseColors[Math.floor(Math.random() * baseColors.length)];
      starColors[i * 3] = col.r;
      starColors[i * 3 + 1] = col.g;
      starColors[i * 3 + 2] = col.b;

      starSizes[i] = 1.2 + Math.random() * 3.2;
      starVelocities[i] = 1.4 + Math.random() * 3.0;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    starGeo.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

    // Custom circle texture for soft round stars
    const createStarTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.2, 'rgba(255, 255, 255, 0.9)');
        grad.addColorStop(0.5, 'rgba(0, 255, 133, 0.4)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const starTexture = createStarTexture();

    const starMat = new THREE.PointsMaterial({
      size: 3.8,
      map: starTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // ----------------------------------------------------
    // 2. Warp Streaks (High-speed hyper-drive light lines)
    // ----------------------------------------------------
    const STREAK_COUNT = 180;
    const streakPositions = new Float32Array(STREAK_COUNT * 6);
    const streakColors = new Float32Array(STREAK_COUNT * 6);
    const streakData: { x: number; y: number; z: number; length: number; speed: number }[] = [];

    for (let i = 0; i < STREAK_COUNT; i++) {
      const radius = 50 + Math.random() * 900;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = -700 + Math.random() * 1100;
      const length = 28 + Math.random() * 85;
      const speed = 4.0 + Math.random() * 6.0;

      streakData.push({ x, y, z, length, speed });

      const idx = i * 6;
      streakPositions[idx] = x;
      streakPositions[idx + 1] = y;
      streakPositions[idx + 2] = z;

      streakPositions[idx + 3] = x;
      streakPositions[idx + 4] = y;
      streakPositions[idx + 5] = z - length;

      // Color with fade from bright white head to cyan/emerald tail
      streakColors[idx] = 1;
      streakColors[idx + 1] = 1;
      streakColors[idx + 2] = 1;

      streakColors[idx + 3] = 0;
      streakColors[idx + 4] = 0.95;
      streakColors[idx + 5] = 0.55;
    }

    const streakGeo = new THREE.BufferGeometry();
    streakGeo.setAttribute('position', new THREE.BufferAttribute(streakPositions, 3));
    streakGeo.setAttribute('color', new THREE.BufferAttribute(streakColors, 3));

    const streakMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const streaks = new THREE.LineSegments(streakGeo, streakMat);
    scene.add(streaks);

    // ----------------------------------------------------
    // 3. Ambient Deep Cosmos Nebula Dust (Volumetric glow)
    // ----------------------------------------------------
    const NEBULA_COUNT = 7;
    const nebulaGroup = new THREE.Group();
    scene.add(nebulaGroup);

    const createNebulaTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        grad.addColorStop(0, 'rgba(0, 255, 133, 0.4)');
        grad.addColorStop(0.35, 'rgba(0, 200, 160, 0.2)');
        grad.addColorStop(0.7, 'rgba(3, 30, 20, 0.08)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 128, 128);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const nebulaTexture = createNebulaTexture();
    const nebulaMat = new THREE.SpriteMaterial({
      map: nebulaTexture,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    for (let i = 0; i < NEBULA_COUNT; i++) {
      const sprite = new THREE.Sprite(nebulaMat);
      const angle = (i / NEBULA_COUNT) * Math.PI * 2;
      const dist = 280 + Math.random() * 380;
      sprite.position.set(Math.cos(angle) * dist, Math.sin(angle) * dist, -350 - Math.random() * 350);
      const scale = 520 + Math.random() * 380;
      sprite.scale.set(scale, scale, 1);
      nebulaGroup.add(sprite);
    }

    // ----------------------------------------------------
    // 4. Interactive Physics & Pointer Dynamics
    // ----------------------------------------------------
    let targetCameraX = 0;
    let targetCameraY = 0;
    let currentCameraX = 0;
    let currentCameraY = 0;
    let warpFactor = 1.0;
    let targetWarpFactor = 1.0;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let lastPointerTime = performance.now();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      targetCameraX = nx * 140;
      targetCameraY = ny * 90;

      // Measure cursor velocity to give responsive warp surge
      const now = performance.now();
      const dt = Math.max(now - lastPointerTime, 16);
      const dist = Math.hypot(e.clientX - lastPointerX, e.clientY - lastPointerY);
      const speed = dist / dt;
      if (speed > 1.1) {
        targetWarpFactor = Math.min(2.7, 1.0 + (speed - 1.1) * 0.35);
      }
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      lastPointerTime = now;
    };

    const handlePointerDown = () => {
      targetWarpFactor = 3.0; // Warp surge on click
    };

    const handlePointerUp = () => {
      targetWarpFactor = 1.0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const nx = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        targetCameraX = nx * 90;
        targetCameraY = ny * 60;
      }
    };

    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let lastScrollTime = performance.now();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const now = performance.now();
      const dt = Math.max(now - lastScrollTime, 16);
      const delta = Math.abs(currentScrollY - lastScrollY);
      const scrollSpeed = delta / dt; // pixels per ms
      if (scrollSpeed > 0.06) {
        targetWarpFactor = Math.min(4.8, Math.max(targetWarpFactor, 1.0 + scrollSpeed * 2.4));
      }
      lastScrollY = currentScrollY;
      lastScrollTime = now;
    };

    const handleWheel = (e: WheelEvent) => {
      const wheelDelta = Math.abs(e.deltaY);
      if (wheelDelta > 4) {
        targetWarpFactor = Math.min(5.0, targetWarpFactor + Math.min(wheelDelta * 0.018, 2.5));
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    // ----------------------------------------------------
    // 5. Responsive Resize Observer
    // ----------------------------------------------------
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

    // ----------------------------------------------------
    // 6. Animation Loop (Continuous Full-Page Flight)
    // ----------------------------------------------------
    let animId = 0;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
      const maxScroll = typeof document !== 'undefined' ? Math.max(document.body.scrollHeight - window.innerHeight, 1) : 1;
      const scrollRatio = scrollY / maxScroll;

      // Smooth camera interpolation with scroll flight
      currentCameraX += (targetCameraX - currentCameraX) * 0.055;
      currentCameraY += (targetCameraY - currentCameraY) * 0.055;

      camera.position.x = currentCameraX;
      camera.position.y = currentCameraY - scrollRatio * 120;
      camera.position.z = 400 + scrollRatio * 220 + Math.sin(elapsedTime * 0.35) * 12;
      camera.rotation.z = scrollRatio * 0.45;
      camera.lookAt(currentCameraX * 0.22, currentCameraY * 0.22 - scrollRatio * 80, -400);

      // Smooth warp factor return
      warpFactor += (targetWarpFactor - warpFactor) * 0.08;
      targetWarpFactor += (1.0 - targetWarpFactor) * 0.04;

      // Update Starfield Positions with fluid cursor wake
      const positions = starGeo.attributes.position.array as Float32Array;
      const pointerMagnitude = Math.hypot(currentCameraX, currentCameraY);
      for (let i = 0; i < STAR_COUNT; i++) {
        const idx = i * 3;
        const speed = starVelocities[i] * warpFactor;
        positions[idx + 2] += speed;

        // Fluid cursor wake: particles subtly deflect around cursor position
        if (pointerMagnitude > 8) {
          const dx = positions[idx] - currentCameraX * 2.2;
          const dy = positions[idx + 1] - currentCameraY * 2.2;
          const distSq = dx * dx + dy * dy;
          if (distSq < 36000 && distSq > 100) {
            const force = (1 - distSq / 36000) * 0.75;
            positions[idx] += (dx / Math.sqrt(distSq)) * force;
            positions[idx + 1] += (dy / Math.sqrt(distSq)) * force;
          }
        }

        // When star flies past camera, recycle it deep into distance
        if (positions[idx + 2] > 480) {
          positions[idx + 2] = -900;
          const radius = 25 + Math.random() * 950;
          const angle = Math.random() * Math.PI * 2;
          positions[idx] = Math.cos(angle) * radius;
          positions[idx + 1] = Math.sin(angle) * radius;
        }
      }
      starGeo.attributes.position.needsUpdate = true;

      // Update Warp Streaks with hyperspace elongation
      const streakPos = streakGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < STREAK_COUNT; i++) {
        const s = streakData[i];
        const speed = s.speed * warpFactor * 1.5;
        s.z += speed;

        if (s.z > 480) {
          s.z = -900;
          const radius = 50 + Math.random() * 900;
          const angle = Math.random() * Math.PI * 2;
          s.x = Math.cos(angle) * radius;
          s.y = Math.sin(angle) * radius;
        }

        const idx = i * 6;
        streakPos[idx] = s.x;
        streakPos[idx + 1] = s.y;
        streakPos[idx + 2] = s.z;

        streakPos[idx + 3] = s.x;
        streakPos[idx + 4] = s.y;
        streakPos[idx + 5] = s.z - s.length * (warpFactor * 1.25);
      }
      streakGeo.attributes.position.needsUpdate = true;

      // Slowly rotate nebula background for alive depth
      nebulaGroup.rotation.z = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('touchmove', handleTouchMove);
      resizeObserver.disconnect();

      starGeo.dispose();
      starMat.dispose();
      starTexture.dispose();
      streakGeo.dispose();
      streakMat.dispose();
      nebulaTexture.dispose();
      nebulaMat.dispose();

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
      aria-label="Responsive Cosmic Space Background"
    />
  );
}
