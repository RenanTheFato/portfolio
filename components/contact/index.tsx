'use client'

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { CpuBackground } from "../ui/cpu/cpu-background"
import { Cpu } from "../ui/cpu"
import { useTranslations } from "next-intl"

const CONTACT_ANIM_KEY = "portfolio_contact_anim_done"

const HACK_CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF<>[]{}|/\\!@#$%^&*"

function randomChar() {
  return HACK_CHARS[Math.floor(Math.random() * HACK_CHARS.length)]
}

function createThunder(container: HTMLDivElement) {
  const cols = Math.floor(container.clientWidth / 18)
  const rows = Math.floor(container.clientHeight / 22)
  const total = cols * rows

  const canvas = document.createElement("div")
  canvas.style.cssText = `
    position: absolute;
    inset: 0;
    z-index: 35;
    display: grid;
    grid-template-columns: repeat(${cols}, 18px);
    grid-template-rows: repeat(${rows}, 22px);
    overflow: hidden;
    pointer-events: none;
  `

  const cells: HTMLSpanElement[] = []

  for (let i = 0; i < total; i++) {
    const span = document.createElement("span")
    span.textContent = randomChar()
    span.style.cssText = `
      font-family: monospace;
      font-size: 13px;
      color: hsl(210, 100%, 55%);
      opacity: 0;
      text-align: center;
      line-height: 22px;
      text-shadow: 0 0 8px hsl(210, 100%, 70%), 0 0 20px hsl(210, 100%, 50%);
    `
    canvas.appendChild(span)
    cells.push(span)
  }

  container.appendChild(canvas)
  return { canvas, cells, cols, rows }
}

export function Contact() {
  const t = useTranslations('contact')
  const containerRef = useRef<HTMLDivElement>(null)
  const blackoutRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cpuRef = useRef<HTMLDivElement>(null)
  const [animDone, setAnimDone] = useState(false)
  const [skip, setSkip] = useState(false)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const seen = sessionStorage.getItem(CONTACT_ANIM_KEY) === "1"
    setSkip(seen)
    setAnimDone(true)
  }, [])

  useEffect(() => {
    if (!animDone) return

    const container = containerRef.current
    const blackout = blackoutRef.current
    const title = titleRef.current
    const cpu = cpuRef.current
    if (!container || !blackout || !title || !cpu) return

    if (skip) {
      gsap.set(blackout, { opacity: 0, pointerEvents: "none" })
      gsap.set([title, cpu], { opacity: 1, y: 0 })
      return
    }

    gsap.set(blackout, { opacity: 1 })
    gsap.set([title, cpu], { opacity: 0, y: 20 })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasAnimated.current) return

          hasAnimated.current = true
          observer.disconnect()
          sessionStorage.setItem(CONTACT_ANIM_KEY, "1")

          const { canvas, cells, cols, rows } = createThunder(container)

          const tl = gsap.timeline()

          tl.to({}, { duration: 0.4 })

          .call(() => {
            const colDelays: number[] = []
            for (let c = 0; c < cols; c++) {
              colDelays.push(Math.random() * 0.8)
            }

            for (let c = 0; c < cols; c++) {
              for (let r = 0; r < rows; r++) {
                const idx = r * cols + c
                const cell = cells[idx]
                const delay = colDelays[c] + r * 0.03

                gsap.to(cell, {
                  opacity: 1,
                  duration: 0.05,
                  delay,
                  onStart: () => {
                    const flicker = setInterval(() => {
                      cell.textContent = randomChar()
                    }, 60)
                    setTimeout(() => clearInterval(flicker), 400)
                  },
                })
              }
            }
          })

          .to({}, { duration: 1.6 })

          .call(() => {
            gsap.to(blackout, {
              backgroundColor: "hsl(210, 100%, 18%)",
              duration: 0.06,
              yoyo: true,
              repeat: 3,
              ease: "none",
            })
          })

          .to({}, { duration: 0.3 })

          .call(() => {
            for (let r = rows - 1; r >= 0; r--) {
              for (let c = 0; c < cols; c++) {
                const idx = r * cols + c
                gsap.to(cells[idx], {
                  opacity: 0,
                  duration: 0.1,
                  delay: (rows - 1 - r) * 0.04 + Math.random() * 0.05,
                })
              }
            }
          })

          .to(blackout, {
            opacity: 0,
            duration: 1.4,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(blackout, { pointerEvents: "none" })
              canvas.remove()
            },
          }, "+=0.1")

          .to(title, {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power2.out",
          }, "-=1.0")

          .to(cpu, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
          }, "-=0.7")
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [animDone, skip])

  if (!animDone) return null

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col p-6 sm:p-12 lg:p-16 lg:px-36 border-t border-t-white/30 overflow-hidden"
      style={{ minHeight: "calc(100vh - 57px)" }}
    >
      <div
        ref={blackoutRef}
        className="absolute inset-0 z-30 pointer-events-none"
        style={{ background: "hsl(0, 0%, 0%)" }}
      />

      <CpuBackground />

      <div ref={titleRef} className="relative z-10 flex flex-col gap-1" style={{ opacity: 0 }}>
        <h2 className="text-white text-3xl sm:text-4xl font-semibold">{t('title')}</h2>
      </div>

      <div
        ref={cpuRef}
        className="relative z-10 flex justify-center items-center flex-1 py-6 sm:py-4 px-0"
        style={{ opacity: 0 }}
      >
        <div className="w-full sm:w-auto overflow-x-auto">
          <Cpu />
        </div>
      </div>

      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-24 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, hsla(214.737, 100%, 81.373%, 0.06) 0%, transparent 70%)",
          filter: "blur(16px)",
          zIndex: 1,
        }}
      />
    </div>
  )
}