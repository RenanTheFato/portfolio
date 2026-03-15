'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { certifications } from "@/data/certifications"
import { CertificationData } from "@/types/certification-data"
import Image from "next/image"

function TrophyCard({ cert, index }: { cert: CertificationData; index: number }) {
  const router = useRouter()
  const [hovered, setHovered] = useState(false)

  return (
    <div className="group relative flex flex-col items-center cursor-pointer select-none" style={{ animationDelay: `${index * 80}ms` }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => router.push(`/certificates/${cert.credential_id}`)}
    >
      <div className="absolute top-0 w-full h-32 rounded-full blur-3xl transition-all duration-500 pointer-events-none"
        style={{ background: hovered ? "radial-gradient(circle, rgba(212,175,55,0.25) 0%, transparent 70%)" : "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)" }} 
      />

      <div className="relative transition-transform duration-300 ease-out"
        style={{ width: "360px", aspectRatio: "16 / 9", transform: hovered ? "translateY(-6px) scale(1.03)" : "translateY(0) scale(1)" }}
      >
        <div
          className="relative w-full h-full rounded overflow-hidden border border-white/10"
          style={{ boxShadow: hovered ? "0 0 32px 4px rgba(212,175,55,0.22), 0 12px 40px rgba(0,0,0,0.8)" : "0 4px 24px rgba(0,0,0,0.6)",
            background: "#0d0d0d" }}
        >
          {cert.source ? (
            <Image
              src={`/${cert.source}`}
              alt={cert.name}
              fill
              sizes="360px"
              quality={95}
              className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-yellow-400/40 flex items-center justify-center bg-white/5">
                {cert.organization_image ? (
                  <Image
                    src={`/${cert.organization_image}`}
                    alt={cert.issuing_organization}
                    width={64}
                    height={64}
                    quality={95}
                    className="object-contain"
                  />
                ) : (
                  <span className="text-yellow-400 text-xl font-bold">{cert.issuing_organization[0]}</span>
                )}
              </div>
              <span className="text-white/60 text-base text-center leading-tight font-mono">{cert.name}</span>
            </div>
          )}

          <div className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
            style={{ opacity: hovered ? 1 : 0, background: "linear-gradient(135deg, rgba(212,175,55,0.10) 0%, transparent 60%, rgba(212,175,55,0.05) 100%)"}}
          />
        </div>

        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-20 h-0.75 rounded-full"
          style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)" }}
        />
      </div>

      <div className="w-0.5 h-5 bg-linear-to-b from-white/20 to-transparent" />

      <div className="mt-2 flex flex-col items-center gap-2 text-center" style={{ width: "360px" }}>
        <div className="w-12 h-12 rounded-full overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
          {cert.organization_image ? (
            <Image
              src={`/${cert.organization_image}`}
              alt={cert.issuing_organization}
              width={48}
              height={48}
              quality={95}
              className="object-contain"
            />
          ) : (
            <span className="text-white/50 text-base font-bold">{cert.issuing_organization[0]}</span>
          )}
        </div>

        <span className="text-white/85 text-lg font-semibold leading-tight transition-colors duration-200 group-hover:text-yellow-300">
          {cert.name}
        </span>

        <span className="text-white/40 text-sm uppercase tracking-widest">{cert.issuing_organization}</span>
      </div>
    </div>
  )
}

export function Certifications() {
  return (
    <div className="relative w-full flex flex-col p-4 sm:p-6 lg:p-8 lg:px-24 gap-8 bg-black border-t border-t-white/30 overflow-hidden" style={{ minHeight: 'calc(100vh - 57px)' }}>

      <div className="flex flex-col gap-1">
        <h2 className="text-white text-4xl sm:text-4xl font-semibold">
          Certifications
        </h2>
      </div>

      <div className="relative flex flex-col">

        <div className="flex flex-wrap gap-10 sm:gap-16 items-end pb-5 px-2">
          {certifications.map((cert, i) => (
            <TrophyCard key={cert.credential_id} cert={cert} index={i} />
          ))}
        </div>

        <div className="w-full h-1.5 rounded-sm"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 100%)", boxShadow: "0 4px 24px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.10)"}}
        />

        <div className="w-full h-6 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, transparent 100%)" }} />

        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2/3 h-2 pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(212,175,55,0.10) 0%, transparent 70%)", filter: "blur(10px)" }}
        />
      </div>
    </div>
  )
}