import { motion } from 'framer-motion';
import { FadeUp } from './FadeUp';

const HEADLINE = 'WE TURN ONE IDEA INTO A LAUNCH-READY TOKEN.';
const SUBTEXT = 'Type the idea. We handle the ticker, the name, the lore, and the pump.fun link.';

export function Hero() {
  const words = HEADLINE.split(' ');

  return (
    <>
      {/* fixed background video, sits behind everything */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          objectFit: 'cover',
          zIndex: 0,
        }}
        src="/bg-video.mp4"
      />

      {/* transparent content section over the video */}
      <section
        className="hero-font"
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100vh',
          padding: '70px 32px 32px 32px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            maxWidth: 720,
          }}
        >
          <FadeUp
            delay={0.05}
            y={12}
          >
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-amber/30 bg-amber/10 px-3 py-1 font-mono text-[10px] md:text-xs uppercase tracking-widest text-amber">
              <span>CA: HKxpGGAfN3dE7AjQrJXbxUPf3eeAmGC6kwiGFFVbpump</span>
            </div>
          </FadeUp>
          <h2
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.25em',
              fontSize: 'clamp(26px, 3vw, 42px)',
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              color: '#fff',
              margin: 0,
            }}
          >
            {words.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <FadeUp
            as="p"
            delay={0.9}
            y={24}
            style={{
              marginTop: 24,
              fontSize: 14,
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.85)',
              maxWidth: 260,
            }}
          >
            {SUBTEXT}
          </FadeUp>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          section.hero-font {
            padding: 90px 18px 32px 18px !important;
          }
        }
      `}</style>
    </>
  );
}
