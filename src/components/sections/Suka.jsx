import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Photo from '../ui/Photo';
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
      const items = el.querySelectorAll('[data-suka-item]');
      if (reduce) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        items,
        { opacity: 0, y: 40 },
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
    <section
      id="suka-duka"
      className="relative z-10 w-full py-32 sm:py-40 bg-white"
    >
      <div
        ref={root}
        id="suka"
        className="content-wide px-5 sm:px-8"
      >
        <div className="mb-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.32em] text-black">
            {sukaCopy.kicker}
          </p>
          <h2 className="font-display text-5xl font-bold text-black sm:text-6xl md:text-7xl">
            {sukaCopy.title}<span className="text-black">.</span>
          </h2>
          <p className="mt-4 max-w-md text-base text-black">
            {sukaCopy.blurb}
          </p>
        </div>

        {/* 2 left, space, 2 right */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-4 w-[30%]">
            {sukaItems.slice(0, 2).map((item, i) => (
              <div key={item.id || i} data-suka-item>
                <Photo
                  src={item.src}
                  alt={item.alt}
                  label={item.caption}
                  tone="neutral"
                  aspect="square"
                />
              </div>
            ))}
          </div>

          <div className="flex-1" />

          <div className="flex flex-col gap-4 w-[30%]">
            {sukaItems.slice(2, 4).map((item, i) => (
              <div key={item.id || i} data-suka-item>
                <Photo
                  src={item.src}
                  alt={item.alt}
                  label={item.caption}
                  tone="neutral"
                  aspect="square"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
