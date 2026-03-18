'use client'

import { SiGithub, SiGmail } from "@icons-pack/react-simple-icons"
import { ContactChip } from "./cpu-contact-chip"
import Linkedin from '../../../public/linkedin.svg';

const EMAIL = "renan.thefato.dev@gmail.com"

export function CpuDie() {
  return (
    <div
      className="relative flex flex-col rounded-sm w-full sm:w-auto sm:min-w-85"
      style={{
        background: "linear-gradient(150deg, #1e1e1e 0%, #111 60%, #161616 100%)",
        border: "1px solid hsla(0, 0%, 100%, 0.11)",
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.7)`,
        padding: "1px",
      }}
    >
      <div
        className="relative rounded-sm flex flex-col gap-3 sm:gap-4 p-4 sm:p-5"
        style={{
          background: "linear-gradient(160deg, #181818 0%, #0f0f0f 100%)",
          border: "1px solid hsla(0, 0%, 100%, 0.05)",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
              style={{
                background: "hsla(0, 0%, 100%, 0.12)",
                border: "1px solid hsla(0, 0%, 100%, 0.18)",
                boxShadow: "inset 0 1px 0 hsla(0, 0%, 100%, 0.1)",
              }}
            />
            <span className="font-brains text-[9px] sm:text-xs text-white/25 tracking-[0.15em] sm:tracking-[0.2em] uppercase">
              RS-COMM-01
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-35" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="font-brains text-[9px] sm:text-xs text-white/20 tracking-widest">ACTIVE</span>
          </div>
        </div>

        <div className="h-px" style={{ background: "hsla(0, 0%, 100%, 0.05)" }} />

        <div className="flex flex-col gap-2 sm:gap-2.5">
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
          <span className="font-brains text-[9px] sm:text-[10px] text-white/15 tracking-[0.15em] sm:tracking-[0.18em]">
            3 I/O PINS
          </span>
          <span className="font-brains text-[9px] sm:text-[10px] text-white/15 tracking-[0.15em] sm:tracking-[0.18em]">
            REV 1.0
          </span>
        </div>
      </div>
    </div>
  )
}