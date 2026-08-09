import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ToolsPage } from './pages/ToolsPage';
import { SkillsPage } from './pages/SkillsPage';
import { BundlesPage } from './pages/BundlesPage';
import { McpPage } from './pages/McpPage';
import { FaqPage } from './pages/FaqPage';
import { PlexusBg } from './components/PlexusBg';
import { useHashRoute } from './hooks/useHashRoute';

export default function App() {
  const [route, setRoute] = useHashRoute();

  return (
    <div className="font-body text-paper relative min-h-screen">
      {/* Background stars and canvas */}
      <div className="hero-bg">
        <PlexusBg />
      </div>

      <Navbar route={route} onNavigate={setRoute} />

      {route === 'home' && <HomePage onNavigate={setRoute} />}
      {route === 'tools' && <ToolsPage />}
      {route === 'skills' && <SkillsPage />}
      {route === 'bundles' && <BundlesPage />}
      {route === 'mcp' && <McpPage />}
      {route === 'faq' && <FaqPage />}

      <footer className="relative z-10 bg-ink border-t border-white/10 px-6 py-10 font-mono text-xs text-paper/40 md:px-12">
        <p className="mx-auto max-w-2xl md:max-w-none">
          Pounce Daemon writes creative token copy from your idea. It doesn't launch tokens, hold funds, or<br />
          give financial advice, you decide if and how to use the concept on pump.fun. Memecoins are<br />
          highly speculative; only ever risk what you can afford to lose. Official token: $PNCE.
        </p>
      </footer>
    </div>
  );
}
