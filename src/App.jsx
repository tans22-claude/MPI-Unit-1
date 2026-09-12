import { useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Hero from './components/sections/Hero';
import Story from './components/sections/Story';
import Gallery from './components/sections/Gallery';
import ClassOf2024 from './components/sections/ClassOf2024';
import Suka from './components/sections/Suka';
import Duka from './components/sections/Duka';
import Members from './components/sections/Members';
import ClosingMemory from './components/sections/ClosingMemory';

import ImageSequenceBackground from './components/motion/ImageSequenceBackground';
import Preloader from './components/ui/Preloader';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);

  const handleLoaded = useCallback(() => {
    setLoading(false);
  }, []);

  // Lenis Smooth Scroll
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.6,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    const t = setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      lenis.destroy();
      window.removeEventListener('load', onLoad);
      clearTimeout(t);
    };
  }, [loading]);

  return (
    <>
      {/* Preloader */}
      {loading && <Preloader onComplete={handleLoaded} />}

      {/* Image sequence background */}
      <ImageSequenceBackground />

      {/* Top nav */}
      <Navbar />

      {/* Main flow */}
      <main className="relative z-10 bg-white/95">
        <Hero />
        <Story />
        <Gallery />
        <ClassOf2024 />
        <Suka />
        <Duka />
        <Members />
        <ClosingMemory />
      </main>

      <Footer />
    </>
  );
}
