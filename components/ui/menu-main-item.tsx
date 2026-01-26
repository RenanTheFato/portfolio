import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";

interface MenuItemProps {
  label: string
}

export function MenuItem({ label }: MenuItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)
  const solidBgRef = useRef<HTMLDivElement>(null)
  const pixelColumnsRef = useRef<HTMLDivElement[]>([])
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useLayoutEffect(() => {
    const timeline = gsap.timeline({ paused: true })
    timelineRef.current = timeline

    timeline.to(
      solidBgRef.current,
      {
        scaleX: 1,
        duration: 0.8,
        ease: "power2.inOut"
      },
      0
    )

    pixelColumnsRef.current.forEach((col, idx) => {
      timeline.to(
        col,
        {
          scaleY: 1,
          duration: 0.15,
          ease: "power2.inOut",
        },
        idx * 0.03
      )
    })

    return () => { timeline.kill() }
  }, [])

  function handleMouseEnter() {
    if (timelineRef.current) {
      timelineRef.current.play()
    }
  }

  function handleMouseLeave() {
    if (timelineRef.current) {
      timelineRef.current.reverse()
    }
  }

  function createPixelColumns() {
    const col = []
    const numCols = 16

    for (let colItem = 0; colItem < numCols; colItem++) {
      col.push(
        <div key={colItem} ref={(element) => {
          if (element) {
            pixelColumnsRef.current[colItem] = element
          }
        }}
          className="w-full h-full bg-white opacity-100"
          style={{
            transform: 'scaleY(0)', transformOrigin: 'bottom'
          }}
        />
      )
    }
    return col
  }

  return (
    <div ref={itemRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
      className="relative px-2 py-4 border border-white rounded-sm cursor-pointer overflow-hidden"
    >
      <div ref={solidBgRef} className="absolute inset-0 bg-white" style={{ transform: 'scaleX(0)', transformOrigin: 'left' }} />

      <div className="absolute inset-0 grid gap-0.5" style={{ gridTemplateColumns: `repeat(16, minmax(0, 1fr))`, gridTemplateRows: '1fr' }}>
        {createPixelColumns()}
      </div>

      <p className="relative z-10 mix-blend-difference">{label}</p>
    </div>
  )
}