import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { MotionValue } from 'framer-motion';

interface ShowerheadModelProps {
  scrollProgress: MotionValue<number>;
}

export function ShowerheadModel1({ scrollProgress }: ShowerheadModelProps) {
  const group = useRef<THREE.Group>(new THREE.Group());
  const { scene } = useGLTF('/showerhead3.glb');
  const currentRotation = useRef({ x: 0, y: 0, z: 0 });
  const targetRotation = useRef({ x: 0, y: 0, z: 0 });
  const currentPosition = useRef({ x: 0, y: 0, z: 0 });
  const targetPosition = useRef({ x: 0, y: 0, z: 0 });
  const currentScale = useRef(1);
  const targetScale = useRef(1);
  const floatTime = useRef(0); // For floating effect

  const calculatePhaseTransform = (scrollPos: number) => {
    const baseXRotation = Math.PI / 6; // Isometric tilt
    const subtleZRotation = Math.PI / 8; // Subtle Z oscillation

    if (scrollPos <= 0.25) {
      // Top 1/4: Zoom out and move left
      const progress = scrollPos * 4; // 0 to 1 within this section
      return {
        rotation: { x: baseXRotation, y: 0, z: 0 },
        position: { x: -progress * 2, y: 0, z: 0 }, // Move left
        scale: 2 - progress // Zoom from 2 to 1
      };
    } else if (scrollPos <= 0.75) {
      // Middle 1/2: Oscillate Y and Z
      const progress = (scrollPos - 0.25) * 2; // 0 to 1 within this section
      return {
        rotation: {
          x: baseXRotation,
          y: Math.sin(progress * Math.PI * 2) * Math.PI, // Y oscillation
          z: Math.sin(progress * Math.PI) * subtleZRotation // Z oscillation
        },
        position: { x: -2, y: 0, z: 0 }, // Stay left
        scale: 1 // Normal scale
      };
    } else {
      // Bottom 1/4: Zoom out significantly
      const progress = (scrollPos - 0.75) * 4; // 0 to 1 within this section
      return {
        rotation: {
          x: baseXRotation,
          y: Math.sin(scrollPos * Math.PI * 2) * Math.PI, // Continue Y oscillation
          z: Math.sin(scrollPos * Math.PI) * subtleZRotation // Continue Z oscillation
        },
        position: { x: -2, y: 0, z: 0 }, // Stay left
        scale: 1 - progress * 0.5 // Zoom out to 0.5
      };
    }
  };

  useFrame((_, delta) => {
    if (!group.current) return;

    try {
      const scrollPos = scrollProgress.get();
      const transform = calculatePhaseTransform(scrollPos);

      // Update target rotation, position, and scale
      targetRotation.current = transform.rotation;
      targetPosition.current = transform.position;
      targetScale.current = transform.scale;

      // Smoothly interpolate
      currentRotation.current = {
        x: THREE.MathUtils.lerp(currentRotation.current.x, targetRotation.current.x, 0.1),
        y: THREE.MathUtils.lerp(currentRotation.current.y, targetRotation.current.y, 0.1),
        z: THREE.MathUtils.lerp(currentRotation.current.z, targetRotation.current.z, 0.1)
      };
      currentPosition.current = {
        x: THREE.MathUtils.lerp(currentPosition.current.x, targetPosition.current.x, 0.1),
        y: THREE.MathUtils.lerp(currentPosition.current.y, targetPosition.current.y, 0.1),
        z: THREE.MathUtils.lerp(currentPosition.current.z, targetPosition.current.z, 0.1)
      };
      currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale.current, 0.1);

      // Floating effect
      floatTime.current += delta;
      const floatOffset = Math.sin(floatTime.current * 2) * 0.1; // Wave-like motion

      // Apply transformations
      group.current.rotation.set(
        currentRotation.current.x,
        currentRotation.current.y,
        currentRotation.current.z
      );
      group.current.position.set(
        currentPosition.current.x,
        currentPosition.current.y + floatOffset, // Add floating effect to Y position
        currentPosition.current.z
      );
      group.current.scale.setScalar(currentScale.current);
    } catch (error) {
      console.error('Error updating model transform:', error);
    }
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}