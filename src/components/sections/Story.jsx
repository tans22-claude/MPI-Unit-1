import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { storyCopy } from '../../data/memories';
gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const blocks = el.querySelectorAll('[data-story-block]');
      if (reduce) {
        gsap.set(blocks, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        blocks,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.15,
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
      id="story"
      ref={root}
      className="relative z-10 w-full py-32 sm:py-40"
    >
      <div
        ref={root}
        className="px-5 max-w-6xl mx-auto"
      >
        {/* Split: kiri + kanan */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-12">
          {/* KIRI: Kahlil Gibran */}
          <div className="w-full sm:w-[45%] text-center sm:text-right">
            <p data-story-block className="mb-10 text-xs font-bold uppercase tracking-[0.32em] text-black">
              — Story —
            </p>
            <p data-story-block className="font-display text-2xl font-bold leading-snug text-black sm:text-3xl md:text-4xl">
              {storyCopy.intro}
            </p>
            <div className="my-10 flex justify-center sm:justify-end">
              <div className="h-px w-24 bg-black/40" />
            </div>
            <p data-story-block className="text-sm font-bold text-black sm:text-base">
              {storyCopy.middle}
            </p>
          </div>

          {/* KANAN: Aristoteles */}
          <div className="w-full sm:w-[45%] text-center sm:text-left">
            <p data-story-block className="font-display text-2xl font-bold leading-snug text-black sm:text-3xl md:text-4xl">
              "Kebersamaan dan persahabatan adalah hal yang paling diperlukan dalam hidup, karena tidak ada seorang pun yang memilih hidup tanpa teman, meskipun ia memiliki semua hal lainnya."
            </p>
            <div className="my-10 flex justify-center sm:justify-start">
              <div className="h-px w-24 bg-black/40" />
            </div>
            <p data-story-block className="text-sm font-bold text-black sm:text-base">
              — Aristoteles —
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
