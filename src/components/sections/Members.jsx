import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { members } from '../../data/members';

gsap.registerPlugin(ScrollTrigger);

export default function Members() {
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
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.03,
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
    <section id="members" ref={root} className="relative w-full bg-concrete">
      <div className="section-divider" />
      <div className="max-w-site mx-auto px-5 sm:px-8 py-20 sm:py-30">
        <div className="mb-16">
          <p data-anim className="font-display text-[13px] font-normal uppercase tracking-[0.32em] text-iron/60 mb-4">
            21 members · 1 angkatan
          </p>
          <h2 data-anim className="font-display text-[clamp(2.5rem,6vw,5rem)] font-normal leading-heading tracking-tight text-iron uppercase">
            Members
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-10">
          {members.map((m) => (
            <div key={m.id} data-anim className="border-t border-iron/20 pt-4">
              <p className="font-display text-[18px] sm:text-[20px] font-normal tracking-tight text-iron uppercase">
                {m.name}
              </p>
              <p className="mt-1 font-display text-[12px] font-normal uppercase tracking-[0.2em] text-iron/50">
                {m.role}
              </p>
              <p className="mt-3 font-display text-[14px] font-normal tracking-tight text-iron/70 leading-body">
                &ldquo;{m.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
