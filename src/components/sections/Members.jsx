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
      const items = el.querySelectorAll('[data-member-item]');
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
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.05,
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
      id="members"
      ref={root}
      className="relative z-10 w-full py-32 sm:py-40 bg-white"
    >


      <div className="content-wide px-5 sm:px-8">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.32em] text-black/60">
            21 members · 1 angkatan
          </p>
          <h2 className="font-display text-5xl font-bold text-black sm:text-6xl">
            Members
          </h2>
          <p className="mt-4 max-w-md mx-auto text-sm text-black/70">
            Satu ruangan, banyak cerita, satu memori. Angkatan ini bukan sekadar tahun masuk  ini adalah siapa kita ketika dunia belum terlalu cepat.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {members.map((m) => (
            <div
              key={m.id}
              data-member-item
              className="text-center"
            >
              <p className="font-display text-lg font-bold text-black sm:text-xl">
                {m.name}
              </p>
              <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-black/50">
                {m.role}
              </p>
              <p className="mt-3 text-sm italic text-black/70 leading-relaxed">
                &ldquo;{m.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
