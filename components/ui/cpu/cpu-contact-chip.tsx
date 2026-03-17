import { ContactChipProps } from "@/types/contatct-chip"
import { CopyButton } from "../copy-button"


export function ContactChip({ label, value, href, icon: Icon, color, accentBg, accentBorder, copyable}: ContactChipProps) {
  return (
    <a href={href} target={href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer"
      className="group relative flex items-center gap-4 px-5 py-4 rounded transition-all duration-200 hover:brightness-110"
      style={{ background: accentBg, border: `1px solid ${accentBorder}`}}
    >
      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color, boxShadow: `0 0 7px ${color}99` }} />

      <Icon size={18} style={{ color }} className="shrink-0" />

      <div className="flex flex-col min-w-0 flex-1 gap-1">
        <span className="font-brains text-[10px] text-white/25 leading-none tracking-widest">{label}</span>
        <span className="font-brains text-sm text-white/80 truncate leading-none">{value}</span>
      </div>

      {copyable ? (
        <CopyButton email={value} />
      ) : (
        <svg viewBox="0 0 10 10" fill="none" className="w-3 h-3 shrink-0 text-white/20 group-hover:text-white/45 transition-colors ml-1">
          <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </a>
  )
}