import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FrameSequenceCanvas from '../motion/FrameSequenceCanvas';
import TimelineOverlay from '../motion/TimelineOverlay';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 303;

export default function ClassOf2024() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Wait for first frame to load before enabling ScrollTrigger
    const img = new Image();
    img.onload = () => setIsReady(true);
    img.onerror = () => setIsReady(true);
    img.src = `${import.meta.env.BASE_URL}images/fotostack/00001.jpg`;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;
    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    return () => trigger.kill();
  }, [isReady]);

  return (
    <section
      id="class-of-2024"
      ref={sectionRef}
      className="relative"
      style={{ height: '350vh' }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Canvas background */}
        <div className="absolute inset-0 bg-concrete">
          <FrameSequenceCanvas progress={progress} />
        </div>

        {/* Gradient overlay — left darken for timeline readability */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.20) 20%, rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.05) 100%)',
          }}
        />

        {/* Timeline overlay */}
        <div className="relative z-10 h-full">
          <TimelineOverlay progress={progress} />
        </div>
      </div>
    </section>
  );
}
