'use client'

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { certifications } from "@/data/certifications"
import { TrophyCard } from "../ui/card"
import { useTranslations } from "next-intl"

const CERTS_ANIM_KEY = "portfolio_certs_anim_done"

export function Certifications() {
  const t = useTranslations('certifications')
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsWrapperRef = useRef<HTMLDivElement>(null)
  const [animDone, setAnimDone] = useState(false)
  const [skip, setSkip] = useState(false)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const seen = sessionStorage.getItem(CERTS_ANIM_KEY) === "1"
    setSkip(seen)
    setAnimDone(true)
  }, [])

  useEffect(() => {
    if (!animDone) return

    const container = containerRef.current
    const wrapper = cardsWrapperRef.current
    const title = titleRef.current
    if (!container || !wrapper || !title) return

    const cardEls = Array.from(wrapper.querySelectorAll('.cert-card'))

    if (skip) {
      gsap.set(title, { opacity: 1, y: 0 })
      cardEls.forEach((card) => {
        gsap.set(card, { opacity: 1 })
        gsap.set(card.querySelectorAll('.cert-spotlight'), { opacity: 0 })
        gsap.set(card.querySelector('.cert-shadow'), { opacity: 0 })
      })
      return
    }

    gsap.set(title, { opacity: 0, y: 20 })
    cardEls.forEach((card) => {
      gsap.set(card, { opacity: 0 })
      gsap.set(card.querySelectorAll('.cert-spotlight'), { opacity: 0 })
      gsap.set(card.querySelector('.cert-shadow'), { opacity: 1 })
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasAnimated.current) return

          hasAnimated.current = true
          observer.disconnect()
          sessionStorage.setItem(CERTS_ANIM_KEY, "1")

          const tl = gsap.timeline()

          tl.to(title, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          })
          
          cardEls.forEach((card, i) => {
            const spotlights = card.querySelectorAll('.cert-spotlight')
            const shadow = card.querySelector('.cert-shadow')
            const offset = i === 0 ? "+=0.4" : "+=0.2"

            tl.to(card, { opacity: 1, duration: 0.01 }, offset)
              .to(spotlights, {
                opacity: 1,
                duration: 1.4,
                ease: "power1.inOut",
                stagger: 0.1,
              }, "<")
              .to(shadow, {
                opacity: 0,
                duration: 1.2,
                ease: "power2.inOut",
              }, "<+=0.6")
          })

          tl.to({}, { duration: 2 })

          cardEls.forEach((card) => {
            const spotlights = card.querySelectorAll('.cert-spotlight')
            tl.to(spotlights, {
              opacity: 0,
              duration: 0.35,
              ease: "power2.inOut",
            }, "+=0.08")
          })
        })
      },
      { threshold: 0.4 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [animDone, skip])

  if (!animDone) return null

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col p-4 sm:p-6 lg:p-8 lg:px-24 gap-8 bg-black border-t border-t-white/30 overflow-hidden"
      style={{ minHeight: 'calc(100vh - 57px)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at 50% 60%, transparent 30%, hsla(0,0%,0%,0.7) 100%)",
        }}
      />

      <div ref={titleRef} className="relative z-10 flex flex-col gap-1" style={{ opacity: 0 }}>
        <h2 className="text-white text-4xl sm:text-4xl font-semibold">
          {t('title')}
        </h2>
      </div>

      <div className="relative flex flex-col z-10">
        <div
          ref={cardsWrapperRef}
          className="flex justify-between flex-wrap gap-10 sm:gap-16 items-end pb-5 px-2"
        >
          {certifications.map((cert, i) => (
            <div key={cert.credential_id} className="cert-card relative" style={{ opacity: 0 }}>

              {/* Holofote principal — cone largo */}
              <div
                className="cert-spotlight absolute -top-36 left-1/2 -translate-x-1/2 pointer-events-none z-10"
                style={{
                  width: "300px",
                  height: "340px",
                  background: "radial-gradient(ellipse at 50% 0%, hsla(45, 90%, 65%, 0.28) 0%, hsla(45, 80%, 55%, 0.1) 40%, transparent 70%)",
                  filter: "blur(10px)",
                  opacity: 0,
                  clipPath: "polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)",
                }}
              />

              {/* Feixe central estreito */}
              <div
                className="cert-spotlight absolute -top-28 left-1/2 -translate-x-1/2 pointer-events-none z-10"
                style={{
                  width: "50px",
                  height: "260px",
                  background: "linear-gradient(180deg, hsla(45, 95%, 75%, 0.35) 0%, hsla(45, 80%, 60%, 0.08) 70%, transparent 100%)",
                  filter: "blur(8px)",
                  opacity: 0,
                  clipPath: "polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)",
                }}
              />

              {/* Sombra cobrindo o card */}
              <div
                className="cert-shadow absolute inset-0 z-20 rounded pointer-events-none"
                style={{
                  background: "hsla(0, 0%, 0%, 0.95)",
                  backdropFilter: "blur(2px)",
                }}
              />

              {/* Reflexo no chão */}
              <div
                className="cert-spotlight absolute -bottom-3 left-1/2 -translate-x-1/2 pointer-events-none z-10"
                style={{
                  width: "220px",
                  height: "28px",
                  background: "radial-gradient(ellipse, hsla(45, 80%, 65%, 0.25) 0%, transparent 70%)",
                  filter: "blur(8px)",
                  opacity: 0,
                }}
              />

              <TrophyCard cert={cert} index={i} />
            </div>
          ))}
        </div>

        <div
          className="w-full h-1.5 rounded-sm"
          style={{
            background: "linear-gradient(180deg, hsla(0, 0%, 100%, 0.14) 0%, hsla(0, 0%, 100%, 0.04) 100%)",
            boxShadow: "0 4px 24px hsla(0, 0%, 0%, 0.8), inset 0 1px 0 hsla(0, 0%, 100%, 0.1)",
          }}
        />

        <div
          className="w-full h-6 pointer-events-none"
          style={{ background: "linear-gradient(180deg, hsla(0, 0%, 0%, 0.45) 0%, transparent 100%)" }}
        />

        <div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2/3 h-2 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, hsla(45.86, 64.609%, 52.353%, 0.1) 0%, transparent 70%)",
            filter: "blur(10px)",
          }}
        />
      </div>
    </div>
  )
}