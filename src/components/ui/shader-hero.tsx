"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

const letterAnimation = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const containerAnimation = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
}

export const ShaderHero = () => {
  const title = "MANAJEMEN PENDIDIKAN ISLAM"
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden w-full"
    >
      <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-6 px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium flex items-center gap-2 backdrop-blur-lg border border-white/20"
        >
          <Sparkles className="w-4 h-4 text-gray-200" />
          UNIT 1
        </motion.div>

        <motion.h1
          variants={containerAnimation}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg flex flex-wrap justify-center"
        >
          {title.split("").map((char, index) => (
            <motion.span
              key={index}
              variants={letterAnimation}
              className={char === " " ? "w-2" : ""}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-6 max-w-2xl text-lg md:text-xl text-gray-300"
        >
          UIN Sultanah Nahrasiyah Lhokseumawe
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="mt-10 flex gap-4"
        >
          <Button
            size="lg"
            className="rounded-2xl px-6 py-6 text-lg bg-white text-black hover:bg-gray-200"
            onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Lihat Galeri <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
