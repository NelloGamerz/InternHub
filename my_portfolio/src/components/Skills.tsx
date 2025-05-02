import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from './ui/Card';
import SectionTitle from './ui/SectionTitle';

const skillCategories = [
  {
    name: 'All',
    skills: [
      { name: 'React.js', level: 85 },
      { name: 'TypeScript', level: 80 },
      { name: 'HTML/CSS', level: 95 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'Java', level: 80 },
      { name: 'Kotlin', level: 70 },
      { name: 'Spring Boot', level: 75 },
      { name: 'Firebase', level: 80 },
      { name: 'MongoDB', level: 80 },
      { name: 'Android Studio', level: 80 },
      { name: 'Google Cloud', level: 80 },
      { name: 'Git', level: 80 },
      { name: 'Docker', level: 75 },
      { name: 'Redis', level: 70 },
    ]
  },
  {
    name: 'Frontend',
    skills: [
      { name: 'React.js', level: 85 },
      { name: 'TypeScript', level: 80 },
      { name: 'HTML/CSS', level: 95 },
      { name: 'Tailwind CSS', level: 85 },
    ]
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Java', level: 80 },
      { name: 'Kotlin', level: 70 },
      { name: 'Spring Boot', level: 75 },
      { name: 'Firebase', level: 80 },
      { name: 'Redis', level: 70 },
    ]
  },
  {
    name: 'Tools & Others',
    skills: [
      { name: 'Git', level: 80 },
      { name: 'Android Studio', level: 80 },
      { name: 'Google Cloud', level: 80 },
      { name: 'Docker', level: 75 },
    ]
  },
  {
    name: 'Database',
    skills: [
      { name: 'MongoDB', level: 80 },
      { name: 'Redis', level: 70 },
    ]
  }
];


const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" id='skills'>
      <div className="max-w-6xl mx-auto">
        <SectionTitle>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">
            Skills
          </span>
        </SectionTitle>
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {skillCategories.map((category) => (
            <motion.button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all shadow-lg ${
                selectedCategory === category.name
                  ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white scale-105'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:scale-105'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-pressed={selectedCategory === category.name}
            >
              {category.name}
            </motion.button>
          ))}
        </div>
        <Card className="bg-slate-800 border border-slate-700 shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="p-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {skillCategories
                  .find((category) => category.name === selectedCategory)
                  ?.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <h3 className="text-lg font-semibold mb-2 text-slate-100">{skill.name}</h3>
                      <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-violet-500 to-pink-500 rounded-full"
                        />
                      </div>
                      <div className="mt-1 text-right">
                        <span className="text-sm font-medium text-slate-400">{skill.level}%</span>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </Card>
      </div>
    </section>
  );
};

export default Skills;

