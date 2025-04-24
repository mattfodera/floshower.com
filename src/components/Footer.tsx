import { motion } from 'framer-motion';

interface FooterProps {
  openModal: (type: 'reserve' | 'preorder' | 'notify') => void;
}

export default function Footer({ openModal }: FooterProps) {
  return (
    <footer className="relative bg-black bg-opacity-50 py-20">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-light">Pre-Order Now</h3>
            <button
              onClick={() => openModal('preorder')}
              className="px-6 py-3 bg-transparent border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all duration-300 rounded"
            >
              Reserve Your Unit
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-light">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-light">Legal</h3>
            <div className="space-y-2">
              <p className="text-gray-400">© 2024 ShowerSafe™</p>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}