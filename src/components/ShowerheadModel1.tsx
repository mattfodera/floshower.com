import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { MotionValue } from 'framer-motion';

interface ShowerheadModelProps {
  scrollProgress: MotionValue<number>;
  onLoadingComplete?: () => void;
}

const glbModel = '/src/assets/showerhead attempt 3 v2.1.1.glb';

export function ShowerheadModel1({ scrollProgress, onLoadingComplete }: ShowerheadModelProps) {
  const group = useRef<THREE.Group>(new THREE.Group());
  const { scene, animations, cameras } = useGLTF(glbModel);
  const { mixer } = useAnimations(animations, group);
  const { set } = useThree();
  const [initialAnimationsComplete, setInitialAnimationsComplete] = useState(false);
  const cameraAnimation1Ref = useRef<THREE.AnimationAction | null>(null);
  const objectAnimation1Ref = useRef<THREE.AnimationAction | null>(null);
  const initialTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialCameraRef = useRef<THREE.Camera | null>(null);
  const cameraMatrixRef = useRef<THREE.Matrix4 | null>(null);
  const lightRef = useRef<THREE.Light | null>(null);
  
  const INITIAL_ANIMATION_PERCENTAGE = 0.466;
  const LIGHT_CHANGE_THRESHOLD = 0.25; // 25% threshold for light color change
  
  useEffect(() => {
    if (scene && animations && onLoadingComplete) {
      // Find and store the light reference
      scene.traverse((child) => {
        if (child.name === "Light001" && child instanceof THREE.Light) {
          lightRef.current = child;
          // Start with green
          child.color.setRGB(0, 1, 0);
        }
      });
      onLoadingComplete();
    }

    if (cameras && cameras.length > 0) {
      const initialCamera = cameras.find(camera => camera.name === "Camera1");
      if (initialCamera) {
        initialCamera.matrixAutoUpdate = true;
        initialCameraRef.current = initialCamera;
        set({ camera: initialCamera });
      }
    }

    if (mixer && animations) {
      const cameraAnimation = mixer.clipAction(animations[0]);
      const objectAnimation = mixer.clipAction(animations[1]);

      cameraAnimation1Ref.current = cameraAnimation;
      objectAnimation1Ref.current = objectAnimation;

      cameraAnimation.setLoop(THREE.LoopOnce, 1);
      objectAnimation.setLoop(THREE.LoopOnce, 1);
      cameraAnimation.clampWhenFinished = true;
      objectAnimation.clampWhenFinished = true;

      const cameraDuration = cameraAnimation.getClip().duration;
      const objectDuration = objectAnimation.getClip().duration;
      const cameraInitialPoint = cameraDuration * INITIAL_ANIMATION_PERCENTAGE;
      const objectInitialPoint = objectDuration * INITIAL_ANIMATION_PERCENTAGE;

      cameraAnimation.play();
      objectAnimation.play();
      cameraAnimation.time = 0;
      objectAnimation.time = 0;
      mixer.update(0);

      initialTimeoutRef.current = setTimeout(() => {
        cameraAnimation.time = cameraInitialPoint;
        objectAnimation.time = objectInitialPoint;
        mixer.update(0);
        
        if (initialCameraRef.current) {
          cameraMatrixRef.current = initialCameraRef.current.matrix.clone();
          initialCameraRef.current.updateMatrixWorld(true);
        }
        
        setInitialAnimationsComplete(true);
      }, Math.max(cameraInitialPoint, objectInitialPoint) * 1000);

      return () => {
        if (initialTimeoutRef.current) {
          clearTimeout(initialTimeoutRef.current);
        }
        mixer.stopAllAction();
      };
    }
  }, [scene, animations, cameras, mixer, onLoadingComplete, set]);

  useFrame(() => {
    if (!mixer || !animations || !initialAnimationsComplete) return;

    try {
      if (cameraAnimation1Ref.current && objectAnimation1Ref.current && initialCameraRef.current && cameraMatrixRef.current) {
        const scrollPos = scrollProgress.get();
        const cameraDuration = cameraAnimation1Ref.current.getClip().duration;
        const objectDuration = objectAnimation1Ref.current.getClip().duration;

        const cameraRemainingTime = cameraDuration * (1 - INITIAL_ANIMATION_PERCENTAGE);
        const objectRemainingTime = objectDuration * (1 - INITIAL_ANIMATION_PERCENTAGE);

        const cameraTime = (cameraDuration * INITIAL_ANIMATION_PERCENTAGE) + 
          (scrollPos * cameraRemainingTime);
        const objectTime = (objectDuration * INITIAL_ANIMATION_PERCENTAGE) + 
          (scrollPos * objectRemainingTime);

        // Update animations
        cameraAnimation1Ref.current.time = cameraTime;
        objectAnimation1Ref.current.time = objectTime;
        mixer.update(0);

        // Update light color based on scroll progress
        if (lightRef.current) {
          if (scrollPos >= LIGHT_CHANGE_THRESHOLD) {
            lightRef.current.color.setRGB(1, 0, 0); // Red
          } else {
            lightRef.current.color.setRGB(0, 1, 0); // Green
          }
        }

        // Restore camera position if at initial percentage
        if (scrollPos === 0) {
          initialCameraRef.current.matrix.copy(cameraMatrixRef.current);
          initialCameraRef.current.updateMatrixWorld(true);
        }
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

useGLTF.preload(glbModel);