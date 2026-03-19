'use client'

import { certifications } from "@/data/certifications"
import { TrophyCard } from "../ui/card"
import { useTranslations } from "next-intl"

export function Certifications() {
  const t = useTranslations('certifications')

  return (
    <div className="relative w-full flex flex-col p-4 sm:p-6 lg:p-8 lg:px-24 gap-8 bg-black border-t border-t-white/30 overflow-hidden" style={{ minHeight: 'calc(100vh - 57px)' }}>

      <div className="flex flex-col gap-1">
        <h2 className="text-white text-4xl sm:text-4xl font-semibold">
          {t('title')}
        </h2>
      </div>

      <div className="relative flex flex-col">
        <div className="flex justify-between flex-wrap gap-10 sm:gap-16 items-end pb-5 px-2">
          {certifications.map((cert, i) => (
            <TrophyCard key={cert.credential_id} cert={cert} index={i} />
          ))}
        </div>

        <div className="w-full h-1.5 rounded-sm"
          style={{ background: "linear-gradient(180deg, hsla(0, 0%, 100%, 0.14) 0%, hsla(0, 0%, 100%, 0.04) 100%)", boxShadow: "0 4px 24px hsla(0, 0%, 0%, 0.8), inset 0 1px 0 hsla(0, 0%, 100%, 0.1)" }}
        />

        <div className="w-full h-6 pointer-events-none" style={{ background: "linear-gradient(180deg, hsla(0, 0%, 0%, 0.45) 0%, transparent 100%)" }} />

        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2/3 h-2 pointer-events-none"
          style={{ background: "radial-gradient(ellipse, hsla(45.86, 64.609%, 52.353%, 0.1) 0%, transparent 70%)", filter: "blur(10px)" }}
        />
      </div>
    </div>
  )
}