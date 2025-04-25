import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 px-8 py-6"
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.div 
          className="text-2xl font-light tracking-wider"
          whileHover={{ scale: 1.05 }}
        >
          Flo
        </motion.div>
        
        <div className="flex space-x-8">
          <motion.a 
            href="#features"
            className="text-gray-300 hover:text-white transition-colors"
            whileHover={{ y: -2 }}
          >
            Features
          </motion.a>
          <motion.a 
            href="#preorder"
            className="text-gray-300 hover:text-white transition-colors"
            whileHover={{ y: -2 }}
          >
            Pre-Order
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}