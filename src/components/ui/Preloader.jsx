import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const root = useRef(null);
  const [percent, setPercent] = useState(0);

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
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-concrete"
    >
      <span className="font-display text-[clamp(4rem,12vw,10rem)] font-normal leading-display tracking-tighter text-iron">
        {percent}
        <span className="text-[clamp(2rem,5vw,4rem)]">%</span>
      </span>

      <div className="mt-6 h-[1px] w-48 bg-iron/20">
        <div
          className="h-full bg-iron transition-none"
          style={{ width: `${percent}%` }}
        />
      </div>

      <span className="mt-4 font-display text-[13px] font-normal uppercase tracking-[0.3em] text-iron/40">
        Loading
      </span>
    </div>
  );
}
