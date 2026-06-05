import { motion } from 'motion/react';

const services = [
  {
    id: 1,
    title: "Interactive Landing Pages",
    description: "High-converting landing pages with smooth motion, responsive layout, and strong visual direction.",
    tech: "React, Tailwind CSS, Motion, GSAP"
  },
  {
    id: 2,
    title: "Web App Interfaces",
    description: "Dashboard, form, auth, CRUD, and data-driven interfaces with clean user flows.",
    tech: "React, Zustand, React Router, TanStack Query"
  },
  {
    id: 3,
    title: "API Integration",
    description: "Connecting frontend interfaces with backend APIs, handling loading states, errors, and real user data.",
    tech: "Axios, REST API, Node.js, Express"
  },
  {
    id: 4,
    title: "AI-Assisted Web Tools",
    description: "Simple AI-powered tools and workflows that help automate or classify user input.",
    tech: "React, API Integration, AI Workflow"
  }
];

export default function ServicesSection() {
  return (
    <section className="bg-black py-32 md:py-48 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24 max-w-3xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="w-2 h-2 rounded-full bg-white/50"></span>
            <span className="text-sm tracking-[0.2em] uppercase text-white/50">Services</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-8 tracking-tight">
            What I can build
          </h2>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light">
            I focus on building clean interfaces, interactive web experiences, and practical application flows using frontend technologies with backend fundamentals.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-8 md:p-10 lg:p-12 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              {/* Soft Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-2xl md:text-3xl font-light text-white mb-4 group-hover:text-white/90 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-white/50 text-sm md:text-base leading-relaxed font-light mb-8 flex-grow">
                  {service.description}
                </p>
                
                <div className="mt-auto">
                  <span className="block text-[10px] md:text-xs tracking-widest uppercase text-white/30 mb-2">
                    Tech Focus
                  </span>
                  <p className="text-sm text-white/70 font-light">
                    {service.tech}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
