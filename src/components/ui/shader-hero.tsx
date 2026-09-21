"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"

const letterAnimation = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const containerAnimation = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.03 },
  },
}

export const ShaderHero = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full bg-concrete flex flex-col"
    >
      {/* Header bar */}
      <header className="relative z-20 flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        <a href="#hero" className="font-display text-[26px] font-normal tracking-tight text-iron">
          MPI<span className="text-iron">.</span>
        </a>

        <button
          type="button"
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-iron"
        >
          <div className="flex flex-col gap-[5px]">
            <span className="block h-[2px] w-5 bg-concrete" />
            <span className="block h-[2px] w-5 bg-concrete" />
            <span className="block h-[2px] w-5 bg-concrete" />
          </div>
        </button>
      </header>

      {/* Expanded menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-the-red flex flex-col"
          >
            <header className="flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
              <a href="#hero" className="font-display text-[26px] font-normal tracking-tight text-iron">
                MPI<span className="text-iron">.</span>
              </a>
              <button
                type="button"
                aria-label="Tutup menu"
                onClick={() => setMenuOpen(false)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-iron"
              >
                <div className="flex flex-col gap-[5px]">
                  <span className="block h-[2px] w-5 bg-concrete rotate-45 translate-y-[7px]" />
                  <span className="block h-[2px] w-5 bg-concrete -rotate-45 -translate-y-[7px]" />
                </div>
              </button>
            </header>

            <nav className="flex-1 flex flex-col justify-center px-5 sm:px-8">
              {[
                { href: "#story", label: "Story" },
                { href: "#gallery", label: "Gallery" },
                { href: "#class-of-2024", label: "Class of 2024" },
                { href: "#suka", label: "Suka" },
                { href: "#duka", label: "Duka" },
                { href: "#members", label: "Members" },
                { href: "#closing", label: "Penutup" },
              ].map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-5xl sm:text-7xl md:text-8xl font-normal tracking-tight text-iron py-2 sm:py-3 hover:text-carbon transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>

            <div className="px-5 sm:px-8 pb-8">
              <span className="font-display text-[215px] sm:text-[280px] font-normal leading-display tracking-tighter text-iron/10 absolute bottom-0 left-0 select-none pointer-events-none">
                1
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero display type */}
      <div className="flex-1 flex flex-col justify-center px-5 sm:px-8 pb-16 sm:pb-24">
        <motion.div
          variants={containerAnimation}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={letterAnimation} className="mb-4 sm:mb-6">
            <span className="inline-block px-3 py-1 rounded-pill bg-iron text-concrete font-display text-[13px] sm:text-[15px] font-normal tracking-tight uppercase">
              Unit 1 — Angkatan 2024
            </span>
          </motion.div>

          <motion.h1
            variants={letterAnimation}
            className="font-display text-[clamp(3rem,12vw,13rem)] font-normal leading-[0.72] tracking-tighter text-iron uppercase"
          >
            Manajemen
          </motion.h1>
          <motion.h1
            variants={letterAnimation}
            className="font-display text-[clamp(3rem,12vw,13rem)] font-normal leading-[0.72] tracking-tighter text-iron uppercase"
          >
            Pendidikan
          </motion.h1>
          <motion.h1
            variants={letterAnimation}
            className="font-display text-[clamp(3rem,12vw,13rem)] font-normal leading-[0.72] tracking-tighter text-iron uppercase"
          >
            Islam
          </motion.h1>

          <motion.p
            variants={letterAnimation}
            className="mt-8 sm:mt-12 font-display text-[15px] sm:text-[18px] font-normal tracking-tight text-iron/70 max-w-md"
          >
            UIN Sultanah Nahrasiyah Lhokseumawe
          </motion.p>

          <motion.div
            variants={letterAnimation}
            className="mt-6 sm:mt-8"
          >
            <a
              href="#gallery"
              className="inline-flex items-center gap-2 rounded-pill bg-iron text-concrete px-5 py-2.5 font-display text-[15px] font-normal tracking-tight hover:bg-carbon transition-colors"
            >
              Lihat Galeri <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
