import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-scroll';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ['0%', '50%']);

  return (
    <div 
      ref={containerRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      <motion.div 
        style={{ y, scale, opacity }}
        className="absolute inset-0 hero-gradient"
      >
        <div className="particles">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                background: `radial-gradient(circle at center, 
                  ${i % 2 === 0 ? '#00FF00' : '#FF0000'}, 
                  transparent
                )`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
              }}
            />
          ))}
        </div>
      </motion.div>

      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between relative z-10">
        <motion.div
          style={{ y: textY }}
          className="text-center lg:text-left lg:w-1/2"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl lg:text-6xl font-montserrat font-bold mb-6 hover:led-glow-green transition-all duration-300"
          >
            ShowerSafe™: Redefining Bathroom Safety
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-300 text-xl mb-8 font-opensans"
          >
            Protect yourself with real-time LED alerts and innovative design.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              to="problem"
              smooth={true}
              duration={800}
              className="inline-block px-8 py-4 gradient-border text-white hover:led-glow-green transition-all duration-500 rounded-lg font-semibold cursor-pointer"
            >
              Explore ShowerSafe
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ 
            y: useTransform(scrollYProgress, [0, 1], ['0%', '25%']),
            rotateY: useTransform(scrollYProgress, [0, 1], [0, 15])
          }}
          className="lg:w-1/2 mt-12 lg:mt-0"
        >
          <div className="relative w-full h-[400px] gradient-border rounded-lg shadow-lg overflow-hidden transform preserve-3d">
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 backdrop-blur-sm">
              [Product Visualization]
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-1 h-12 bg-gradient-to-b from-led-green/50 to-transparent rounded-full scroll-indicator" />
      </motion.div>
    </div>
  );
}