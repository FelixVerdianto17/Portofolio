import { useEffect, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent, useTransform } from 'motion/react';
import { getSequencePaths } from '../lib/sequence';

export default function SequenceHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  // Reduced from 500vh to 400vh so the sequence is punchy and not tedious to scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Re-timed overlays to avoid crowding. Divided cleanly across the 0 to 1 progress.
  const opacity1 = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.2], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.2], [20, 0, 0, -20]);

  const opacity2 = useTransform(scrollYProgress, [0.25, 0.3, 0.4, 0.45], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.3, 0.4, 0.45], [20, 0, 0, -20]);

  const opacity3 = useTransform(scrollYProgress, [0.5, 0.55, 0.65, 0.7], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.55, 0.65, 0.7], [20, 0, 0, -20]);

  const opacity4 = useTransform(scrollYProgress, [0.75, 0.8, 0.9, 0.95], [0, 1, 1, 0]);
  const y4 = useTransform(scrollYProgress, [0.75, 0.8, 0.9, 0.95], [20, 0, 0, -20]);

  // Smooth fade to solid black at the very end of the scroll (85% -> 100%)
  // Starts at 0.3 to maintain the base readability overlay, goes to 1.0 (fully black) for a clean exit
  const fadeOutOpacity = useTransform(scrollYProgress, [0.85, 1], [0.3, 1]);

  const lastDrawnIndexRef = useRef<number>(-1);

  const drawFrame = (index: number, force: boolean = false) => {
    if (!force && index === lastDrawnIndexRef.current) return;
    const img = imagesRef.current[index];
    if (!img || !img.complete) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width / 2) - (img.width / 2) * scale;
    const y = (canvas.height / 2) - (img.height / 2) * scale;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    lastDrawnIndexRef.current = index;
  };

  useEffect(() => {
    const paths = getSequencePaths();
    imagesRef.current = new Array(paths.length).fill(null);
    let isMounted = true;

    paths.forEach((path, i) => {
      const img = new Image();
      img.src = path;
      img.onload = () => {
        if (!isMounted) return;
        imagesRef.current[i] = img;
        
        const maxIndex = paths.length - 1;
        const currentTargetIndex = Math.min(
          maxIndex, 
          Math.max(0, Math.round(scrollYProgress.get() * maxIndex))
        );
        
        if (i === currentTargetIndex) {
          drawFrame(i);
        }
      };
    });

    const handleResize = () => {
      const maxIndex = paths.length - 1;
      const currentTargetIndex = Math.min(
        maxIndex, 
        Math.max(0, Math.round(scrollYProgress.get() * maxIndex))
      );
      drawFrame(currentTargetIndex, true);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      isMounted = false;
      window.removeEventListener('resize', handleResize);
    };
  }, [scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const maxIndex = imagesRef.current.length - 1;
    if (maxIndex <= 0) return;
    
    const frameIndex = Math.min(maxIndex, Math.max(0, Math.round(latest * maxIndex)));
    drawFrame(frameIndex);
  });

  return (
    <div ref={containerRef} id="home" className="h-[400vh] relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
        
        {/* Dynamic Dark Overlay for readability and final cinematic fade out */}
        <motion.div 
          style={{ opacity: fadeOutOpacity }} 
          className="absolute inset-0 bg-black pointer-events-none z-10" 
        />

        {/* Text Overlays Layer */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          
          {/* Overlay 1: Center */}
          <motion.div 
            style={{ opacity: opacity1, y: y1 }} 
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          >
            <h1 className="text-4xl md:text-6xl font-light text-white mb-4 tracking-wide drop-shadow-lg">
              Felix Verdianto
            </h1>
            <p className="text-sm md:text-base text-white/60 tracking-widest uppercase drop-shadow-md">
              Web Developer
            </p>
          </motion.div>

          {/* Overlay 2: Left */}
          <motion.div 
            style={{ opacity: opacity2, y: y2 }} 
            className="absolute inset-0 flex flex-col justify-center px-8 md:px-24 w-full max-w-4xl"
          >
            <h2 className="text-3xl md:text-5xl font-light text-white leading-tight drop-shadow-lg">
              I build clean, interactive, and modern web interfaces.
            </h2>
          </motion.div>

          {/* Overlay 3: Right */}
          <motion.div 
            style={{ opacity: opacity3, y: y3 }} 
            className="absolute inset-0 flex flex-col justify-center items-end text-right px-8 md:px-24 ml-auto w-full max-w-4xl"
          >
            <h2 className="text-3xl md:text-5xl font-light text-white leading-tight drop-shadow-lg">
              Blending frontend fundamentals with AI-assisted development.
            </h2>
          </motion.div>

          {/* Overlay 4: Center + Scroll Hint */}
          <motion.div 
            style={{ opacity: opacity4, y: y4 }} 
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
          >
            <h2 className="text-2xl md:text-4xl font-light text-white text-center drop-shadow-lg max-w-2xl">
              Let’s create a web experience that feels alive.
            </h2>
            
            <div className="absolute bottom-12 md:bottom-20 flex flex-col items-center">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/50 mb-4">
                Scroll to continue
              </span>
              <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-white/50 to-transparent"></div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
