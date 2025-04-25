import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { MotionValue } from 'framer-motion';

interface ShowerheadModelProps {
  scrollProgress: MotionValue<number>;
  onLoadingComplete?: () => void;
}

export function ShowerheadModel1({ scrollProgress, onLoadingComplete }: ShowerheadModelProps) {
  const group = useRef<THREE.Group>(new THREE.Group());
  const { scene, animations } = useGLTF('/src/assets/animation 1 v5.glb');
  const { mixer } = useAnimations(animations, group);
  
  useEffect(() => {
    if (scene && animations && onLoadingComplete) {
      onLoadingComplete();
    }

    // Get the animations by index
    const initialAnimation = animations[1];
    const scrollAnimation = animations[2];

    if (initialAnimation && scrollAnimation && mixer) {
      // Set up the initial animation to play once
      const initialAction = mixer.clipAction(initialAnimation);
      initialAction.setLoop(THREE.LoopOnce, 1);
      initialAction.clampWhenFinished = true;
      initialAction.play();

      // Set up the scroll animation but don't play it yet
      const scrollAction = mixer.clipAction(scrollAnimation);
      scrollAction.play();
      scrollAction.paused = true;

      return () => {
        initialAction.stop();
        scrollAction.stop();
      };
    }
  }, [scene, animations, mixer, onLoadingComplete]);

  useFrame((_, delta) => {
    if (!mixer || !animations[2]) return;

    try {
      // Update the mixer for the initial animation
      mixer.update(delta);

      // Control the scroll animation based on scroll progress
      const scrollAction = mixer.clipAction(animations[2]);
      const scrollPos = scrollProgress.get();
      scrollAction.time = scrollPos * animations[2].duration;
      scrollAction.paused = true; // Keep it paused as we're manually setting the time
    } catch (error) {
      console.error('Error updating animations:', error);
    }
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

// Pre-load the model
useGLTF.preload('/src/assets/animation 1 v3.glb');