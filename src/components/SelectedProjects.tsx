import { useState } from 'react';
import { motion } from 'motion/react';
import { projects } from '../data/projects';

interface Project {
  id: string;
  title: string;
  type: string;
  description: string;
  image: string;
  tags: string[];
  figmaUrl?: string;
  liveUrl?: string;
}

// Component to render a project card with image preview, tags, and links (View Live / View Figma)
const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [imgError, setImgError] = useState(false);
  const primaryUrl = project.liveUrl || project.figmaUrl;

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigating if user clicks directly on one of the anchor links
    const target = e.target as HTMLElement;
    if (target.closest('a')) {
      return;
    }
    if (primaryUrl) {
      window.open(primaryUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      onClick={handleCardClick}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--text)] transition-all duration-500 hover:-translate-y-2 overflow-hidden ${
        primaryUrl ? 'cursor-pointer' : ''
      }`}
    >
      {/* Image Preview */}
      <div className="w-full aspect-[4/3] relative overflow-hidden bg-[var(--bg)] border-b border-[var(--border)]">
        {!imgError ? (
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-40 font-light tracking-widest text-sm uppercase">
             <span>Preview Pending</span>
             <span className="text-xs mt-2 text-[var(--muted)]">{project.title}</span>
          </div>
        )}
      </div>

      {/* Content Box */}
      <div className="p-8 md:p-10 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs tracking-widest uppercase text-[var(--muted)] opacity-70">{project.type}</span>
          
          {/* Arrow Icon with diagonal movement on hover */}
          <div className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--text)] transition-all duration-500 overflow-hidden relative bg-[var(--card)]">
             <svg className="w-4 h-4 text-[var(--text)] transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
             </svg>
          </div>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-light text-[var(--text)] mb-4 group-hover:text-[var(--text)] transition-colors">{project.title}</h3>
        <p className="text-[var(--muted)] text-sm md:text-base leading-relaxed font-light mb-8 flex-grow">
          {project.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mt-auto mb-6">
          {project.tags.map((tag: string, i: number) => (
            <span key={i} className="px-4 py-1.5 text-xs text-[var(--text)] border border-[var(--border)] rounded-full tracking-wider bg-[var(--bg)] opacity-80">
              {tag}
            </span>
          ))}
        </div>
        
        {/* Project Links */}
        {(project.liveUrl || project.figmaUrl) && (
          <div className="mt-2 pt-6 border-t border-[var(--border)] flex items-center gap-6 text-sm text-[var(--text)] group-hover:opacity-100 opacity-60 transition-opacity">
            {project.liveUrl && (
              <a 
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline underline-offset-4 decoration-1 transition-all"
              >
                View Live
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            )}
            {project.figmaUrl && (
              <a 
                href={project.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline underline-offset-4 decoration-1 transition-all"
              >
                View Figma
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            )}
          </div>
        )}
      </div>
      
      {/* Subtle Inner Glow on Hover */}
      <div className="absolute inset-0 bg-[var(--text)] opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500 pointer-events-none"></div>
    </motion.div>
  );
};

export default function SelectedProjects() {
  return (
    <section id="projects" className="relative overflow-hidden bg-[var(--bg)] transition-colors duration-500 pt-48 pb-32 md:pt-64 md:pb-48 px-6 md:px-12 lg:px-24">
      
      {/* Huge Background Text */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 md:top-10 inset-x-0 z-0 pointer-events-none select-none flex justify-center items-start overflow-hidden"
      >
        <span className="text-[28vw] md:text-[22vw] font-black text-[var(--text)] opacity-5 leading-none tracking-[-0.08em] whitespace-nowrap">
          MY WORKS
        </span>
      </motion.div>

      {/* Main Content Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 md:mb-32 max-w-3xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--muted)]"></span>
            <span className="text-sm tracking-[0.2em] uppercase text-[var(--muted)]">Projects</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-[var(--text)] mb-8 tracking-tight">
            Selected Work
          </h2>
          <p className="text-lg md:text-xl text-[var(--muted)] leading-relaxed font-light">
            A few projects that reflect how I think, build, and connect frontend experiences with real application logic.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
