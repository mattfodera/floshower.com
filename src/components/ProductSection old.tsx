/*import { useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Html, useProgress } from '@react-three/drei';
import * as THREE from 'three';
import { MotionValue } from 'framer-motion';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-white">
        <div className="w-24 h-24 border-4 border-t-led-green border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-led-green text-xl font-light">
          {progress.toFixed(0)}%<br />loading
        </div>
      </div>
    </Html>
  );
}

interface ShowerheadModelProps {
  scrollProgress: MotionValue<number>;
}

















function ShowerheadModel({ scrollProgress }: ShowerheadModelProps) {
  const group = useRef<THREE.Group>(new THREE.Group());
  const { scene } = useGLTF('/showerhead3.glb');
  const currentRotation = useRef({ x: 0, y: 0, z: 0 });
  const targetRotation = useRef({ x: 0, y: 0, z: 0 });

  const calculateContinuousRotation = (scrollPos: number) => {
    const totalYRotation = Math.PI * 0.25; // Four full rotations around Y-axis over the entire scroll
    const baseXRotation = Math.PI / 6; // Slight tilt on X-axis (30 degrees) for 3D effect
    const subtleZRotation = Math.PI / 8; // Subtle Z-axis rotation (22.5 degrees) for extra depth

    return {
      x: baseXRotation, // Constant slight tilt on X-axis
      y: scrollPos * totalYRotation, // Continuous Y-axis rotation proportional to scroll
      z: Math.sin(scrollPos * Math.PI) * subtleZRotation // Subtle Z-axis oscillation for dynamism
    };
  };
  /*
  const calculatePhaseRotation = (scrollPos: number) => {
    const totalRotation = Math.PI * 2; // One full rotation
    
    if (scrollPos <= 1/3) {
      // Phase 1: Z-axis rotation only
      const progress = scrollPos * 3;
      return {
        x: 0,
        y: 0,
        z: progress * totalRotation
      };
    } else if (scrollPos <= 2/3) {
      // Phase 2: Keep Phase 1's Z rotation and add Y rotation
      const progress = (scrollPos - 1/3) * 3;
      return {
        x: 0,
        y: progress * totalRotation,
        z: totalRotation // Keep the full Z rotation from Phase 1
      };
    } else {
      // Phase 3: Keep Phase 2's Y rotation and continue Z rotation
      const progress = (scrollPos - 2/3) * 3;
      return {
        x: 0,
        y: totalRotation, // Keep the full Y rotation from Phase 2
        z: totalRotation + (progress * totalRotation) // Continue Z rotation from where Phase 1 ended
      };
    }
  };



  useFrame((state, delta) => {
    if (!group.current) return;

    try {
      const scrollPos = scrollProgress.get();
      targetRotation.current = calculateContinuousRotation(scrollPos);
      //targetRotation.current = calculatePhaseRotation(scrollPos);

      currentRotation.current = {
        x: THREE.MathUtils.lerp(currentRotation.current.x, targetRotation.current.x, 0.1),
        y: THREE.MathUtils.lerp(currentRotation.current.y, targetRotation.current.y, 0.1),
        z: THREE.MathUtils.lerp(currentRotation.current.z, targetRotation.current.z, 0.1)
      };

      group.current.rotation.x = currentRotation.current.x;
      group.current.rotation.y = currentRotation.current.y;
      group.current.rotation.z = currentRotation.current.z;
    } catch (error) {
      console.error('Error updating model rotation:', error);
    }
  }); ////////////////////////////////////////////////////////////////////

  useEffect(() => {
    return () => {
      if (group.current) {
        group.current.rotation.set(0, 0, 0);
      }
    };
  }, []);

  return (
    <primitive 
      ref={group} 
      object={scene} 
      position={[0, 0, 0]}
      scale={window.innerWidth <= 768 ? 1 : 2.5}
    />
  );
}

interface ProductSectionProps {
  title: string;
  subtitle: string;
  scrollProgress: MotionValue<number>;
}

export default function ProductSection({
  title,
  subtitle,
  scrollProgress,
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
          <ShowerheadModel scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>

      <div className="absolute top-[20%] left-0 w-full text-center z-10">
        <h1 className="text-[clamp(2rem,5vw,4rem)] mb-4 tracking-wider">{title}</h1>
        <p className="text-[clamp(1rem,2vw,1.5rem)]">{subtitle}</p>
      </div>
    </div>
  );
}*/