import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import SequenceHero from './components/SequenceHero';
import TextRevealIntro from './components/TextRevealIntro';
import InteractiveBadge3D from './components/InteractiveBadge3D';
import TechStackMarquee from './components/TechStackMarquee';
import SelectedProjects from './components/SelectedProjects';
import QuoteSection from './components/QuoteSection';
import ContactCTA from './components/ContactCTA';
import SmoothScrolling from './components/SmoothScrolling';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <SmoothScrolling>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      
      {!isLoading && <Navbar />}

      <main className={`transition-opacity duration-1000 ${isLoading ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        <SequenceHero />
        <TextRevealIntro />
        <TechStackMarquee />
        <SelectedProjects />
        <QuoteSection />
        <ContactCTA />
        <InteractiveBadge3D />
      </main>
    </SmoothScrolling>
  );
}

export default App;
