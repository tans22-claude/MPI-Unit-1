"use client";

import * as React from "react";

import { Badge } from "@/components/ui/badge";

function UniLogo() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="size-10"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M50 15 L30 40 H70 L50 15Z" fill="currentColor" opacity="0.8" />
      <rect x="25" y="42" width="50" height="8" rx="2" fill="currentColor" opacity="0.6" />
      <rect x="30" y="55" width="6" height="25" rx="2" fill="currentColor" opacity="0.5" />
      <rect x="47" y="55" width="6" height="25" rx="2" fill="currentColor" opacity="0.5" />
      <rect x="64" y="55" width="6" height="25" rx="2" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

export default function ComingSoonBlock() {
  return (
    <section className="relative flex min-h-svh w-full items-center justify-center overflow-hidden px-6 py-16 text-white">
      {/* Animated gradient background */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
        aria-hidden="true"
      />
      {/* Glow orb */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E07A5F]/20 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-[#F4A261]/15 blur-[100px]"
        aria-hidden="true"
      />
      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:64px_64px] opacity-[0.3]"
        aria-hidden="true"
      />
      {/* Top line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        aria-hidden="true"
      />

      <div className="relative flex w-full max-w-xl flex-col items-center text-center">
        <div className="flex items-center gap-2 text-white/80">
          <UniLogo />
          <span className="text-lg font-semibold tracking-tight">MPI</span>
        </div>

        <Badge variant="secondary" className="mt-8 border-white/10 bg-white/10 text-white backdrop-blur-sm">
          UNIT 1
        </Badge>
        <h1 className="mt-5 font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          MANAJEMEN PENDIDIKAN ISLAM
        </h1>
        <p className="mt-5 max-w-md text-lg text-pretty text-white/60">
          UIN Sultanah Nahrasiyah Lhokseumawe
        </p>
      </div>
    </section>
  );
}
