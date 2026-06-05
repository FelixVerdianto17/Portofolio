import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function QuoteSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Track scroll progress for a subtle parallax effect on the background word
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[var(--bg)] transition-colors duration-500 flex items-center justify-center py-32"
    >
      {/* Huge Background Text with Parallax */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <motion.span 
          style={{ y }}
          className="text-[25vw] sm:text-[22vw] md:text-[20vw] font-black text-[var(--text)] opacity-5 uppercase leading-none tracking-[-0.08em] whitespace-nowrap"
        >
          THOUGHT
        </motion.span>
      </div>

      {/* Quote Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-6 flex flex-col items-center">
        
        {/* Decorative Quotation Mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl text-[var(--muted)] opacity-50 font-serif leading-none h-8 md:h-12 mb-6 md:mb-10"
        >
          "
        </motion.div>

        {/* Main Quote Text */}
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl lg:text-7xl font-bold md:font-black leading-[1.3] md:leading-tight lg:leading-[1.1] text-[var(--text)] tracking-tight"
        >
          AI doesn’t replace the work — it helps me move faster, think clearer, and build better.
        </motion.h2>

        {/* Author Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 md:mt-16 flex items-center gap-4"
        >
          <div className="w-8 md:w-16 h-[1px] bg-[var(--border)]"></div>
          <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-[var(--muted)]">
            Felix Verdianto
          </span>
          <div className="w-8 md:w-16 h-[1px] bg-[var(--border)]"></div>
        </motion.div>

      </div>
    </section>
  );
}
