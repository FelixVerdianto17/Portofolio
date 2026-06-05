import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function Navbar() {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    return savedTheme ?? "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  useEffect(() => {
    const handleGlobalClick = () => {
      setIsContactOpen(false);
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  const navItems = [
    { name: 'Home', href: '#home', type: 'link' },
    { name: 'Intro', href: '#intro', type: 'link' },
    { name: 'Stack', href: '#stack', type: 'link' },
    { name: 'Works', href: '#projects', type: 'link' },
    { name: 'Contact', type: 'popover' },
  ];

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 h-20 md:h-24 pointer-events-none transition-colors duration-500">
        
        <div className="absolute left-6 md:left-8 top-1/2 -translate-y-1/2 pointer-events-auto flex items-center justify-center">
          <a href="#home" className="text-xl md:text-2xl font-bold text-[var(--text)] tracking-tighter hover:opacity-70 transition-opacity leading-none" style={{ textDecoration: 'none' }}>
            F.
          </a>
        </div>
        
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto items-center justify-center text-xs md:text-sm uppercase tracking-[0.2em] text-[var(--muted)] font-light transition-colors leading-none hover:text-[var(--text)]">
          Web Developer Portfolio
        </div>
        
        {/* Right: Availability & Theme Toggle */}
        <div className="absolute right-6 md:right-8 top-1/2 -translate-y-1/2 pointer-events-auto flex items-center justify-center gap-4 md:gap-6">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs uppercase tracking-widest text-[var(--muted)] font-light leading-none mt-[2px]">
              <span className="hidden md:inline">Available for </span>freelance
            </span>
          </div>

          {/* Vertical Divider */}
          <div className="w-[1px] h-4 bg-[var(--border)] hidden sm:block"></div>

          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--text)] transition-all"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Bottom Floating Nav */}
      <nav className="fixed bottom-6 md:bottom-10 inset-x-0 z-50 flex justify-center pointer-events-none px-4">
        <div 
          className="pointer-events-auto flex items-center justify-center p-1.5 md:p-2 rounded-full bg-[var(--pill)] backdrop-blur-xl border border-[var(--border)] overflow-visible relative shadow-lg transition-colors duration-500"
          onMouseLeave={() => {
            setHoveredTab(null);
            setIsContactOpen(false);
          }}
        >
          {navItems.map((item) => (
            item.type === 'link' ? (
              <a
                key={item.name}
                href={item.href}
                onMouseEnter={() => {
                  setHoveredTab(item.name);
                  setIsContactOpen(false);
                }}
                className="relative flex items-center justify-center px-4 md:px-6 h-9 md:h-10 rounded-full text-xs md:text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors font-light leading-none z-10"
                style={{ WebkitTapHighlightColor: 'transparent', textDecoration: 'none' }}
              >
                {hoveredTab === item.name && (
                  <motion.div
                    layoutId="bubble"
                    className="absolute inset-0 z-[-1] bg-[var(--card)] rounded-full border border-[var(--border)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </a>
            ) : item.type === 'popover' ? (
              <div
                key={item.name}
                onMouseEnter={() => {
                  setHoveredTab(item.name);
                  setIsContactOpen(true);
                }}
                onMouseLeave={() => {
                  setIsContactOpen(false);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsContactOpen(!isContactOpen);
                }}
                className="group relative flex items-center justify-center px-4 md:px-6 h-9 md:h-10 rounded-full text-xs md:text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors font-light leading-none z-10 cursor-pointer"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {hoveredTab === item.name && (
                  <motion.div
                    layoutId="bubble"
                    className="absolute inset-0 z-[-1] bg-[var(--card)] rounded-full border border-[var(--border)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>

                {/* Hover/Tap Popover with Invisible Bridge (pb-3) */}
                <div className={`absolute bottom-full right-0 md:left-1/2 md:-translate-x-1/2 pb-3 transition-all duration-300 z-50 ${
                  isContactOpen 
                    ? 'opacity-100 translate-y-0 pointer-events-auto' 
                    : 'opacity-0 translate-y-2 pointer-events-none'
                }`}>
                  <div className="w-48 bg-[var(--bg)] border border-[var(--border)] rounded-2xl p-4 shadow-xl">
                    <h4 className="text-[var(--text)] font-medium mb-1 tracking-tight text-left">Let’s connect</h4>
                    <p className="text-xs text-[var(--muted)] mb-3 font-light text-left leading-relaxed">Choose where you want to reach me.</p>
                    
                    <div className="flex flex-col gap-1.5">
                      {[
                        { name: 'Instagram', url: 'https://www.instagram.com/velcreative.id/' },
                        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/felix-verdianto-015449225' },
                        { name: 'GitHub', url: 'https://github.com/felixverdianto' },
                        { name: 'WhatsApp', url: 'https://wa.me/6283866284860' },
                      ].map(social => (
                        <a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: 'none' }}
                          className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-[var(--card)] border border-transparent hover:border-[var(--border)] text-[var(--text)] transition-all group/link text-xs"
                        >
                          <span className="font-medium">{social.name}</span>
                          <svg className="w-3.5 h-3.5 opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all text-[var(--text)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : null
          ))}
        </div>
      </nav>
    </>
  );
}
