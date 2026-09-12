import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { closingCopy } from '../../data/memories';
gsap.registerPlugin(ScrollTrigger);

export default function ClosingMemory() {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const lines = el.querySelectorAll('[data-closing-line]');
      if (reduce) {
        gsap.set(lines, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        lines,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: el,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="closing"
      ref={root}
      className="relative z-10 w-full py-40 sm:py-56"
    >
      <div className="px-5 max-w-6xl mx-auto">
        {/* Split layout */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-12">
          {/* KIRI: line1 */}
          <div className="w-full sm:w-[45%] text-center sm:text-left">
            <p
              data-closing-line
              className="mb-3 text-xs font-bold uppercase tracking-[0.32em] text-black"
            >
              — Penutup —
            </p>
            <h2
              data-closing-line
              className="font-display text-3xl font-bold leading-tight text-black sm:text-5xl md:text-6xl"
            >
              {closingCopy.line1}
            </h2>
          </div>

          {/* KANAN: line2 */}
          <div className="w-full sm:w-[45%] text-center sm:text-right">
            <h2
              data-closing-line
              className="font-display text-3xl font-bold italic leading-tight text-black sm:text-5xl md:text-6xl"
            >
              {closingCopy.line2}
            </h2>
          </div>
        </div>

        {/* Class of 2024 — center, besar */}
        <div className="mt-20 flex justify-center">
          <p
            data-closing-line
            className="font-display text-5xl font-bold uppercase tracking-[0.15em] text-black sm:text-7xl md:text-8xl"
          >
            {closingCopy.sign}
          </p>
        </div>
      </div>
    </section>
  );
}
