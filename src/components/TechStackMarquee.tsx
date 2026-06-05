import { motion } from 'motion/react';

const row1 = [
  "React", "JavaScript", "TypeScript", "Tailwind CSS", "Vite", 
  "Motion", "GSAP", "Lenis", "Node.js", "Express.js"
];

const row2 = [
  "REST API", "Supabase", "PostgreSQL", "Zustand", "React Router", 
  "TanStack Query", "Axios", "Git", "GitHub"
];

const MarqueeRow = ({ items, reverse }: { items: string[], reverse?: boolean }) => {
  return (
    <div className="marquee-row overflow-hidden flex relative py-4">
      {/* Edge fade masks for cinematic feel */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[var(--bg)] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[var(--bg)] to-transparent z-10 pointer-events-none"></div>
      
      <div className={`marquee-track ${reverse ? 'marquee-right' : 'marquee-left'}`}>
        {/* First Set */}
        <div className="flex flex-shrink-0 gap-4 md:gap-8 pr-4 md:pr-8 items-center">
          {items.map((item, i) => (
            <span key={i} className="px-6 md:px-8 py-3 md:py-4 border border-[var(--border)] rounded-full text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--border)] opacity-100 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 text-xl md:text-3xl font-light whitespace-nowrap cursor-default">
              {item}
            </span>
          ))}
        </div>
        {/* Duplicated Set for infinite loop */}
        <div className="flex flex-shrink-0 gap-4 md:gap-8 pr-4 md:pr-8 items-center">
          {items.map((item, i) => (
            <span key={`dup-${i}`} className="px-6 md:px-8 py-3 md:py-4 border border-[var(--border)] rounded-full text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--border)] opacity-100 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 text-xl md:text-3xl font-light whitespace-nowrap cursor-default">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function TechStackMarquee() {
  return (
    <section id="stack" className="bg-[var(--bg)] transition-colors duration-500 py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-16 md:mb-24">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--muted)]"></span>
            <span className="text-sm tracking-[0.2em] uppercase text-[var(--muted)]">Stack</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-[var(--text)] mb-8 tracking-tight">
            Technologies I’ve worked with
          </h2>
          <p className="text-lg md:text-xl text-[var(--muted)] leading-relaxed font-light">
            A growing stack shaped by frontend practice, backend fundamentals, and real project workflows.
          </p>
        </motion.div>
      </div>

      {/* Full Width Marquee Area */}
      <div className="flex flex-col gap-8 md:gap-12 w-full">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>
    </section>
  );
}
