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
      const lines = el.querySelectorAll('[data-anim]');
      if (reduce) {
        gsap.set(lines, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        lines,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.15,
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
    <section id="closing" ref={root} className="relative w-full bg-iron">
      <div className="section-divider bg-concrete/20" />
      <div className="max-w-site mx-auto px-5 sm:px-8 py-30 sm:py-50">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-12">
          <div className="w-full sm:w-[45%]">
            <p data-anim className="font-display text-[13px] font-normal uppercase tracking-[0.32em] text-concrete/50 mb-6">
              — Penutup —
            </p>
            <h2
              data-anim
              className="font-display text-[clamp(2rem,5vw,4rem)] font-normal leading-subheading tracking-tight text-concrete"
            >
              {closingCopy.line1}
            </h2>
          </div>

          <div className="w-full sm:w-[45%] sm:text-right">
            <h2
              data-anim
              className="font-display text-[clamp(2rem,5vw,4rem)] font-normal leading-subheading tracking-tight text-concrete"
            >
              {closingCopy.line2}
            </h2>
          </div>
        </div>

        <div data-anim className="mt-20 sm:mt-30 text-center">
          <p className="font-display text-[clamp(3rem,8vw,8rem)] font-normal leading-display tracking-tighter text-concrete uppercase">
            {closingCopy.sign}
          </p>
        </div>
      </div>
    </section>
  );
}
