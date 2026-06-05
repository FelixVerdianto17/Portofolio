import { useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';

const text = "Hi, I’m Felix Verdianto — a Web Developer focused on building clean, interactive, and visually engaging web experiences. I work with frontend technologies, motion, API integration, and backend fundamentals using Node.js and Express to create interfaces that feel modern, smooth, and useful.";

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word = ({ children, progress, range }: WordProps) => {
  // Starts with low opacity (0.15) and slightly shifted Y, animates to full opacity and original position
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [10, 0]);

  return (
    <motion.span style={{ opacity, y }} className="inline-block">
      {children}
    </motion.span>
  );
};

export default function TextRevealIntro() {
  const containerRef = useRef<HTMLDivElement>(null);

  // The scroll tracking happens exactly while the container is pinned (start start to end end)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Manually split string by spaces to get an array of words
  const words = text.split(" ");

  return (
    <div ref={containerRef} id="intro" className="h-[200vh] relative bg-[var(--bg)] transition-colors duration-500">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center px-6 md:px-12 lg:px-24 overflow-hidden">
        {/* We use flex-wrap to act like standard paragraph flow, but with precise control over each word */}
        <p className="text-2xl md:text-4xl lg:text-5xl font-light text-[var(--text)] leading-relaxed max-w-5xl flex flex-wrap justify-center text-center gap-x-[0.3em] gap-y-[0.4em]">
          {words.map((word, i) => {
            // Calculate a staggered overlapping range for each word
            // We use 0.8 as the multiplier so the animation finishes by 80% scroll progress
            const start = (i / words.length) * 0.8;
            const end = start + 0.2;
            
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
}
