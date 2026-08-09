import { Route } from '../hooks/useHashRoute';
import { motion } from 'framer-motion';

const LINKS: { route: Route; label: string }[] = [
  { route: 'home', label: 'Home' },
  { route: 'mcp', label: 'MCP' },
  { route: 'skills', label: 'Skills' },
  { route: 'bundles', label: 'Bundles' },
  { route: 'faq', label: 'FAQ' },
];

export function Navbar({ route, onNavigate }: { route: Route; onNavigate: (r: Route) => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-12 flex justify-center">
      <div className="w-full flex items-center justify-between px-4 py-2.5 md:px-6 md:py-3">
        {/* Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-0 font-display text-sm font-bold tracking-wider text-white uppercase shrink-0"
        >
          <div className="relative flex h-[52px] w-[52px] items-center justify-center rounded-lg bg-transparent overflow-hidden">
            <img src="/logo.png" alt="Tickerlab Logo" className="h-full w-full object-contain" />
          </div>
          <span className="tracking-[0.25em] font-extrabold text-xs hidden sm:inline">TICKERLAB</span>
        </button>

        {/* Center Pill Menu */}
        <nav className="flex items-center gap-0.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-1 shadow-inner max-w-[60vw] md:max-w-none overflow-x-auto scrollbar-none">
          {LINKS.map((link) => {
            const isActive = route === link.route;
            return (
              <button
                key={link.route}
                onClick={() => onNavigate(link.route)}
                className={`relative px-3.5 py-1.5 md:px-5 md:py-2 text-[10px] md:text-xs font-semibold uppercase tracking-wider rounded-full transition-colors duration-300 shrink-0 ${isActive ? 'text-black z-10' : 'text-white/60 hover:text-white'
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 bg-white rounded-full -z-10 shadow"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hidden lg:flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            Github
          </a>

          <button
            onClick={() => {
              onNavigate('home');
              setTimeout(() => {
                const element = document.getElementById('generate');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }, 120);
            }}
            className="bg-white text-black hover:bg-neutral-200 border border-transparent px-4 py-2 md:px-5 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:scale-[1.02]"
          >
            Try It
          </button>
        </div>
      </div>
    </header>
  );
}
