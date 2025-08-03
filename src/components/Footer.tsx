import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-cyan-400/20 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Get In Touch</h3>
            <p className="text-gray-200 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center space-x-6 mb-8"
          >
            {[
              // { icon: Github, href: "https://github.com/johnsmith", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/muhammad-ahmad-9322071b3/", label: "LinkedIn" },
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

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex items-center justify-center space-x-2 text-gray-300"
          >
            <span>© {currentYear} Muhammad Ahmad. Made with</span>
            <Heart className="text-red-500" size={16} fill="currentColor" />
            <span>and React</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;