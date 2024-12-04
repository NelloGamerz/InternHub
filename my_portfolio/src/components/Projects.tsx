'use client'

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Card from './ui/Card';
import SectionTitle from './ui/SectionTitle';
import extension from '../../public/images/Chrome_Extension.png';
import skyCast from '../../public/images/SkyCast.png';
import music from '../../public/images/Music App Image.jpg';

const projects = [
  {
    title: 'Music Streaming App',
    description: 'A modern Music Streaming Android App built with kotiln and Firebase.',
    image: music,
    tech: ['Kotlin', 'Firebase'],
    github: 'https://github.com/NelloGamerz/Music',
    live: 'https://drive.google.com/file/d/1C5pzlBv0emBaHNcHQaSevpxRkjpjNUoV/view?usp=drive_link'
  },
  {
    title: 'SkyCast',
    description: 'Weather Websiter made with React and TypeScript.',
    image: skyCast,
    tech: ['React', 'Tailwwind CSS'],
    github: 'https://github.com/NelloGamerz/Weather-App',
    live: 'https://sky-cast-lake.vercel.app/'
  },
  {
    title: 'Chrome Extension',
    description: 'A chrome extension for youtube to increase users productivity.',
    image: extension,
    tech: ['Java Script','JSON'],
    live: 'https://chromewebstore.google.com/detail/smart-youtube-playpause/bcecakogomgpaegeajbgeaadmneppajo'
  },  
];

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });
  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });

  const scrollBarWidth = useTransform(scrollXProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const updateX = () => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        const progress = scrollLeft / (scrollWidth - clientWidth);
        x.set(-scrollLeft);
        scrollXProgress.set(progress);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', updateX);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', updateX);
      }
    };
  }, [x, scrollXProgress]);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]" />
      <div className="max-w-6xl mx-auto relative">
        <SectionTitle>Featured Projects</SectionTitle>
        <div className="relative">
          <motion.div
            ref={containerRef}
            className="flex overflow-x-scroll scrollbar-hide custom-scrollbar scroll-smooth"
            style={{ 
              overflowY: 'visible', 
              paddingBottom: '20px',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            aria-label="Projects carousel"
          >
            <motion.div
              className="flex gap-8"
              style={{ x }}
              drag="x"
              dragConstraints={containerRef}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-full sm:w-[calc(100%-2rem)] md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <Card className="group transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl h-full">
                    <div className="relative overflow-hidden rounded-lg mb-6">
                      <img
                        srcSet={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-violet-600/20 backdrop-blur-sm transition-opacity"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-slate-100 mb-2">{project.title}</h3>
                    <p className="text-slate-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-violet-500/10 text-violet-400 rounded-full text-sm
                                   backdrop-blur-sm border border-violet-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4 mt-auto">
                      {project.github && (
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-slate-400 hover:text-violet-400 
                                   transition-colors px-4 py-2 rounded-lg bg-slate-800/50 backdrop-blur-sm"
                        >
                          <Github size={20} />
                          <span>Code</span>
                        </motion.a>
                      )}
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-slate-400 hover:text-violet-400 
                                 transition-colors px-4 py-2 rounded-lg bg-slate-800/50 backdrop-blur-sm"
                      >
                        <ExternalLink size={20} />
                        <span>Live Demo</span>
                      </motion.a>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-violet-500/20 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-violet-500"
              style={{ width: scrollBarWidth }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

