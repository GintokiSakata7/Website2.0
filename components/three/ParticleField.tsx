'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGlobalState } from '../../store/useGlobalState';

const PARTICLE_COUNT = 420;

/** A deliberately restrained, low-cost particle layer for the studio universe.
 * It adds parallax depth without making the experience depend on a video or a
 * third-party embedded scene. The seeded field is stable between mounts.
 */
export function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const currentScene = useGlobalState((state) => state.currentScene);

  const geometry = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const lime = new THREE.Color('#9dff00');
    const white = new THREE.Color('#d9e6cd');

    const random = (seed: number) => {
      const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
      return value - Math.floor(value);
    };

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const offset = i * 3;
      positions[offset] = (random(i + 1) - 0.5) * 23;
      positions[offset + 1] = (random(i + 701) - 0.5) * 13;
      positions[offset + 2] = random(i + 1401) * -22 + 2;

      const tone = random(i + 2101) > 0.78 ? white : lime;
      const intensity = 0.08 + random(i + 2801) * 0.44;
      colors[offset] = tone.r * intensity;
      colors[offset + 1] = tone.g * intensity;
      colors[offset + 2] = tone.b * intensity;
    }

    const field = new THREE.BufferGeometry();
    field.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    field.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    field.computeBoundingSphere();
    return field;
  }, []);

  useFrame((state, delta) => {
    const points = pointsRef.current;
    if (!points) return;

    const time = state.clock.getElapsedTime();
    const isHero = currentScene === 'CORE';
    const spin = isHero ? 0.014 : 0.006;

    points.rotation.y = THREE.MathUtils.damp(
      points.rotation.y,
      Math.sin(time * 0.09) * 0.035,
      1.4,
      delta,
    );
    points.rotation.x = THREE.MathUtils.damp(
      points.rotation.x,
      state.pointer.y * 0.025 + Math.sin(time * 0.13) * 0.012,
      1.6,
      delta,
    );
    points.rotation.z += delta * spin * 0.08;
    points.position.y = Math.sin(time * 0.16) * 0.08;
  });

  return (
    <points ref={pointsRef} geometry={geometry} frustumCulled={false} renderOrder={-10}>
      <pointsMaterial
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.82}
        vertexColors
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
