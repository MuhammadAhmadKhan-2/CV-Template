import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Code } from 'lucide-react';
import { Project } from '../types';

const projectsData: Project[] = [
  {
    id: '1',
    title: 'All Calls',
    description: 'A website for calling using Twilio API. Worked as a Junior Three JS Developer there.',
    technologies: ['Vue', 'Three.js', 'Laravel', 'Blender', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    githubUrl: 'https://github.com/pinpubads',
    demoUrl: 'https://allcalls.io/',
    imageUrl: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '2',
    title: 'Point Cloud Labeling Platform',
    description: 'A platform for representing point cloud labeling of Autonomous Car data(Computer Vision).',
    technologies: ['React', 'Three.js', 'Tailwind CSS', 'MongoDB', 'Express', 'Node.js', 'Computer Vision', 'AWS'],
    githubUrl: 'https://github.com/MuhammadAhmadKhan-2/3D-Point-Cloud-Labeling-Platform-Frontend',
    demoUrl: 'https://metabread.cloud',
    imageUrl: 'https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Pro<span className="text-red-400">jects</span>
          </h2>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">
            A showcase of my development work and technical expertise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-gray-900/50 rounded-2xl overflow-hidden backdrop-blur-sm border border-red-400/20 hover:border-red-400/40 transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 bg-red-400/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Code className="text-red-400" size={20} />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-200 mb-4 leading-relaxed text-sm">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-red-400/20 text-red-400 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm"
                  >
                    <Github size={16} />
                    <span>Code</span>
                  </motion.a>
                  {project.demoUrl && (
                    <motion.a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-400 hover:to-red-600 text-white px-4 py-2 rounded-lg transition-all font-medium text-sm"
                    >
                      <ExternalLink size={16} />
                      <span>Demo</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;