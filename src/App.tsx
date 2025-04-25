import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Modal from 'react-modal';
import { useProgress } from '@react-three/drei';
import Navbar from './components/Navbar';
import ProductSection from './components/ProductSection';
import Footer from './components/Footer';

export default function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState<'reserve' | 'preorder' | 'notify'>('notify');
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { progress } = useProgress();
  
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"]
  });

  const titleScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0.3, 1], ['100vh', '-100vh']);

  const features = [
    {
      title: "FALL DETECTION",
      description: "AI-powered motion sensors that understand posture and movement"
    },
    {
      title: "WATER SHUTOFF",
      description: "Normally-closed electronic valve ensures water shutoff even during power failure"
    },
    {
      title: "EMERGENCY ALERT",
      description: "Wi-Fi calling capability to alert emergency services"
    }
  ];

  const openModal = (type: 'reserve' | 'preorder' | 'notify') => {
    setModalType(type);
    setModalIsOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            <motion.div 
              className="flex flex-col items-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-24 h-24 border-4 border-t-led-green border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
              <div className="text-led-green text-xl font-light text-center">
                {progress.toFixed(0)}%<br />Loading Experience...
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="relative min-h-screen w-full bg-water text-white overflow-hidden"
      >
        <Navbar />
        
        {/* Fixed 3D Model Container */}
        <div className="fixed inset-0 w-full h-full">
          <ProductSection 
            title=""
            subtitle=""
            scrollProgress={scrollYProgress}
            onLoadingComplete={() => setIsLoading(false)}
          />
        </div>

        {/* Main Title */}
        <motion.div
          style={{ 
            scale: titleScale,
            opacity: titleOpacity,
          }}
          className="fixed top-0 left-0 w-full h-screen flex items-center"
        >
          <div className="container mx-auto px-4 md:px-8">
            <h1 className="text-[clamp(1.875rem,6vw,6rem)] font-light mb-4 tracking-tight leading-[1.1]">
              THE WORLD'S FIRST<br />FALL DETECTION<br />SHOWERHEAD
            </h1>
            <p className="text-[clamp(1.75rem,3vw,2rem)] font-light opacity-80 mt-8 max-w-[90%]">
              is now in development.
            </p>
          </div>
        </motion.div>

        {/* Scrollable Content Container */}
        <div 
          ref={scrollRef}
          className="relative min-h-[400vh]"
        >
          <motion.div 
            style={{ y: contentY }}
            className="sticky top-0 w-full min-h-screen"
          >
            <div className="container mx-auto px-4 md:px-8 py-32 space-y-[100vh]">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="min-h-screen flex items-center"
                >
                  <div className={`w-full max-w-2xl ${index % 2 === 0 ? 'ml-0 mr-auto' : 'ml-auto mr-0'}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className={`text-left ${index % 2 === 1 ? 'md:text-right' : ''}`}
                    >
                      <h2 className="text-[clamp(0.75rem,1.5vw,0.875rem)] uppercase tracking-wider mb-8 opacity-50">
                        {index === 0 ? 'OUR MISSION' : 'SPECIFICITY'}
                      </h2>
                      <h3 className="text-[clamp(1.5rem,4vw,2.5rem)] font-light leading-tight mb-6">
                        {feature.title}
                      </h3>
                      <p className="text-[clamp(1rem,2vw,1.25rem)] font-light opacity-80">
                        {feature.description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <Footer openModal={openModal} />

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className="modal-content p-8 rounded-lg max-w-md mx-auto mt-20"
          overlayClassName="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative gradient-border rounded-lg p-6"
          >
            <button
              onClick={() => setModalIsOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
            >
              ×
            </button>
            <h2 className="text-2xl font-montserrat font-bold mb-6 text-center">
              {modalType === 'notify' ? 'Stay Updated' : 
               modalType === 'reserve' ? 'Reserve Your ShowerSafe™' :
               'Pre-Order ShowerSafe™'}
            </h2>
            <form className="space-y-6">
              {modalType !== 'notify' && (
                <>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="input-field w-full p-3 rounded border border-blue-400/30 focus:border-blue-400/60 outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="input-field w-full p-3 rounded border border-blue-400/30 focus:border-blue-400/60 outline-none"
                  />
                </>
              )}
              <input
                type="email"
                placeholder="Email Address"
                className="input-field w-full p-3 rounded border border-blue-400/30 focus:border-blue-400/60 outline-none"
              />
              {modalType !== 'notify' && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="input-field w-full p-3 rounded border border-blue-400/30 focus:border-blue-400/60 outline-none"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="input-field p-3 rounded border border-blue-400/30 focus:border-blue-400/60 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="CVC"
                      className="input-field p-3 rounded border border-blue-400/30 focus:border-blue-400/60 outline-none"
                    />
                  </div>
                </div>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full p-3 bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-400/10 transition-all duration-300 rounded font-semibold"
              >
                {modalType === 'notify' ? 'Notify Me' :
                 modalType === 'reserve' ? 'Complete Reservation' :
                 'Complete Pre-Order'}
              </motion.button>
            </form>
          </motion.div>
        </Modal>
      </motion.div>
    </>
  );
}