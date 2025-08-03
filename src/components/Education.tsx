import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';
import { Education as EducationType } from '../types';

const educationData: EducationType[] = [
  {
    id: '1',
    degree: 'Bachelor of Science in Software Engineering',
    institution: 'GIFT University',
    year: '2022 - 2026',
    gpa: '3.2/4.0',
    description: 'Specialized in Software Engineering and Web Development. Relevant coursework: Data Structures, Algorithms, Database Systems, Web Technologies, Software Engineering.'
  },
  {
    id: '2',
    degree: 'FSc Pre Medical',
    institution: 'Punjab Group of Colleges',
    year: '2021 - 2022',
    gpa: '644/1100',
    description: 'Pre Medical student doing frog dissection and other experiments'
  }
];

const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Edu<span className="text-red-400">cation</span>
          </h2>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">
            My academic journey and achievements
          </p>
        </motion.div>

        <div className="space-y-8">
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 rounded-2xl p-8 backdrop-blur-sm border border-red-400/20 hover:border-red-400/40 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <div className="w-12 h-12 bg-red-400/20 rounded-full flex items-center justify-center">
                    <GraduationCap className="text-red-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{edu.degree}</h3>
                    <p className="text-red-400 font-semibold">{edu.institution}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-gray-200">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{edu.year}</span>
                  </div>
                  {edu.gpa && (
                    <div className="bg-red-400/20 px-3 py-1 rounded-full">
                      <span className="text-red-400 font-semibold">GPA: {edu.gpa}</span>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-gray-200 leading-relaxed">{edu.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;