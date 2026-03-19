'use client'

import { CpuDie } from "./cpu-die";
import { CpuPin } from "./cpu-pin";

export function Cpu() {
  return (
    <div
      className="relative inline-flex items-center rounded-sm w-full sm:w-auto max-w-full"
      style={{
        background: "linear-gradient(145deg, #2e2e2e 0%, #1e1e1e 40%, #252525 100%)",
        border: "1px solid rgba(255,255,255,0.09)",
        boxShadow: "0 24px 80px rgba(0,0,0,0.9), 0 8px 24px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.5)",
        padding: "clamp(10px, 2vw, 20px) 0",
      }}
    >
      <div className="shrink-0" style={{ paddingLeft: "clamp(8px, 2vw, 20px)", paddingRight: "clamp(2px, 0.5vw, 4px)" }}>
        <CpuPin side="left" />
      </div>

      <div className="flex-1 sm:flex-none min-w-0" style={{ paddingLeft: "clamp(8px, 2vw, 24px)", paddingRight: "clamp(8px, 2vw, 24px)" }}>
        <CpuDie />
      </div>

      <div className="shrink-0" style={{ paddingRight: "clamp(8px, 2vw, 20px)", paddingLeft: "clamp(2px, 0.5vw, 4px)" }}>
        <CpuPin side="right" />
      </div>

      <div
        className="absolute -top-px left-1/2 -translate-x-1/2 rounded-b-sm whitespace-nowrap"
        style={{
          background: "hsla(0, 0%, 100%, 0.04)",
          border: "1px solid hsla(0, 0%, 100%, 0.08)",
          borderTop: "none",
          padding: "clamp(3px, 0.5vw, 5px) clamp(8px, 1.5vw, 12px)",
        }}
      >
        <span
          className="font-brains text-white/20 tracking-widest"
          style={{ fontSize: "clamp(8px, 1vw, 11px)", letterSpacing: "clamp(0.1em, 0.2vw, 0.25em)" }}
        >
          RENAN SANTANA
        </span>
      </div>
    </div>
  )
}