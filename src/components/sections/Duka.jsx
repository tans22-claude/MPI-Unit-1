import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { dukaCopy } from '../../data/memories';
gsap.registerPlugin(ScrollTrigger);

const dukaMoments = [
  { label: 'Deadline', note: 'Tengah malam, kopi kedua, keyboard masih panas.' },
  { label: 'Revisi',   note: 'Entah ke berapa. Tapi akhirnya lulus.' },
  { label: 'Presentasi', note: 'Tangan gemetar. Suara tetap jalan.' },
  { label: 'Lulus',    note: 'Diam sebentar. Lalu senyum.' },
];

export default function Duka() {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll('[data-duka-item]');
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
          stagger: 0.12,
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
    <section
      id="duka"
      ref={root}
      className="relative z-10 w-full py-32 sm:py-40 bg-white"
    >


      <div className="content-left pl-5 sm:pl-8">
        <p
          data-duka-item
          className="mb-3 text-xs font-bold uppercase tracking-[0.32em] text-black"
        >
          {dukaCopy.kicker}
        </p>
        <h2
          data-duka-item
          className="font-display text-5xl font-bold text-black sm:text-6xl md:text-7xl"
        >
          {dukaCopy.title}<span className="text-black">.</span>
        </h2>
        <p
          data-duka-item
          className="mt-8 max-w-2xl text-base leading-relaxed text-black sm:text-lg"
        >
          {dukaCopy.blurb}
        </p>

        <ul className="mt-16 space-y-6">
          {dukaMoments.map((m, i) => (
            <li
              key={m.label}
              data-duka-item
              className="flex flex-col gap-2 border-l border-black/20 pl-6 sm:flex-row sm:items-baseline sm:gap-8"
            >
              <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-black sm:w-32">
                0{i + 1} — {m.label}
              </span>
              <span className="font-display text-xl italic text-black sm:text-2xl">
                {m.note}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
