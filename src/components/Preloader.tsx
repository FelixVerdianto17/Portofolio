import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Artificial loading animation
    const duration = 2000; // 2 seconds to reach 100%
    const intervalTime = 20;
    const step = 100 / (duration / intervalTime);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev + step >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500); // Wait briefly at 100%
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0, opacity: 1 }}
      exit={{ y: "-100%", opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
    >
      <div className="text-white text-3xl font-light tracking-[0.2em] uppercase mb-2">PORTFOLIO</div>
      <div className="text-gray-400 text-sm tracking-[0.3em] uppercase mb-8">HIGHLIGHT</div>
      <div className="text-white text-5xl font-light">{Math.floor(progress)}%</div>
    </motion.div>
  );
}
