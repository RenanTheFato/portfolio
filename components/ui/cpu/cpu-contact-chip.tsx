'use client'
import { ContactChipProps } from "@/types/contatct-chip"
import { CopyButton } from "../copy-button"
import Image from "next/image"

export function ContactChip({ label, value, href, icon: Icon, isSvg, color, accentBg, accentBorder, copyable }: ContactChipProps) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="group relative flex items-center rounded transition-all duration-200 hover:brightness-110"
      style={{
        gap: "clamp(8px, 1.5vw, 16px)",
        paddingLeft: "clamp(10px, 2vw, 20px)",
        paddingRight: "clamp(10px, 2vw, 20px)",
        paddingTop: "clamp(8px, 1.2vw, 14px)",
        paddingBottom: "clamp(8px, 1.2vw, 14px)",
        background: accentBg,
        border: `1px solid ${accentBorder}`,
      }}
    >
      <span
        className="rounded-full shrink-0"
        style={{
          width: "clamp(5px, 0.7vw, 8px)",
          height: "clamp(5px, 0.7vw, 8px)",
          background: color,
          boxShadow: `0 0 7px ${color}99`,
        }}
      />
      {isSvg ? (
        <Image
          src={Icon as string}
          alt={label}
          width={16}
          height={16}
          className="shrink-0"
          style={{
            width: "clamp(12px, 1.4vw, 18px)",
            height: "clamp(12px, 1.4vw, 18px)",
            filter: "brightness(0) invert(1)",
          }}
        />
      ) : (
        <Icon
          className="shrink-0"
          style={{
            color,
            width: "clamp(12px, 1.4vw, 18px)",
            height: "clamp(12px, 1.4vw, 18px)",
          }}
        />
      )}
      <div className="flex flex-col min-w-0 flex-1" style={{ gap: "clamp(2px, 0.4vw, 4px)" }}>
        <span
          className="font-brains text-white/25 leading-none tracking-widest"
          style={{ fontSize: "clamp(8px, 0.8vw, 10px)" }}
        >
          {label}
        </span>
        <span
          className="font-brains text-white/80 truncate leading-none"
          style={{ fontSize: "clamp(10px, 1.1vw, 14px)" }}
        >
          {value}
        </span>
      </div>
      {copyable ? (
        <CopyButton email={value} />
      ) : (
        <svg
          viewBox="0 0 10 10"
          fill="none"
          className="shrink-0 text-white/20 group-hover:text-white/45 transition-colors"
          style={{ width: "clamp(8px, 1vw, 12px)", height: "clamp(8px, 1vw, 12px)" }}
        >
          <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </a>
  )
}