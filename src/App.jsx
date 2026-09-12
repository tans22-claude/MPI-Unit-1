import { useEffect } from 'react';
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

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  // Lenis Smooth Scroll - Perlambat scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,        // Durasi scroll (lebih tinggi = lebih lambat)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing smooth
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.6, // Perlambat wheel scroll
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Sync Lenis dengan GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger once everything mounts
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    const t = setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      lenis.destroy();
      window.removeEventListener('load', onLoad);
      clearTimeout(t);
    };
  }, []);

  return (
    <>
      {/* Image sequence background — scroll-driven animation */}
      <ImageSequenceBackground />

      {/* Top nav */}
      <Navbar />

      {/* Main flow */}
      <main className="relative z-10">
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
