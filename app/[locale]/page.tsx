'use client'

import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { PresentationSection } from "@/components/presentation";
import { Topbar } from "@/components/topbar";
import { Projects } from "@/components/projects";
import { useCustomScrollbar, ScrollTrack } from "@/utils/scroll";
import { Certifications } from "@/components/certifications";
import { Contact } from "@/components/contact";

const ANIMATION_KEY = "portfolio_intro_done"
const SCROLL_KEY = "portfolio_scroll_pos"

export default function Home() {
  const [skipAnimation, setSkipAnimation] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const [topbarComplete, setTopbarComplete] = useState(false)
  const [presentationComplete, setPresentationComplete] = useState(false)
  const { mainRef, thumbRef, trackRef, handleScroll } = useCustomScrollbar()

  useEffect(() => {
    const seen = sessionStorage.getItem(ANIMATION_KEY) === "1"
    setSkipAnimation(seen)
    if (seen) {
      setTopbarComplete(true)
      setPresentationComplete(true)
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return

    const savedScroll = sessionStorage.getItem(SCROLL_KEY)
    if (!savedScroll) return

    sessionStorage.removeItem(SCROLL_KEY)

    const el = mainRef.current
    if (!el) return

    const target = Number(savedScroll)

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.scrollTop = 0
        gsap.to(el, {
          scrollTop: target,
          duration: 0.8,
          ease: "power3.out",
        })
      })
    })
  }, [hydrated])

  const canScroll = hydrated && topbarComplete && presentationComplete

  const handleAnimationComplete = () => {
    sessionStorage.setItem(ANIMATION_KEY, "1")
    setPresentationComplete(true)
  }

  if (!hydrated) return null

  return (
    <div className="w-screen h-screen flex flex-col">
      <Topbar skipAnimation={skipAnimation} onAnimationComplete={() => setTopbarComplete(true)} />

      <div className="relative flex-1 overflow-hidden">
        <ScrollTrack trackRef={trackRef} thumbRef={thumbRef} />

        <main ref={mainRef} onScroll={handleScroll} className={`h-full ${canScroll ? "overflow-y-scroll" : "overflow-hidden"}`} style={{ scrollbarWidth: "none" }}>
          <style>{`main::-webkit-scrollbar { display: none; }`}</style>

          <PresentationSection startAnimation={topbarComplete} skipAnimation={skipAnimation} onAnimationComplete={handleAnimationComplete} />
          <Projects />
          <Certifications />
          <Contact />
        </main>
      </div>
    </div>
  )
}