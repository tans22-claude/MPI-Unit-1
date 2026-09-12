import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { footerCopy } from '../../data/memories';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('[data-footer-anim]'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={root}
      className="relative z-10 w-full bg-black/80 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-24 sm:px-8 sm:pb-16 sm:pt-32">
        <div className="grid gap-12 border-t border-white/20 pt-12 md:grid-cols-3">
          <div data-footer-anim>
            <p className="font-display text-3xl font-bold text-black sm:text-4xl">
              {footerCopy.unit}<span className="text-black">.</span>
            </p>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-black">
              Class of {footerCopy.year}
            </p>
          </div>

          <nav data-footer-anim aria-label="Footer navigation">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-black">Navigate</p>
            <ul className="mt-4 space-y-2 text-sm text-black">
              <li><a href="#hero" className="hover:text-black/80">Home</a></li>
              <li><a href="#gallery" className="hover:text-black/80">Gallery</a></li>
              <li><a href="#class-of-2024" className="hover:text-black/80">Class of 2024</a></li>
              <li><a href="#suka-duka" className="hover:text-black/80">Suka & Duka</a></li>
              <li><a href="#members" className="hover:text-black/80">Members</a></li>
            </ul>
          </nav>

          <div data-footer-anim>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-black">Connect</p>
            <ul className="mt-4 space-y-2 text-sm text-black">
              {footerCopy.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="hover:text-black/80">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs text-black">{footerCopy.credit}</p>
          </div>
        </div>

        <p
          data-footer-anim
          className="mt-12 text-center text-xs font-bold uppercase tracking-[0.25em] text-black"
        >
          © {new Date().getFullYear()} — Built with memory.
        </p>
      </div>
    </footer>
  );
}
