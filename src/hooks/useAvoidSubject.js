import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * useAvoidSubject — shifts element away from the subject on canvas.
 * Returns { ref, style } to apply to the element.
 */
export default function useAvoidSubject({ margin = 60, maxShift = 100 } = {}) {
  const ref = useRef(null);
  const [offsetX, setOffsetX] = useState(0);
  const rafRef = useRef(0);

  const check = useCallback(() => {
    const el = ref.current;
    const bbox = window.__subjectBbox;
    if (!el || !bbox) return;

    const rect = el.getBoundingClientRect();

    // Expanded subject area
    const sL = bbox.x - margin;
    const sR = bbox.x + bbox.width + margin;
    const sT = bbox.y - margin;
    const sB = bbox.y + bbox.height + margin;

    // Overlap check
    const overlapX = Math.max(0, Math.min(rect.right, sR) - Math.max(rect.left, sL));
    const overlapY = Math.max(0, Math.min(rect.bottom, sB) - Math.max(rect.top, sT));

    if (overlapX > 0 && overlapY > 0) {
      // Element is overlapping subject — push it away
      const elemCenterX = rect.left + rect.width / 2;
      const dir = elemCenterX > bbox.centerX ? 1 : -1;
      const shift = Math.min(overlapX + 30, maxShift);
      setOffsetX(dir * shift);
    } else {
      setOffsetX(0);
    }
  }, [margin, maxShift]);

  useEffect(() => {
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(check);
    };

    // Check repeatedly for first 2 seconds then on scroll
    const interval = setInterval(check, 80);
    setTimeout(() => clearInterval(interval), 2000);
    check();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(interval);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [check]);

  return {
    ref,
    style: {
      transform: `translateX(${offsetX}px)`,
      transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      willChange: 'transform',
    },
  };
}
