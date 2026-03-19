'use client'

import { SiGithub, SiGmail } from "@icons-pack/react-simple-icons"
import { ContactChip } from "./cpu-contact-chip"
import Linkedin from '../../../public/linkedin.svg';

const EMAIL = "renan.thefato.dev@gmail.com"

export function CpuDie() {
  return (
    <div
      className="relative flex flex-col rounded-sm w-full sm:w-auto"
      style={{
        minWidth: "clamp(260px, 35vw, 340px)",
        background: "linear-gradient(150deg, #1e1e1e 0%, #111 60%, #161616 100%)",
        border: "1px solid hsla(0, 0%, 100%, 0.11)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.7)",
        padding: "1px",
      }}
    >
      <div
        className="relative rounded-sm flex flex-col"
        style={{
          gap: "clamp(10px, 1.5vw, 16px)",
          padding: "clamp(12px, 2vw, 20px)",
          background: "linear-gradient(160deg, #181818 0%, #0f0f0f 100%)",
          border: "1px solid hsla(0, 0%, 100%, 0.05)",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center" style={{ gap: "clamp(6px, 1vw, 12px)" }}>
            <div
              style={{
                width: "clamp(8px, 1.2vw, 12px)",
                height: "clamp(8px, 1.2vw, 12px)",
                borderRadius: "50%",
                background: "hsla(0, 0%, 100%, 0.12)",
                border: "1px solid hsla(0, 0%, 100%, 0.18)",
                boxShadow: "inset 0 1px 0 hsla(0, 0%, 100%, 0.1)",
                flexShrink: 0,
              }}
            />
            <span
              className="font-brains text-white/25 uppercase"
              style={{ fontSize: "clamp(8px, 0.9vw, 11px)", letterSpacing: "clamp(0.1em, 0.2vw, 0.22em)" }}
            >
              RS-COMM-01
            </span>
          </div>
          <div className="flex items-center" style={{ gap: "clamp(4px, 0.8vw, 8px)" }}>
            <span className="relative flex" style={{ width: "clamp(6px, 0.8vw, 8px)", height: "clamp(6px, 0.8vw, 8px)" }}>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-35" />
              <span className="relative inline-flex rounded-full h-full w-full bg-green-500" />
            </span>
            <span
              className="font-brains text-white/20 tracking-widest"
              style={{ fontSize: "clamp(8px, 0.9vw, 11px)" }}
            >
              ACTIVE
            </span>
          </div>
        </div>

        <div className="h-px" style={{ background: "hsla(0, 0%, 100%, 0.05)" }} />

        <div className="flex flex-col" style={{ gap: "clamp(6px, 1vw, 10px)" }}>
          <ContactChip
            label="GITHUB"
            value="RenanTheFato"
            href="https://github.com/RenanTheFato"
            icon={SiGithub}
            color="#cccccc"
            accentBg="rgba(255,255,255,0.025)"
            accentBorder="rgba(255,255,255,0.09)"
          />
          <ContactChip
            label="LINKEDIN"
            value="renan-santana007"
            href="https://www.linkedin.com/in/renan-santana007"
            icon={Linkedin}
            color="#0A66C2"
            isSvg
            accentBg="rgba(10,102,194,0.07)"
            accentBorder="rgba(10,102,194,0.22)"
          />
          <ContactChip
            label="EMAIL"
            value={EMAIL}
            href={`mailto:${EMAIL}`}
            icon={SiGmail}
            color="#EA4335"
            accentBg="rgba(234,67,53,0.07)"
            accentBorder="rgba(234,67,53,0.22)"
            copyable
          />
        </div>

        <div className="h-px" style={{ background: "hsla(0, 0%, 100%, 0.05)" }} />

        <div className="flex items-center justify-between">
          <span
            className="font-brains text-white/15"
            style={{ fontSize: "clamp(8px, 0.9vw, 10px)", letterSpacing: "clamp(0.1em, 0.18vw, 0.2em)" }}
          >
            3 I/O PINS
          </span>
          <span
            className="font-brains text-white/15"
            style={{ fontSize: "clamp(8px, 0.9vw, 10px)", letterSpacing: "clamp(0.1em, 0.18vw, 0.2em)" }}
          >
            REV 1.0
          </span>
        </div>
      </div>
    </div>
  )
}