import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, Mail } from 'lucide-react';
import GlowingButton from './ui/GlowingButton';
import Scene from './3d/Scene';
import ProfilePhoto from './ui/ProfilePhoto';

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden pt-16 sm:pt-24" id='home'>
      <Scene />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/50 to-slate-900" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12"
      >
        <div className="flex-1 max-w-2xl w-full">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-block p-2">
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-100 mb-4">
              Hi, I'm{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-pink-600 relative">
                Karan Pareek
                <motion.span
                  className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-violet-600 to-pink-600"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                />
              </span>
            </h2>
          </motion.div>
          <div className="text-xl sm:text-2xl lg:text-3xl text-slate-300 font-medium mb-8 h-[40px]">
            <TypeAnimation
              sequence={[
                'Fullstack Developer',
                2000,
                'Software Developer',
                2000,
              ]}
              repeat={Infinity}
              className="inline-block"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg text-slate-400 mb-8 leading-relaxed max-w-2xl backdrop-blur-sm bg-slate-900/30 p-4 rounded-lg"
          >
            A passionate developer with a keen eye for crafting innovative and user-friendly digital solutions. 
            I specialize in software development and full-stack web technologies, delivering seamless and efficient user experiences.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <GlowingButton href="#contact" primary>
              Get in Touch
            </GlowingButton>
            <GlowingButton href="#projects">
              View Projects
            </GlowingButton>
            <GlowingButton href="https://drive.google.com/file/d/1QVdvGrINfP7S2nzrh4Jii8qR6k3mXrWn/view?usp=sharing">
              Download Resume
            </GlowingButton>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex gap-6 mt-8"
          >
            {[
              { icon: Github, href: 'https://github.com/NelloGamerz' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/karan-pareek-337067270' },
              { icon: Mail, href: 'mailto:softwaredev1112@gmail.com' }
            ].map((social, index) => (
              <motion.a
                key={index}
                whileHover={{ y: -2, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-violet-400 transition-colors p-2 bg-slate-800/30 backdrop-blur-sm rounded-lg"
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </motion.div>
        </div>
        <div className="lg:flex-shrink-0 mt-8 lg:mt-0">
          <ProfilePhoto />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

