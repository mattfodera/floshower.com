import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.3, 0.6], [0.8, 1]);
  const x = useTransform(scrollYProgress, [0.3, 0.6], ['-100%', '0%']);

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="relative py-20 bg-darker-charcoal overflow-hidden"
    >
      <motion.div
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.2], [0, 0.1]),
          scale: useTransform(scrollYProgress, [0, 1], [0.95, 1.05])
        }}
        className="absolute inset-0 bg-gradient-radial from-red-500/5 via-transparent to-transparent"
      />

      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        <motion.div
          style={{ opacity, x }}
          className="lg:w-1/2 mb-12 lg:mb-0"
        >
          <div className="relative w-full h-[300px] bg-light-charcoal rounded-lg overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-red-500/30 flex items-center justify-center"
              style={{
                rotateY: useTransform(scrollYProgress, [0.3, 0.8], [10, -10])
              }}
            >
              [Danger Visualization]
            </motion.div>
            <div className="absolute inset-0 border-2 border-led-red animate-pulse" />
          </div>
        </motion.div>

        <motion.div
          style={{ 
            opacity,
            scale,
            x: useTransform(scrollYProgress, [0.3, 0.6], ['50px', '0px'])
          }}
          className="lg:w-1/2 lg:pl-12"
        >
          <h2 className="text-4xl font-montserrat font-bold mb-6">
            Unseen <span className="text-led-red led-glow-red">Risks</span> in Every Shower
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Slippery surfaces, sudden temperature spikes, and dim lighting turn showers into danger zones. Over 235,000 bathroom injuries occur annually—don't let yours be next.
          </p>
        </motion.div>
      </div>
    </section>
  );
}