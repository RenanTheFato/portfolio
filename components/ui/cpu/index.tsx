import { CpuDie } from "./cpu-die";
import { CpuPin } from "./cpu-pin";

export function Cpu() {
  return (
    <div
      className="relative inline-flex items-center rounded-sm"
      style={{ background: "linear-gradient(145deg, #2e2e2e 0%, #1e1e1e 40%, #252525 100%)", border: "1px solid rgba(255,255,255,0.09)",
        boxShadow: `0 24px 80px rgba(0,0,0,0.9), 0 8px 24px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.5)`,
        padding: "28px 0",
      }}
    >
      <div className="pl-5 pr-1">
        <CpuPin side="left" />
      </div>

      <div className="px-6">
        <CpuDie />
      </div>

      <div className="pr-5 pl-1">
        <CpuPin side="right" />
      </div>

      <div className="absolute -top-px left-1/2 -translate-x-1/2 px-3 py-1 rounded-b-sm"
        style={{ background: "hsla(0, 0%, 100%, 0.04)", border: "1px solid hsla(0, 0%, 100%, 0.08)", borderTop: "none"}}
      >
        <span className="font-brains text-[10px] text-white/20 tracking-[0.2em]">RENAN SANTANA</span>
      </div>
    </div>
  )
}