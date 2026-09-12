import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { classOf2024Copy } from '../../data/memories';
gsap.registerPlugin(ScrollTrigger);

export default function ClassOf2024() {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      if (reduce) {
        gsap.set(el.querySelectorAll('[data-class-anim]'), { opacity: 1, y: 0 });
        return;
      }

      tl.fromTo(
        el.querySelector('[data-class-pre]'),
        { opacity: 0, y: 20, letterSpacing: '0.5em' },
        { opacity: 1, y: 0, letterSpacing: '0.32em', duration: 0.9, ease: 'power3.out' },
      )
        .fromTo(
          el.querySelector('[data-class-year]'),
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' },
          '-=0.5',
        )
        .fromTo(
          el.querySelectorAll('[data-class-line]'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out' },
          '-=0.6',
        )
        .fromTo(
          el.querySelector('[data-class-desc]'),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.4',
        );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="class-of-2024"
      ref={root}
      className="relative z-10 w-full py-32 sm:py-40"
    >
      <div
        ref={root}
        className="content-right pr-5 sm:pr-8"
      >
        <p
          data-class-anim
          data-class-pre
          className="mb-6 text-xs font-bold uppercase tracking-[0.5em] text-black"
        >
          {classOf2024Copy.preLabel}
        </p>

        <h2
          data-class-anim
          data-class-year
          className="font-display text-[clamp(4rem,12vw,9rem)] font-bold leading-none tracking-tightest text-black"
        >
          {classOf2024Copy.year}
        </h2>

        <div className="mt-10 space-y-2 font-display text-2xl font-bold italic text-black sm:text-3xl">
          <p data-class-anim data-class-line>{classOf2024Copy.line1}</p>
          <p data-class-anim data-class-line>{classOf2024Copy.line2}</p>
          <p data-class-anim data-class-line>{classOf2024Copy.line3}</p>
        </div>

        <p
          data-class-anim
          data-class-desc
          className="mt-10 max-w-md text-base leading-relaxed text-black"
        >
          {classOf2024Copy.description}
        </p>

        {classOf2024Copy.memberCount && (
          <p
            data-class-anim
            className="mt-8 font-mono text-xs font-bold uppercase tracking-[0.25em] text-black"
          >
            {classOf2024Copy.memberCount} members · 1 angkatan
          </p>
        )}
      </div>
    </section>
  );
}
