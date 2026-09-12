import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('[data-hero-badge]', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.3 });
      gsap.fromTo('[data-hero-title]', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, delay: 0.5 });
      gsap.fromTo('[data-hero-sub]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 1.2 });
      gsap.fromTo('[data-hero-btn]', { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 1.8 });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="min-h-screen relative overflow-hidden w-full">
      {/* Gradient blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#E07A5F]/20 blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#3D405B]/30 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/5 blur-[100px]" />
      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:64px_64px] opacity-30"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-4">
        <div
          data-hero-badge
          className="mb-6 px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium flex items-center gap-2 backdrop-blur-lg border border-white/20 opacity-0"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          UNIT 1
        </div>

        <h1
          data-hero-title
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg opacity-0"
        >
          MANAJEMEN PENDIDIKAN ISLAM
        </h1>

        <p
          data-hero-sub
          className="mt-6 max-w-2xl text-lg md:text-xl text-gray-300 opacity-0"
        >
          UIN Sultanah Nahrasiyah Lhokseumawe
        </p>

        <button
          data-hero-btn
          onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
          className="mt-10 rounded-2xl px-6 py-6 text-lg bg-white text-black hover:bg-gray-200 flex items-center gap-2 opacity-0"
        >
          Lihat Galeri
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
