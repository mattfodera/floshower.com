import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface PreOrderProps {
  openModal: (type: 'reserve' | 'preorder' | 'notify') => void;
}

export default function PreOrder({ openModal }: PreOrderProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section
      id="preorder"
      ref={ref}
      className="py-20 bg-gradient-to-b from-darker-charcoal to-light-charcoal"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-montserrat font-bold mb-4">
            Pre-Order Now to Guarantee a Spot in the First Generation Product Launch
          </h2>
          <div className="w-32 h-1 bg-led-green mx-auto" />
          <p className="text-gray-300 mt-4 text-lg">
            Secure your ShowerSafe™ today—choose your tier.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "I'm Interested",
              description: "$50 refundable deposit @ full $500 price, pay rest or be refunded when the product is ready.",
              action: () => openModal('reserve'),
              buttonText: "Reserve Now"
            },
            {
              title: "I NEED This",
              description: "$200 pre-order @ 60% off, refundable at any time.",
              action: () => openModal('preorder'),
              buttonText: "Pre-Order Now"
            },
            {
              title: "I'll Wait Until the Official Launch",
              description: "Risk the product selling out. Sign up to be notified when it's ready.",
              action: () => openModal('notify'),
              buttonText: "Notify Me"
            }
          ].map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              className="pre-order-card bg-light-charcoal p-8 rounded-lg"
            >
              <h3 className="text-2xl font-montserrat font-bold mb-4">{option.title}</h3>
              <p className="text-gray-300 mb-8 h-24">{option.description}</p>
              <button
                onClick={option.action}
                className="w-full py-3 px-6 border-2 border-led-green text-led-green hover:bg-led-green hover:text-black transition-all duration-300 rounded-lg font-semibold"
              >
                {option.buttonText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}