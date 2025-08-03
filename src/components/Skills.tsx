import React from 'react';
import { motion } from 'framer-motion';
import { Code, Server, PenTool as Tool, Users } from 'lucide-react';
import { Skill } from '../types';

const skillsData: Skill[] = [
  { name: 'React', level: 90, category: 'frontend' },
  { name: 'Vue', level: 85, category: 'frontend' },
  { name: 'Three.js', level: 75, category: 'frontend' },
  { name: 'Astro', level: 80, category: 'frontend' },
  { name: 'Tailwind CSS', level: 88, category: 'frontend' },
  { name: 'Node.js', level: 82, category: 'backend' },
  { name: 'Laravel', level: 85, category: 'backend' },
  { name: 'Django', level: 70, category: 'backend' },
  { name: 'MongoDB', level: 75, category: 'backend' },
  { name: 'PostgreSQL', level: 78, category: 'backend' },
  { name: 'Git', level: 90, category: 'tools' },
  { name: 'Docker', level: 70, category: 'tools' },
  { name: 'AWS', level: 65, category: 'tools' },
  { name: 'Client Dealing', level: 95, category: 'soft' },
  { name: 'Communication', level: 90, category: 'soft' },
  { name: 'Problem Solving', level: 75, category: 'soft' },
];

const categoryIcons = {
  frontend: Code,
  backend: Server,
  tools: Tool,
  soft: Users,
};

const categoryColors = {
  frontend: 'from-red-400 to-red-600',
  backend: 'from-red-500 to-red-700',
  tools: 'from-red-600 to-red-800',
  soft: 'from-red-300 to-red-500',
};

interface SkillCategoryProps {
  category: keyof typeof categoryIcons;
  skills: Skill[];
  title: string;
  index: number;
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ category, skills, title, index }) => {
  const Icon = categoryIcons[category];
  const colorGradient = categoryColors[category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-gray-900/50 rounded-2xl p-8 backdrop-blur-sm border border-red-400/20 hover:border-red-400/40 transition-all duration-300"
    >
      <div className="flex items-center space-x-4 mb-8">
        <div className={`w-12 h-12 bg-gradient-to-r ${colorGradient} rounded-full flex items-center justify-center`}>
          <Icon className="text-white" size={24} />
        </div>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
      </div>

      <div className="space-y-6">
        {skills.map((skill, skillIndex) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: (index * 0.1) + (skillIndex * 0.1) }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-200 font-medium">{skill.name}</span>
              <span className="text-red-400 font-semibold">{skill.level}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: (index * 0.1) + (skillIndex * 0.1) + 0.2 }}
                viewport={{ once: true }}
                className={`h-full bg-gradient-to-r ${colorGradient} rounded-full`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  const categories = [
    { key: 'frontend' as const, title: 'Frontend Development', skills: skillsData.filter(s => s.category === 'frontend') },
    { key: 'backend' as const, title: 'Backend Development', skills: skillsData.filter(s => s.category === 'backend') },
    { key: 'tools' as const, title: 'Tools & Technologies', skills: skillsData.filter(s => s.category === 'tools') },
    { key: 'soft' as const, title: 'soft Skills', skills: skillsData.filter(s => s.category === 'soft') },
  ];

  return (
    <section id="skills" className="py-20 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ski<span className="text-red-400">lls</span>
          </h2>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">
            Technical expertise and soft skills I've developed
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <SkillCategory
              key={category.key}
              category={category.key}
              skills={category.skills}
              title={category.title}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;