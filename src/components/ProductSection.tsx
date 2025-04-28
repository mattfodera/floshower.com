import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, useProgress, Float } from '@react-three/drei';
import { MotionValue } from 'framer-motion';
import { ShowerheadModel1 } from './ShowerheadModel1';

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
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <spotLight
            position={[0, 10, 0]}
            angle={0.3}
            penumbra={1}
            intensity={2}
            castShadow
          />
          <Float speed={5} rotationIntensity={.1} floatIntensity={0.005}>
            <ShowerheadModel1 scrollProgress={scrollProgress} onLoadingComplete={onLoadingComplete} />
          </Float>
        </Suspense>
      </Canvas>

      <div className="absolute top-[20%] left-0 w-full text-center z-10">
        <h1 className="text-[clamp(2rem,5vw,4rem)] mb-4 tracking-wider">{title}</h1>
        <p className="text-[clamp(1rem,2vw,1.5rem)]">{subtitle}</p>
      </div>
    </div>
  );
}