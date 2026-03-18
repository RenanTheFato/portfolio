import { ContactChipProps } from "@/types/contatct-chip"
import { CopyButton } from "../copy-button"
import Image from "next/image"

export function ContactChip({ label, value, href, icon: Icon, isSvg, color, accentBg, accentBorder, copyable }: ContactChipProps) {
  return (
    <a href={href} target={href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer"
      className="group relative flex items-center gap-3 sm:gap-4 px-3.5 sm:px-5 py-3 sm:py-4 rounded transition-all duration-200 hover:brightness-110"
      style={{ background: accentBg, border: `1px solid ${accentBorder}` }}
    >
      <span
        className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0"
        style={{ background: color, boxShadow: `0 0 7px ${color}99` }}
      />

      {isSvg ? (
        <Image src={Icon as string} alt={label} width={16} height={16} className="shrink-0 sm:w-4.5 sm:h-4.5" style={{ filter: "brightness(0) invert(1)" }}/>
      ) : (
        <Icon size={16} style={{ color }} className="shrink-0 sm:!w-4.5! sm:!h-4.5!" />
      )}

      <div className="flex flex-col min-w-0 flex-1 gap-0.5 sm:gap-1">
        <span className="font-brains text-[9px] sm:text-[10px] text-white/25 leading-none tracking-widest">
          {label}
        </span>
        <span className="font-brains text-xs sm:text-sm text-white/80 truncate leading-none">
          {value}
        </span>
      </div>

      {copyable ? (
        <CopyButton email={value} />
      ) : (
        <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0 text-white/20 group-hover:text-white/45 transition-colors ml-1">
          <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </a>
  )
}