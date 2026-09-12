import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const root = useRef(null);
  const [percent, setPercent] = useState(0);

  // Animate 0 → 100 over 2 seconds
  useEffect(() => {
    const obj = { val: 0 };
    const tl = gsap.to(obj, {
      val: 100,
      duration: 2,
      ease: 'power1.inOut',
      onUpdate: () => setPercent(Math.round(obj.val)),
    });
    return () => tl.kill();
  }, []);

  // Fade out when done
  useEffect(() => {
    if (percent < 100) return;
    const el = root.current;
    if (!el) return;

    const tl = gsap.timeline({
      onComplete: () => onComplete?.(),
    });

    tl.to(el, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
      delay: 0.2,
    });

    return () => tl.kill();
  }, [percent, onComplete]);

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
    >
      <div
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:64px_64px]"
        aria-hidden="true"
      />

      <span className="relative z-10 font-mono text-6xl font-bold tracking-tighter text-white sm:text-8xl">
        {percent}
        <span className="text-3xl sm:text-5xl">%</span>
      </span>

      <div className="relative z-10 mt-6 h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
        <div
          className="absolute inset-y-0 left-0 bg-white"
          style={{ width: `${percent}%` }}
        />
      </div>

      <span className="relative z-10 mt-4 text-xs font-medium uppercase tracking-[0.3em] text-white/40">
        Loading
      </span>
    </div>
  );
}
