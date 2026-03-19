'use client'

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Window } from "../ui/window"
import { Visualizer } from "../ui/visualizer"
import { ProjectProvider } from "@/contexts/project-context"

const PROJECTS_ANIM_KEY = "portfolio_projects_anim_done"

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lidRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [animDone, setAnimDone] = useState(false)
  const [skip, setSkip] = useState(false)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const seen = sessionStorage.getItem(PROJECTS_ANIM_KEY) === "1"
    setSkip(seen)
    setAnimDone(true)
  }, [])

  useEffect(() => {
    if (!animDone) return

    const el = containerRef.current
    const lid = lidRef.current
    const content = contentRef.current
    if (!el || !lid || !content) return

    if (skip) {
      gsap.set(lid, { scaleY: 0, opacity: 0 })
      gsap.set(content, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" })
      gsap.set(content.querySelectorAll('.fade-window, .fade-visualizer'), { opacity: 1, y: 0 })
      return
    }

    gsap.set(content, { clipPath: "inset(100% 0% 0% 0%)", opacity: 1 })
    gsap.set(lid, { scaleY: 1, opacity: 1, transformOrigin: "top center" })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasAnimated.current) return

          hasAnimated.current = true
          observer.disconnect()
          sessionStorage.setItem(PROJECTS_ANIM_KEY, "1")

          const tl = gsap.timeline()

          tl.to(lid, {
            scaleY: 0,
            transformOrigin: "top center",
            duration: 1.2,
            ease: "power1.inOut",
          })
          .to({}, { duration: 0.15 })
          .to(content, {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.0,
            ease: "power2.out",
          }, "-=0.2")
          .fromTo(
            content.querySelectorAll('.fade-window, .fade-visualizer'),
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.2 },
            "-=0.5"
          )
        })
      },
      { threshold: 0.45 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [animDone, skip])

  if (!animDone) return null

  return (
    <ProjectProvider>
      <div ref={containerRef} className="relative w-full h-full bg-black border-t border-t-white/30">
        <div
          ref={lidRef}
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, hsl(213, 75%, 28%) 0%, hsl(213, 70%, 22%) 100%)",
            borderTop: "2px solid hsl(213, 80%, 45%)",
            transformOrigin: "top center",
            boxShadow: "inset 0 1px 0 hsla(213, 100%, 80%, 0.12)",
          }}
        >
          <div
            className="absolute -top-6 left-10 h-6 w-32 rounded-t-lg"
            style={{
              background: "linear-gradient(180deg, hsl(213, 75%, 32%) 0%, hsl(213, 75%, 28%) 100%)",
              border: "1px solid hsl(213, 80%, 45%)",
              borderBottom: "none",
              boxShadow: "inset 0 1px 0 hsla(213, 100%, 80%, 0.1)",
            }}
          />
          <div className="absolute top-5 left-8 right-8 flex flex-col gap-2.5">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-px"
                style={{
                  background: `hsla(213, 100%, 80%, ${0.06 - i * 0.008})`,
                  width: `${100 - i * 4}%`,
                }}
              />
            ))}
          </div>
          <div
            className="absolute top-0 left-0 right-0 h-12 pointer-events-none"
            style={{ background: "linear-gradient(180deg, hsla(213, 100%, 80%, 0.07) 0%, transparent 100%)" }}
          />
        </div>

        <div
          ref={contentRef}
          className="relative z-10 flex flex-col lg:flex-row p-4 sm:p-6 lg:p-8 lg:px-24 gap-4 sm:gap-6 lg:space-x-8 h-full overflow-hidden"
        >
          <div className="fade-window opacity-0 flex w-full lg:w-7/12 shrink-0">
            <Window />
          </div>
          <div className="fade-visualizer opacity-0 flex flex-1 min-h-0">
            <Visualizer />
          </div>
        </div>
      </div>
    </ProjectProvider>
  )
}