import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ImageSequenceBackground — 303 frames as full-viewport background.
 * Cover behavior: fills entire screen, crops overflow.
 * 30fps cap for smooth scrolling.
 */

const TOTAL_FRAMES = 303;
const FRAME_PATH = `${import.meta.env.BASE_URL}images/background/`;
const TARGET_FPS = 30;
const FRAME_INTERVAL = 1000 / TARGET_FPS;
const SCALE = 0.5;

function updateSubjectBbox() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  // Use 16:9 default aspect ratio for bbox calculation
  const imgAspect = 16 / 9;
  let drawW, drawH;
  if (imgAspect > 1) {
    drawW = w * SCALE;
    drawH = drawW / imgAspect;
  } else {
    drawH = h * SCALE;
    drawW = drawH * imgAspect;
  }
  const drawX = (w - drawW) / 2;
  const drawY = (h - drawH) / 2 - (h * 0.08);
  window.__subjectBbox = {
    x: drawX, y: drawY, width: drawW, height: drawH,
    centerX: drawX + drawW / 2,
    centerY: drawY + drawH / 2,
  };
}

// Set immediately
if (typeof window !== 'undefined') {
  updateSubjectBbox();
  window.addEventListener('resize', updateSubjectBbox);
}

export default function ImageSequenceBackground() {
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const currentFrameRef = useRef(0);
  const opacityRef = useRef(1);
  const lastDrawTimeRef = useRef(0);
  const pendingFrameRef = useRef(-1);
  const rafIdRef = useRef(0);

  const getFramePath = useCallback((index) => {
    const num = String(index + 1).padStart(5, '0');
    return `${FRAME_PATH}${num}.jpg`;
  }, []);

  // Preload all frames
  useEffect(() => {
    const frames = [];
    let loaded = 0;

    const onLoad = () => {
      loaded++;
      if (loaded >= TOTAL_FRAMES) {
        setIsLoaded(true);
      }
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.onload = onLoad;
      img.onerror = onLoad;
      img.src = getFramePath(i);
      frames.push(img);
    }

    framesRef.current = frames;

    return () => {
      frames.forEach((img) => {
        img.onload = null;
        img.onerror = null;
        img.src = '';
      });
    };
  }, [getFramePath]);

  // Canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let lastFrameIndex = -1;
    let cachedW = 0;
    let cachedH = 0;
    let cachedDpr = 0;

    const drawFrame = (frameIndex) => {
      const img = framesRef.current[frameIndex];
      if (!img || !img.complete || !img.naturalWidth) return;

      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      // Only resize canvas if dimensions changed
      if (w !== cachedW || h !== cachedH || dpr !== cachedDpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        cachedW = w;
        cachedH = h;
        cachedDpr = dpr;
      }

      // White background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, w, h);

      // Draw image smaller (50% of viewport), centered
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const scale = 0.5; // 50% of viewport

      let drawW, drawH, drawX, drawY;

      if (imgAspect > 1) {
        // Landscape image
        drawW = w * scale;
        drawH = drawW / imgAspect;
      } else {
        // Portrait or square
        drawH = h * scale;
        drawW = drawH * imgAspect;
      }

      drawX = (w - drawW) / 2;
      drawY = (h - drawH) / 2 - (h * 0.08); // Shift up 8% to show feet

      // Expose subject bounding box for collision detection
      window.__subjectBbox = {
        x: drawX,
        y: drawY,
        width: drawW,
        height: drawH,
        centerX: drawX + drawW / 2,
        centerY: drawY + drawH / 2,
        viewportWidth: w,
        viewportHeight: h,
      };

      // Apply opacity for footer fade
      ctx.globalAlpha = opacityRef.current;
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      ctx.globalAlpha = 1;
    };

    // RAF loop with 30fps cap
    const rafLoop = (timestamp) => {
      rafIdRef.current = requestAnimationFrame(rafLoop);

      if (pendingFrameRef.current === -1) return;

      const elapsed = timestamp - lastDrawTimeRef.current;
      if (elapsed < FRAME_INTERVAL) return;

      lastDrawTimeRef.current = timestamp - (elapsed % FRAME_INTERVAL);
      const frame = pendingFrameRef.current;
      pendingFrameRef.current = -1;

      if (frame !== lastFrameIndex) {
        lastFrameIndex = frame;
        drawFrame(frame);
      }
    };

    rafIdRef.current = requestAnimationFrame(rafLoop);

    // ScrollTrigger
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.1,
      onUpdate: (self) => {
        const progress = self.progress;

        const frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(progress * TOTAL_FRAMES)
        );

        currentFrameRef.current = frameIndex;

        // Footer fade: 92% → 99%
        if (progress > 0.92) {
          opacityRef.current = 1 - ((progress - 0.92) / 0.07);
          opacityRef.current = Math.max(0, Math.min(1, opacityRef.current));
        } else {
          opacityRef.current = 1;
        }

        // Queue frame for next RAF
        pendingFrameRef.current = frameIndex;
      },
    });

    // Initial draw
    if (isLoaded) {
      drawFrame(0);
    }

    // Resize
    const onResize = () => {
      cachedW = 0;
      cachedH = 0;
      cachedDpr = 0;
      lastFrameIndex = -1;
      drawFrame(currentFrameRef.current);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      trigger.kill();
      window.removeEventListener('resize', onResize);
    };
  }, [isLoaded]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
