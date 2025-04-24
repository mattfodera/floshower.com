import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Html, useProgress, Float } from '@react-three/drei';
import * as THREE from 'three';
import { MotionValue } from 'framer-motion';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-white">
        <div className="w-24 h-24 border-4 border-t-led-green border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-led-green text-xl font-light">
          {progress.toFixed(0)}%<br />loading your experience
        </div>
      </div>
    </Html>
  );
}

interface ShowerheadModelProps {
  scrollProgress: MotionValue<number>;
  onLoadingComplete?: () => void;
}

function ShowerheadModel({ scrollProgress, onLoadingComplete }: ShowerheadModelProps) {
  const group = useRef<THREE.Group>(new THREE.Group());
  const { scene } = useGLTF('/showerhead3.glb');
  const currentRotation = useRef({ x: 0, y: 0, z: 0 });
  const targetRotation = useRef({ x: 0, y: 0, z: 0 });
  const currentPosition = useRef({ x: 0, y: 0, z: 0 });
  const targetPosition = useRef({ x: 0, y: 0, z: 0 });
  const currentScale = useRef(1);
  const targetScale = useRef(1);

  // Call onLoadingComplete when the model is loaded
  if (scene && onLoadingComplete) {
    onLoadingComplete();
  }

  const calculatePhaseTransform = (scrollPos: number) => {
    const baseXRotation = Math.PI / 6;
    const subtleZRotation = Math.PI / 8;

    if (scrollPos <= 0.25) {
      const progress = scrollPos * 4;
      return {
        rotation: { x: baseXRotation, y: 0, z: 0 },
        position: { x: -progress * 2, y: 0, z: 0 },
        scale: 2 - progress
      };
    } else if (scrollPos <= 0.75) {
      const progress = (scrollPos - 0.25) * 2;
      return {
        rotation: {
          x: baseXRotation,
          y: Math.sin(progress * Math.PI * 2) * Math.PI,
          z: Math.sin(progress * Math.PI) * subtleZRotation
        },
        position: { x: -2, y: 0, z: 0 },
        scale: 1
      };
    } else {
      const progress = (scrollPos - 0.75) * 4;
      return {
        rotation: {
          x: baseXRotation,
          y: Math.sin(scrollPos * Math.PI * 2) * Math.PI,
          z: Math.sin(scrollPos * Math.PI) * subtleZRotation
        },
        position: { x: -2, y: 0, z: 0 },
        scale: 1 - progress * 0.5
      };
    }
  };

  useFrame((state, delta) => {
    if (!group.current) return;

    try {
      const scrollPos = scrollProgress.get();
      const transform = calculatePhaseTransform(scrollPos);

      targetRotation.current = transform.rotation;
      targetPosition.current = transform.position;
      targetScale.current = transform.scale;

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

      group.current.rotation.set(
        currentRotation.current.x,
        currentRotation.current.y,
        currentRotation.current.z
      );
      group.current.position.set(
        currentPosition.current.x,
        currentPosition.current.y,
        currentPosition.current.z
      );
      group.current.scale.setScalar(currentScale.current);
    } catch (error) {
      console.error('Error updating model transform:', error);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0} floatIntensity={1}>
      <primitive 
        ref={group} 
        object={scene} 
        position={[0, 0, 0]}
        scale={window.innerWidth <= 768 ? 1 : 2.5}
      />
    </Float>
  );
}

interface ProductSectionProps {
  title: string;
  subtitle: string;
  scrollProgress: MotionValue<number>;
  onLoadingComplete?: () => void;
}

export default function ProductSection({
  title,
  subtitle,
  scrollProgress,
  onLoadingComplete,
}: ProductSectionProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        className="w-full h-full"
        camera={{
          position: [0, 0, 5],
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
      >
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <spotLight
            position={[0, 10, 0]}
            angle={0.3}
            penumbra={1}
            intensity={2}
            castShadow
          />
          <ShowerheadModel scrollProgress={scrollProgress} onLoadingComplete={onLoadingComplete} />
        </Suspense>
      </Canvas>

      <div className="absolute top-[20%] left-0 w-full text-center z-10">
        <h1 className="text-[clamp(2rem,5vw,4rem)] mb-4 tracking-wider">{title}</h1>
        <p className="text-[clamp(1rem,2vw,1.5rem)]">{subtitle}</p>
      </div>
    </div>
  );
}