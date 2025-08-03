export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  imageUrl?: string;
}
export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  gpa?: string;
  description: string;
}
export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'soft';
}