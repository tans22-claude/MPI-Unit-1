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
      const blocks = el.querySelectorAll('[data-anim]');
      if (reduce) {
        gsap.set(blocks, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        blocks,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
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
    <section id="story" ref={root} className="relative w-full min-h-screen bg-concrete flex flex-col justify-center">
      <div className="section-divider" />
      <div className="max-w-site mx-auto w-full px-5 sm:px-8 py-20 sm:py-30">
        <div className="flex flex-col gap-16 sm:gap-24">

          {/* Kahlil Gibran: teks kiri, foto kanan */}
          <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-12">
            <div className="flex-1">
              <p data-anim className="font-display text-[13px] font-normal uppercase tracking-[0.32em] text-iron/60 mb-6">
                — Story —
              </p>
              <p data-anim className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-normal leading-subheading tracking-tight text-iron">
                {storyCopy.intro}
              </p>
              <div data-anim className="my-6 h-px w-16 bg-iron/30" />
              <p data-anim className="font-display text-[15px] font-normal tracking-tight text-iron/70">
                {storyCopy.middle}
              </p>
            </div>
            <div data-anim className="shrink-0 flex flex-col items-center gap-3">
              <img
                src="/images/2tokoh/kahlil gibran.png"
                alt="Kahlil Gibran"
                className="w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] object-cover"
              />
              <p className="font-display text-[12px] font-normal uppercase tracking-[0.2em] text-iron/50">
                Kahlil Gibran
              </p>
            </div>
          </div>

          {/* Aristoteles: teks kiri, foto kanan */}
          <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-12">
            <div className="flex-1">
              <p data-anim className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-normal leading-subheading tracking-tight text-iron">
                &ldquo;Kebersamaan dan persahabatan adalah hal yang paling diperlukan dalam hidup, karena tidak ada seorang pun yang memilih hidup tanpa teman, meskipun ia memiliki semua hal lainnya.&rdquo;
              </p>
              <div data-anim className="my-6 h-px w-16 bg-iron/30" />
              <p data-anim className="font-display text-[15px] font-normal tracking-tight text-iron/70">
                — Aristoteles —
              </p>
            </div>
            <div data-anim className="shrink-0 flex flex-col items-center gap-3">
              <img
                src="/images/2tokoh/aristoteles.png"
                alt="Aristoteles"
                className="w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] object-cover"
              />
              <p className="font-display text-[12px] font-normal uppercase tracking-[0.2em] text-iron/50">
                Aristoteles
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
