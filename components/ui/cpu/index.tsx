'use client'

import { CpuDie } from "./cpu-die";
import { CpuPin } from "./cpu-pin";

export function Cpu() {
  return (
    <div className="relative inline-flex items-center rounded-sm w-full sm:w-auto max-w-full"
      style={{ background: "linear-gradient(145deg, #2e2e2e 0%, #1e1e1e 40%, #252525 100%)", border: "1px solid rgba(255,255,255,0.09)",
        boxShadow: `0 24px 80px rgba(0,0,0,0.9), 0 8px 24px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.5)`,
        padding: "16px 0",
      }}
    >
      <div className="pl-2 pr-0.5 sm:pl-5 sm:pr-1 shrink-0">
        <CpuPin side="left" />
      </div>

      <div className="px-2 sm:px-6 flex-1 sm:flex-none min-w-0">
        <CpuDie />
      </div>

      <div className="pr-2 pl-0.5 sm:pr-5 sm:pl-1 shrink-0">
        <CpuPin side="right" />
      </div>

      <div className="absolute -top-px left-1/2 -translate-x-1/2 px-2 sm:px-3 py-1 rounded-b-sm whitespace-nowrap"
        style={{ background: "hsla(0, 0%, 100%, 0.04)", border: "1px solid hsla(0, 0%, 100%, 0.08)", borderTop: "none"}}
      >
        <span className="font-brains text-[9px] sm:text-[10px] text-white/20 tracking-[0.15em] sm:tracking-[0.2em]">
          RENAN SANTANA
        </span>
      </div>
    </div>
  )
}