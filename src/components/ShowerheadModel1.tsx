import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { MotionValue } from 'framer-motion';

interface ShowerheadModelProps {
  scrollProgress: MotionValue<number>;
  onLoadingComplete?: () => void;
}

export function ShowerheadModel1({ scrollProgress, onLoadingComplete }: ShowerheadModelProps) {
  const group = useRef<THREE.Group>(new THREE.Group());
  const { scene, animations, cameras } = useGLTF('/src/assets/showerhead attempt 2 v6.02.glb');
  const { mixer } = useAnimations(animations, group);
  const { set } = useThree();
  const [initialAnimationsComplete, setInitialAnimationsComplete] = useState(false);
  const cameraAnimation2Ref = useRef<THREE.AnimationAction | null>(null);
  const objectAnimation2Ref = useRef<THREE.AnimationAction | null>(null);
  
  useEffect(() => {
    if (scene && animations && onLoadingComplete) {
      onLoadingComplete();
    }

    // Set up the initial camera (Camera1)
    if (cameras && cameras.length > 0) {
      const initialCamera = cameras.find(camera => camera.name === "Camera1");
      if (initialCamera) {
        initialCamera.matrixAutoUpdate = true;
        set({ camera: initialCamera });
      }
    }

    if (mixer && animations) {
      // Set up initial animations (cameracameraAnimation2 and objectcameraAnimation2)
      const cameracameraAnimation2 = mixer.clipAction(animations[0]);
      const objectcameraAnimation2 = mixer.clipAction(animations[2]);

      cameracameraAnimation2.setLoop(THREE.LoopOnce, 1);
      objectcameraAnimation2.setLoop(THREE.LoopOnce, 1);
      cameracameraAnimation2.clampWhenFinished = true;
      objectcameraAnimation2.clampWhenFinished = true;

      // Add event listener for animation completion
      cameracameraAnimation2.reset().play();
      objectcameraAnimation2.reset().play();

      const onAnimationComplete = () => {
        setInitialAnimationsComplete(true);
        
        // Switch to Camera2
        const camera2 = cameras.find(camera => camera.name === "Camera2");
        if (camera2) {
          camera2.matrixAutoUpdate = true;
          set({ camera: camera2 });
        }

        // Set up scroll-controlled animations
        const cameraAnimation2 = mixer.clipAction(animations[1]);
        const objectAnimation2 = mixer.clipAction(animations[3]);

        cameraAnimation2.setLoop(THREE.LoopOnce, 1);
        objectAnimation2.setLoop(THREE.LoopOnce, 1);
        cameraAnimation2.clampWhenFinished = true;
        objectAnimation2.clampWhenFinished = true;

        // Store references for use in useFrame
        cameraAnimation2Ref.current = cameraAnimation2;
        objectAnimation2Ref.current = objectAnimation2;

        // Start the animations but pause them immediately
        cameraAnimation2.play().paused = true;
        objectAnimation2.play().paused = true;
      };

      // Listen for the end of the longer animation
      const duration = Math.max(cameracameraAnimation2.getClip().duration, objectcameraAnimation2.getClip().duration);
      setTimeout(onAnimationComplete, duration * 1000);

      return () => {
        mixer.stopAllAction();
      };
    }
  }, [scene, animations, cameras, mixer, onLoadingComplete, set]);

  useFrame((_, delta) => {
    if (!mixer || !animations) return;

    try {
      mixer.update(delta);

      // Update scroll-controlled animations
      if (initialAnimationsComplete && cameraAnimation2Ref.current && objectAnimation2Ref.current) {
        const scrollPos = scrollProgress.get();
        const cameraAnimation2Duration = cameraAnimation2Ref.current.getClip().duration;
        const objectAnimation2Duration = objectAnimation2Ref.current.getClip().duration;

        // Set the time of both animations based on scroll position
        cameraAnimation2Ref.current.time = scrollPos * cameraAnimation2Duration;
        objectAnimation2Ref.current.time = scrollPos * objectAnimation2Duration;
      }
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
useGLTF.preload('/src/assets/showerhead attempt 2 v6.02.glb');