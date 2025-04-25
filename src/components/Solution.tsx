import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Solution() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section
      id="solution"
      ref={ref}
      className="py-20 bg-light-charcoal"
    >
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 mb-12 lg:mb-0"
        >
          <h2 className="text-4xl font-montserrat font-bold mb-6">
            ShowerSafe™: Your <span className="text-led-green led-glow-green">Safety</span>, Illuminated
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Our smart showerhead uses LED indicators—green for safe, red for caution—to monitor temperature and enhance visibility, paired with anti-slip technology for ultimate protection.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/2 lg:pl-12"
        >
          <div className="relative w-full h-[300px] bg-dark-charcoal rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              [Product Demo]
            </div>
            <div className="absolute inset-0 border-2 border-led-green animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}