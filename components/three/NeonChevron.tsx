'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NeonChevronProps {
  active: boolean;
}

/** A dimensional counterpart to the brand's signature neon chevron.
 * It fades with the current scene and reacts subtly to pointer movement.
 */
export function NeonChevron({ active }: NeonChevronProps) {
  const groupRef = useRef<THREE.Group>(null);
  const faceRef = useRef<THREE.MeshBasicMaterial>(null);
  const edgeRef = useRef<THREE.LineBasicMaterial>(null);
  const haloRef = useRef<THREE.LineBasicMaterial>(null);

  const { bodyGeometry, edgeGeometry } = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-2.1, 3.15);
    shape.lineTo(-1.0, 3.15);
    shape.lineTo(2.1, 0);
    shape.lineTo(-1.0, -3.15);
    shape.lineTo(-2.1, -3.15);
    shape.lineTo(1.0, 0);
    shape.closePath();

    const body = new THREE.ExtrudeGeometry(shape, {
      depth: 0.24,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.06,
      bevelThickness: 0.06,
      curveSegments: 1,
    });
    body.center();
    const edges = new THREE.EdgesGeometry(body, 24);
    return { bodyGeometry: body, edgeGeometry: edges };
  }, []);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const current = group.userData.opacity ?? 0;
    const next = THREE.MathUtils.damp(current, active ? 0.88 : 0, 2.1, delta);
    group.userData.opacity = next;
    group.visible = next > 0.002;

    if (faceRef.current) faceRef.current.opacity = 0.075 * next;
    if (edgeRef.current) edgeRef.current.opacity = 0.72 * next;
    if (haloRef.current) haloRef.current.opacity = 0.18 * next;

    const time = state.clock.getElapsedTime();
    group.rotation.y = THREE.MathUtils.damp(
      group.rotation.y,
      state.pointer.x * 0.09 + Math.sin(time * 0.22) * 0.035,
      2.2,
      delta,
    );
    group.rotation.x = THREE.MathUtils.damp(
      group.rotation.x,
      -state.pointer.y * 0.045 + Math.sin(time * 0.18) * 0.018,
      2.2,
      delta,
    );
    group.rotation.z = Math.sin(time * 0.15) * 0.012;
    group.position.y = Math.sin(time * 0.24) * 0.09;
  });

  return (
    <group ref={groupRef} position={[5.2, 0.15, -4.2]} scale={1.05}>
      <mesh geometry={bodyGeometry} renderOrder={-2}>
        <meshBasicMaterial
          ref={faceRef}
          color="#9dff00"
          transparent
          opacity={0}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <lineSegments geometry={edgeGeometry} renderOrder={-1}>
        <lineBasicMaterial ref={edgeRef} color="#bfff69" transparent opacity={0} depthWrite={false} />
      </lineSegments>
      <lineSegments geometry={edgeGeometry} scale={1.075} renderOrder={-3}>
        <lineBasicMaterial ref={haloRef} color="#9dff00" transparent opacity={0} depthWrite={false} />
      </lineSegments>
    </group>
  );
}
