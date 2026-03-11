'use client'

import { useRef, useCallback, useEffect } from "react"

export function useCustomScrollbar() {
  const mainRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isScrollingRef = useRef(false)

  const updateThumb = useCallback(() => {
    const el = mainRef.current
    const thumb = thumbRef.current
    const track = trackRef.current
    if (!el || !thumb || !track) return

    const trackHeight = track.clientHeight
    const ratio = el.clientHeight / el.scrollHeight
    const thumbHeight = Math.max(ratio * trackHeight, 32)
    const maxOffset = trackHeight - thumbHeight
    const scrollRatio = el.scrollTop / (el.scrollHeight - el.clientHeight)
    const offset = scrollRatio * maxOffset

    thumb.style.height = `${thumbHeight}px`
    thumb.style.transform = `translateY(${offset}px)`
  }, [])

  const handleScroll = useCallback(() => {
    const thumb = thumbRef.current
    if (!thumb) return

    updateThumb()

    if (!isScrollingRef.current) {
      isScrollingRef.current = true
      thumb.style.width = "8px"
      thumb.style.opacity = "1"
    }

    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
    scrollTimerRef.current = setTimeout(() => {
      isScrollingRef.current = false
      if (thumb) {
        thumb.style.width = "4px"
        thumb.style.opacity = "0.5"
      }
    }, 800)
  }, [updateThumb])

  useEffect(() => {
    updateThumb()
    window.addEventListener("resize", updateThumb)
    return () => window.removeEventListener("resize", updateThumb)
  }, [updateThumb])

  return { mainRef, thumbRef, trackRef, handleScroll }
}

export function ScrollTrack({ trackRef, thumbRef }: {
  trackRef: React.RefObject<HTMLDivElement | null>
  thumbRef: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <div
      ref={trackRef}
      className="absolute right-1 top-1 bottom-1 w-2 z-50 flex justify-center"
      style={{ pointerEvents: "none" }}
    >
      <div
        ref={thumbRef}
        style={{
          width: "4px",
          opacity: 0.5,
          background: "linear-gradient(180deg, #60a5fa, #3178C6)",
          borderRadius: "999px",
          position: "absolute",
          top: 0,
          transition: "width 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.35s ease, height 0.1s ease",
          boxShadow: "0 0 6px rgba(96, 165, 250, 0.5)",
        }}
      />
    </div>
  )
}