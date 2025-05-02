import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-slate-900/50 backdrop-blur-lg border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand Section */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 text-transparent bg-clip-text">
              Karan Pareek
            </h3>
            <p className="text-slate-400 max-w-xs">
              Creating App Website and many more
            </p>
            {isVisible && (
              <motion.button
                onClick={scrollToTop}
                className="flex items-center gap-2 text-slate-400 hover:text-violet-400 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowUp size={16} />
                Back to top
              </motion.button>
            )}
          </motion.div>

          {/* Quick Links */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h4 className="text-slate-200 font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Projects', 'Skills', 'Contact'].map((item) => (
                <motion.li key={item} whileHover={{ x: 4 }}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-slate-400 hover:text-violet-400 transition-colors"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h4 className="text-slate-200 font-semibold">Connect</h4>
            <div className="flex space-x-4">
              {[
                { icon: Github, href: 'https://github.com/NelloGamerz', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com/in/karan-pareek-337067270', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:softwaredev1112@gmail.com', label: 'Email' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800/50 rounded-lg text-slate-400 hover:text-violet-400 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="mt-12 pt-8 border-t border-slate-800"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-center text-slate-400 flex items-center justify-center gap-2">
            Made with <Heart size={16} className="text-pink-500" /> by Karan Pareek
          </p>
          <p className="text-center text-slate-500 text-sm mt-2">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

