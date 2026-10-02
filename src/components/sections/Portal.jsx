import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import GlyphPortal from '../ui/glyph-portal';
import { heroCopy } from '../../data/memories';

const FIELD_BACKGROUND = {
  position: 'absolute',
  inset: 0,
  transform: 'scale(var(--gp-field-scale,1))',
  background:
    'radial-gradient(circle at 18% 8%, rgba(217,217,217,.34), transparent 34%),' +
    'radial-gradient(circle at 82% 20%, rgba(250,77,67,.22), transparent 30%),' +
    'radial-gradient(circle at 48% 78%, rgba(0,0,0,.5), transparent 44%),' +
    'linear-gradient(135deg,#1f1f1f 0%,#2b2b2b 48%,#000 100%)',
};

const MENU_LINKS = [
  { href: '#story', label: 'Story' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#class-of-2024', label: 'Class of 2024' },
  { href: '#suka', label: 'Suka' },
  { href: '#duka', label: 'Duka' },
  { href: '#members', label: 'Members' },
  { href: '#closing', label: 'Penutup' },
];

export default function Portal() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <GlyphPortal
      word="MPI"
      scrollLength={2.4}
      enterLabel="Masuk"
      background={<div aria-hidden="true" style={FIELD_BACKGROUND} />}
      style={{
        '--gp-paper': '#d9d9d9',
        '--gp-ink': '#1f1f1f',
        '--gp-field': '#1f1f1f',
        '--gp-foreground': '#d9d9d9',
      }}
      front={
        <>
          <header className="relative z-20 flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
            <a href="#" className="font-display text-[26px] font-normal tracking-tight text-iron">
              MPI<span className="text-iron">.</span>
            </a>

            <button
              type="button"
              aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-iron"
            >
              <div className="flex flex-col gap-[5px]">
                <span className="block h-[2px] w-5 bg-concrete" />
                <span className="block h-[2px] w-5 bg-concrete" />
                <span className="block h-[2px] w-5 bg-concrete" />
              </div>
            </button>
          </header>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-30 bg-the-red flex flex-col"
              >
                <header className="flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
                  <a href="#" className="font-display text-[26px] font-normal tracking-tight text-iron">
                    MPI<span className="text-iron">.</span>
                  </a>
                  <button
                    type="button"
                    aria-label="Tutup menu"
                    onClick={() => setMenuOpen(false)}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-iron"
                  >
                    <div className="flex flex-col gap-[5px]">
                      <span className="block h-[2px] w-5 bg-concrete rotate-45 translate-y-[7px]" />
                      <span className="block h-[2px] w-5 bg-concrete -rotate-45 -translate-y-[7px]" />
                    </div>
                  </button>
                </header>

                <nav className="flex-1 flex flex-col justify-center px-5 sm:px-8">
                  {MENU_LINKS.map((l, i) => (
                    <motion.a
                      key={l.href}
                      href={l.href}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                      onClick={() => setMenuOpen(false)}
                      className="font-display text-5xl sm:text-7xl md:text-8xl font-normal tracking-tight text-iron py-2 sm:py-3 hover:text-carbon transition-colors"
                    >
                      {l.label}
                    </motion.a>
                  ))}
                </nav>

                <div className="px-5 sm:px-8 pb-8">
                  <span className="font-display text-[215px] sm:text-[280px] font-normal leading-display tracking-tighter text-iron/10 absolute bottom-0 left-0 select-none pointer-events-none">
                    1
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      }
    >
      <div className="max-w-3xl">
        <h1 className="font-display text-[clamp(2.5rem,7vw,6rem)] font-normal uppercase leading-[0.72] tracking-tighter text-concrete">
          {heroCopy.title}
        </h1>

        <p className="mt-6 max-w-xl font-display text-[15px] tracking-tight text-concrete/70 sm:mt-8 sm:text-[18px]">
          {heroCopy.subtitle}
        </p>

        <a
          href="#gallery"
          className="mt-6 inline-flex items-center gap-2 rounded-pill bg-concrete px-5 py-2.5 font-display text-[15px] tracking-tight text-iron transition-colors hover:bg-carbon hover:text-concrete sm:mt-8"
        >
          {heroCopy.ctaLabel} <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </GlyphPortal>
  );
}
