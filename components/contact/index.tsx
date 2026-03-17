'use client'

import { CpuBackground } from "../ui/cpu/cpu-background"
import { Cpu } from "../ui/cpu"


export function Contact() {
  return (
    <div className="relative w-full flex flex-col p-8 sm:p-12 lg:p-16 lg:px-36 border-t border-t-white/30 overflow-hidden"
      style={{ minHeight: "calc(100vh - 57px)" }}>
      <CpuBackground />

      <div className="relative z-10 flex flex-col gap-1">
        <h2 className="text-white text-4xl sm:text-4xl font-semibold">Contact</h2>
      </div>

      <div className="relative z-10 flex justify-center items-center flex-1 py-4">
        <Cpu />
      </div>

      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-24 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, hsla(214.737, 100%, 81.373%, 0.06) 0%, transparent 70%)", filter: "blur(16px)", zIndex: 1}}
      />
    </div>
  )
}