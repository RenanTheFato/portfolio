'use client'

import { createContext, useContext, RefObject } from "react";
import { gsap } from "gsap";

interface ScrollNavCtx {
  scrollToSection: (id: string) => void
  scrollToTop: () => void
}

const ScrollNavContext = createContext<ScrollNavCtx>({
  scrollToSection: () => {},
  scrollToTop: () => {},
})

export function ScrollNavProvider({
  mainRef,
  children,
}: {
  mainRef: RefObject<HTMLElement | null>
  children: React.ReactNode
}) {
  const scrollToSection = (id: string) => {
    const el = mainRef.current
    const target = document.getElementById(id)
    if (!el || !target) return

    gsap.to(el, {
      scrollTop: target.offsetTop,
      duration: 0.8,
      ease: "power3.out",
      overwrite: true,
    })
  }

  const scrollToTop = () => {
    const el = mainRef.current
    if (!el) return

    gsap.to(el, {
      scrollTop: 0,
      duration: 0.8,
      ease: "power3.out",
      overwrite: true,
    })
  }

  return (
    <ScrollNavContext.Provider value={{ scrollToSection, scrollToTop }}>
      {children}
    </ScrollNavContext.Provider>
  )
}

export const useScrollNav = () => useContext(ScrollNavContext)