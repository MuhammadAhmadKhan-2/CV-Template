import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileDown, ExternalLink } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 pt-20 pb-16"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-500 to-red-700 p-1">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <span className="text-4xl font-bold text-red-400">MAK</span>
              </div>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold text-white mb-4"
          >
            Muhammad <span className="text-red-400">Ahmad</span> Khan
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto"
          >
            Full-Stack Developer & Machine Learning Engineer
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex justify-center space-x-6 mb-8"
          >
            {[
              { icon: Github, href: "https://github.com/muhammadahmadkhan", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/muhammadahmadkhan", label: "LinkedIn" },
              { icon: ExternalLink, href: "https://www.upwork.com/freelancers/~011f4e72a1abe5285a", label: "Upwork" },
              { icon: Mail, href: "mailto:muhammadahmaddd8@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 border border-red-400/20 hover:border-red-500"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-700 text-white px-8 py-3 rounded-full font-semibold hover:from-red-400 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-red-500/25"
          >
            <FileDown size={20} />
            <span>CV not available at this moment</span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;