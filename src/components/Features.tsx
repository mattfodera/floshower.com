import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const features = [
  {
    title: "Real-Time Alerts",
    description: "Green LEDs for safe temperatures, red for warnings.",
    icon: "💡"
  },
  {
    title: "Anti-Slip Flow",
    description: "Smart water control reduces slip risks.",
    icon: "💧"
  },
  {
    title: "Sleek Innovation",
    description: "Modern design meets cutting-edge safety.",
    icon: "⚙️"
  }
];

export default function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section
      id="features"
      ref={ref}
      className="py-20 bg-darker-charcoal"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl font-montserrat font-bold text-center mb-16"
        >
          Why ShowerSafe™ Stands Out
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="feature-card bg-light-charcoal p-8 rounded-lg text-center"
            >
              <div className="text-4xl mb-4 led-glow-green">{feature.icon}</div>
              <h3 className="text-xl font-montserrat font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}