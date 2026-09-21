import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gallery } from '../../data/gallery';
import { sukaCopy } from '../../data/memories';

gsap.registerPlugin(ScrollTrigger);

export default function Suka() {
  const root = useRef(null);
  const sukaItems = gallery.slice(0, 4);

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
          stagger: 0.08,
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
    <section id="suka" ref={root} className="relative w-full bg-the-yellow">
      <div className="section-divider" />
      <div className="max-w-site mx-auto px-5 sm:px-8 py-20 sm:py-30">
        <div className="mb-12">
          <p data-anim className="font-display text-[13px] font-normal uppercase tracking-[0.32em] text-iron/60 mb-4">
            {sukaCopy.kicker}
          </p>
          <h2 data-anim className="font-display text-[clamp(2.5rem,6vw,5rem)] font-normal leading-heading tracking-tight text-iron uppercase">
            {sukaCopy.title}<span className="text-iron">.</span>
          </h2>
          <p data-anim className="mt-4 max-w-md font-display text-[15px] font-normal tracking-tight text-iron/70">
            {sukaCopy.blurb}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {sukaItems.map((item, i) => (
            <div key={item.id || i} data-anim className="overflow-hidden">
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
