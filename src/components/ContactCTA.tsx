import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function ContactCTA() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section 
      id="contact"
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[var(--bg)] transition-colors duration-500 flex items-center justify-center py-32 md:py-0"
    >
      {/* Subtle Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--text)_0%,transparent_50%)] opacity-5 pointer-events-none transition-opacity duration-500"></div>

      {/* Huge Background Text with Parallax */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <motion.span 
          style={{ y }}
          className="text-[25vw] sm:text-[22vw] md:text-[20vw] font-black text-[var(--text)] opacity-5 uppercase leading-none tracking-[-0.08em] whitespace-nowrap"
        >
          CONTACT
        </motion.span>
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
        
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-8 md:mb-12"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--muted)]"></span>
          <span className="text-sm tracking-[0.2em] uppercase text-[var(--muted)]">Let's Talk</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-8xl font-light tracking-tight text-[var(--text)] mb-8"
        >
          Let’s build something <span className="font-bold">great.</span>
        </motion.h2>

        {/* Sub Headline */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-[var(--muted)] leading-relaxed font-light max-w-3xl mb-12 md:mb-16"
        >
          Have an idea, project, or interface that needs to feel better? I’m open to building clean web experiences, interactive landing pages, web app interfaces, and practical API-connected tools.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto"
        >
          {/* Primary CTA */}
          <a 
            href="https://wa.me/6283866284860" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative px-8 md:px-10 py-4 md:py-5 bg-[var(--text)] text-[var(--bg)] rounded-full font-medium tracking-wide flex items-center justify-center gap-3 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] w-full sm:w-auto"
          >
            <span className="relative z-10 font-bold">Chat on WhatsApp</span>
            <svg className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <div className="absolute inset-0 bg-[var(--bg)] opacity-10 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0"></div>
          </a>

          {/* Secondary CTA */}
          <a 
            href="#projects"
            className="group px-8 md:px-10 py-4 md:py-5 rounded-full font-medium tracking-wide text-[var(--text)] border border-[var(--border)] hover:bg-[var(--card)] hover:border-[var(--text)] transition-all duration-300 w-full sm:w-auto text-center"
          >
            View My Work
          </a>
        </motion.div>

      </div>
    </section>
  );
}
