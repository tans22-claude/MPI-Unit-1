import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { dukaCopy } from '../../data/memories';

gsap.registerPlugin(ScrollTrigger);

const dukaMoments = [
  { label: 'Deadline', note: 'Tengah malam, kopi kedua, keyboard masih panas.' },
  { label: 'Revisi', note: 'Entah ke berapa. Tapi akhirnya lulus.' },
  { label: 'Presentasi', note: 'Tangan gemetar. Suara tetap jalan.' },
  { label: 'Lulus', note: 'Diam sebentar. Lalu senyum.' },
];

export default function Duka() {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll('[data-anim]');
      if (reduce) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="duka" ref={root} className="relative w-full bg-the-red">
      <div className="section-divider" />
      <div className="max-w-site mx-auto px-5 sm:px-8 py-20 sm:py-30">
        <p data-anim className="font-display text-[13px] font-normal uppercase tracking-[0.32em] text-iron/60 mb-4">
          {dukaCopy.kicker}
        </p>
        <h2 data-anim className="font-display text-[clamp(2.5rem,6vw,5rem)] font-normal leading-heading tracking-tight text-iron uppercase">
          {dukaCopy.title}<span className="text-iron">.</span>
        </h2>
        <p data-anim className="mt-8 max-w-2xl font-display text-[15px] sm:text-[18px] font-normal tracking-tight leading-body text-iron/80">
          {dukaCopy.blurb}
        </p>

        <ul className="mt-16 space-y-6">
          {dukaMoments.map((m, i) => (
            <li
              key={m.label}
              data-anim
              className="flex flex-col gap-2 border-l border-iron/20 pl-6 sm:flex-row sm:items-baseline sm:gap-8"
            >
              <span className="font-display text-[13px] font-normal uppercase tracking-[0.25em] text-iron/60 sm:w-32 shrink-0">
                0{i + 1} — {m.label}
              </span>
              <span className="font-display text-[clamp(1.2rem,2vw,1.5rem)] font-normal tracking-tight text-iron">
                {m.note}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
