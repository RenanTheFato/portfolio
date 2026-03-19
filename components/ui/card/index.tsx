'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CertificationData } from "@/types/certification-data"
import Image from "next/image"

export function TrophyCard({ cert, index }: { cert: CertificationData; index: number }) {
  const router = useRouter()
  const [hovered, setHovered] = useState(false)

  return (
    <div className="group relative flex flex-col items-center cursor-pointer select-none" style={{ animationDelay: `${index * 80}ms` }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => router.push(`/certificates/${cert.credential_id}`)}
    >
      <div className="absolute top-0 w-full h-32 rounded-full blur-3xl transition-all duration-500 pointer-events-none"
        style={{ background: hovered ? "radial-gradient(circle, hsla(45.86, 64.609%, 52.353%, 0.25) 0%, transparent 70%)" : "radial-gradient(circle, hsla(45.86, 64.609%, 52.353%, 0.06) 0%, transparent 70%)" }} 
      />

      <div className="relative transition-transform duration-300 ease-out"
        style={{ width: "360px", aspectRatio: "16 / 9", transform: hovered ? "translateY(-6px) scale(1.03)" : "translateY(0) scale(1)" }}
      >
        <div className="relative w-full h-full rounded overflow-hidden border border-white/10"
          style={{ boxShadow: hovered ? "0 0 2rem 0.25rem hsla(46, 64%, 52%, 0.22), 0 0.75rem 2.5rem hsla(0, 0%, 0%, 0.8)" : "0 0.25rem 1.5rem hsla(0, 0%, 0%, 0.6)",
            background: "hsl(0, 0%, 5%)" }}
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
            style={{ opacity: hovered ? 1 : 0, background: "linear-gradient(135deg, hsla(45.86, 64.609%, 52.353%, 0.1) 0%, transparent 60%, hsla(45.86, 64.609%, 52.353%, 0.05) 100%)"}}
          />
        </div>

        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-20 h-0.75 rounded-full"
          style={{ background: "linear-gradient(90deg, transparent, hsla(45.86, 64.609%, 52.353%, 0.5), transparent)" }}
        />
      </div>

      <div className="w-0.5 h-5 bg-linear-to-b from-white/20 to-transparent" />

      <div className="mt-2 flex flex-row items-center gap-3" style={{ width: "360px" }}>
        <div className="shrink-0 w-16 h-16 flex items-center justify-center">
          {cert.organization_image ? (
            <Image
              src={`/${cert.organization_image}`}
              alt={cert.issuing_organization}
              width={64}
              height={64}
              quality={100}
              className="object-contain"
            />
          ) : (
            <span className="text-white/50 text-base font-bold">{cert.issuing_organization[0]}</span>
          )}
        </div>

        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-white/85 text-lg text-wrap font-semibold leading-tight transition-colors duration-200 group-hover:text-yellow-300 truncate">
            {cert.name}
          </span>
          <span className="text-white/60 text-sm uppercase tracking-widest truncate">{cert.issuing_organization}</span>
        </div>
      </div>
    </div>
  )
}