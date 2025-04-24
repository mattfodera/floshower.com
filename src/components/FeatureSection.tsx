import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface FeatureSectionProps {
  title: string;
  description: string;
  productPosition: 'left' | 'center' | 'right';
  glowColor: string;
}

export default function FeatureSection({
  title,
  description,
  productPosition,
  glowColor
}: FeatureSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const productX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    productPosition === 'left' ? ['100%', '0%', '-100%'] :
    productPosition === 'right' ? ['-100%', '0%', '100%'] :
    ['0%', '0%', '0%']
  );

  const productRotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, productPosition === 'center' ? 180 : productPosition === 'left' ? -30 : 30, 0]
  );

  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.8], [0, 1, 0]);
  const textX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    productPosition === 'left' ? ['-100%', '0%', '100%'] :
    productPosition === 'right' ? ['100%', '0%', '-100%'] :
    ['0%', '0%', '0%']
  );

  return (
    <section
      ref={containerRef}
      className="h-screen relative overflow-hidden flex items-center"
    >
      {/* Star field background */}
      <div className="absolute inset-0 star-field opacity-50" />
      
      {/* Product visualization */}
      <motion.div
        style={{
          x: productX,
          rotate: productRotate,
        }}
        className="absolute w-[500px] h-[500px]"
      >
        <div className={`product-container glow-${glowColor}`}>
          <div className="product-placeholder">
            [Product Feature View]
          </div>
        </div>
      </motion.div>

      {/* Text content */}
      <motion.div
        style={{
          opacity: textOpacity,
          x: textX,
        }}
        className={`absolute ${
          productPosition === 'left' ? 'right-[10%]' :
          productPosition === 'right' ? 'left-[10%]' :
          'left-1/2 -translate-x-1/2'
        } max-w-xl`}
      >
        <h2 className="text-4xl font-light mb-4 tracking-wider">{title}</h2>
        <p className="text-xl font-light opacity-80">{description}</p>
      </motion.div>
    </section>
  );
}