import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gallery } from '../../data/gallery';
gsap.registerPlugin(ScrollTrigger);

const leftPhotos = gallery.slice(0, Math.ceil(gallery.length / 2));
const rightPhotos = gallery.slice(Math.ceil(gallery.length / 2));

function GalleryCard({ g }) {
  return (
    <div
      data-gallery-item
      className="group relative overflow-hidden rounded cursor-pointer"
    >
      <img
        src={g.src}
        alt={g.alt}
        loading="lazy"
        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
        <p className="text-xs font-bold text-white">{g.caption}</p>
      </div>
    </div>
  );
}

function LeftColumn() {
  return (
    <div className="w-[45%] space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {leftPhotos.slice(0, 2).map((g) => (
          <GalleryCard key={g.id} g={g} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {leftPhotos.slice(2, 4).map((g) => (
          <GalleryCard key={g.id} g={g} />
        ))}
      </div>
    </div>
  );
}

function RightColumn() {
  return (
    <div className="w-[45%] space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {rightPhotos.slice(0, 2).map((g) => (
          <GalleryCard key={g.id} g={g} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {rightPhotos.slice(2, 4).map((g) => (
          <GalleryCard key={g.id} g={g} />
        ))}
      </div>
    </div>
  );
}

export default function Gallery() {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll('[data-gallery-item]');
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
      id="gallery"
      ref={root}
      className="relative z-10 w-full py-24 sm:py-32 bg-white"
    >
      <div className="content-wide px-5 sm:px-8">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.32em] text-black">
            — Memory wall —
          </p>
          <h2 className="font-display text-4xl font-bold text-black sm:text-5xl md:text-6xl">
            Gallery
          </h2>
          <p className="mt-4 max-w-sm text-sm text-black">
            Bukan sekadar grid. Ini dinding kenangan — dikurasi, ditata, dibiarkan bernapas.
          </p>
        </div>

        <div className="flex justify-between gap-6">
          <LeftColumn />
          <RightColumn />
        </div>

        {gallery.length === 0 && (
          <p className="py-20 text-center text-black/60">
            Belum ada foto di gallery.
          </p>
        )}
      </div>
    </section>
  );
}
