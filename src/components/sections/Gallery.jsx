import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gallery } from '../../data/gallery';

gsap.registerPlugin(ScrollTrigger);

function GalleryCard({ g, large = false }) {
  return (
    <div data-gallery-item className="group relative overflow-hidden cursor-pointer">
      <img
        src={g.src}
        alt={g.alt}
        loading="lazy"
        className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
          large ? 'aspect-[16/9]' : 'aspect-[4/3]'
        }`}
      />
      <div className="absolute inset-0 bg-iron/0 group-hover:bg-iron/20 transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
        <p className="font-display text-[13px] font-normal tracking-tight text-concrete">{g.caption}</p>
      </div>
    </div>
  );
}

// Build layout pattern: LARGE → 4 SMALL → LARGE → 4 SMALL → ...
function buildLayout(items) {
  const rows = [];
  let i = 0;

  while (i < items.length) {
    // Large photo
    if (i < items.length) {
      rows.push({ type: 'large', items: [items[i]] });
      i++;
    }

    // 4 small photos
    const smalls = [];
    for (let j = 0; j < 4 && i < items.length; j++, i++) {
      smalls.push(items[i]);
    }
    if (smalls.length > 0) {
      rows.push({ type: 'small', items: smalls });
    }
  }

  return rows;
}

export default function Gallery() {
  const root = useRef(null);
  const layout = buildLayout(gallery);

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
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.06,
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
    <section id="gallery" ref={root} className="relative w-full bg-the-pink">
      <div className="section-divider bg-iron/20" />
      <div className="max-w-site mx-auto px-5 sm:px-8 py-20 sm:py-30">
        <div className="mb-12">
          <p data-anim className="font-display text-[13px] font-normal uppercase tracking-[0.32em] text-iron/60 mb-4">
            — Memory Wall —
          </p>
          <h2 data-anim className="font-display text-[clamp(2.5rem,6vw,4rem)] font-normal leading-heading tracking-tight text-iron uppercase">
            Gallery
          </h2>
        </div>

        <div className="space-y-2">
          {layout.map((row, ri) => (
            <div key={ri} data-anim>
              {row.type === 'large' ? (
                <GalleryCard g={row.items[0]} large />
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {row.items.map((g) => (
                    <GalleryCard key={g.id} g={g} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {gallery.length === 0 && (
          <p className="py-20 text-center font-display text-[15px] text-iron/50">
            Belum ada foto di gallery.
          </p>
        )}
      </div>
    </section>
  );
}
