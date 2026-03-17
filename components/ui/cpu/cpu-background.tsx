'use client'

import { useEffect, useRef } from "react"

export function CpuBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    window.addEventListener("resize", resize)
    resize()

    type Segment = {
      x: number
      y: number
      length: number
      dir: "h" | "v"
      progress: number
      speed: number
      opacity: number
      active: boolean
      pulse: number
      pulseSpeed: number
    }

    const CELL = 48
    const segments: Segment[] = []

    const cols = Math.ceil(canvas.width / CELL) + 1
    const rows = Math.ceil(canvas.height / CELL) + 1

    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        const r = Math.random()
        if (r < 0.18) {
          const len = (Math.floor(Math.random() * 3) + 1) * CELL
          segments.push({
            x: col * CELL,
            y: row * CELL,
            length: len,
            dir: "h",
            progress: 0,
            speed: 0.003 + Math.random() * 0.004,
            opacity: 0.03 + Math.random() * 0.05,
            active: Math.random() < 0.25,
            pulse: Math.random(),
            pulseSpeed: 0.0015 + Math.random() * 0.002,
          })
        } else if (r < 0.36) {
          const len = (Math.floor(Math.random() * 3) + 1) * CELL
          segments.push({
            x: col * CELL,
            y: row * CELL,
            length: len,
            dir: "v",
            progress: 0,
            speed: 0.003 + Math.random() * 0.004,
            opacity: 0.03 + Math.random() * 0.05,
            active: Math.random() < 0.25,
            pulse: Math.random(),
            pulseSpeed: 0.0015 + Math.random() * 0.002,
          })
        }
      }
    }

    type Via = { x: number; y: number; lit: boolean; blinkTimer: number }
    const vias: Via[] = []
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        if (Math.random() < 0.04) {
          vias.push({
            x: col * CELL,
            y: row * CELL,
            lit: Math.random() < 0.2,
            blinkTimer: Math.random() * 200,
          })
        }
      }
    }

    let raf: number

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      grad.addColorStop(0, "rgba(4,5,8,1)")
      grad.addColorStop(0.5, "rgba(3,4,7,1)")
      grad.addColorStop(1, "rgba(5,6,9,1)")
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (const seg of segments) {
        seg.progress = Math.min(1, seg.progress + seg.speed)
        const drawn = seg.length * seg.progress
        const x2 = seg.dir === "h" ? seg.x + drawn : seg.x
        const y2 = seg.dir === "v" ? seg.y + drawn : seg.y

        ctx.beginPath()
        ctx.moveTo(seg.x, seg.y)
        ctx.lineTo(x2, y2)
        ctx.strokeStyle = `rgba(255,255,255,${seg.opacity})`
        ctx.lineWidth = 1
        ctx.stroke()

        if (seg.active && seg.progress > 0.5) {
          seg.pulse = (seg.pulse + seg.pulseSpeed) % 1

          let t = 1
          if (seg.pulse < 0.15) {
            t = seg.pulse / 0.15
          } else if (seg.pulse > 0.85) {
            t = (1 - seg.pulse) / 0.15
          }

          const alpha = t * t * (3 - 2 * t)

          const px = seg.dir === "h" ? seg.x + seg.pulse * seg.length : seg.x
          const py = seg.dir === "v" ? seg.y + seg.pulse * seg.length : seg.y

          const halo = ctx.createRadialGradient(px, py, 0, px, py, 12)
          halo.addColorStop(0, `rgba(150,185,255,${0.18 * alpha})`)
          halo.addColorStop(1, `rgba(150,185,255,0)`)
          ctx.beginPath()
          ctx.arc(px, py, 12, 0, Math.PI * 2)
          ctx.fillStyle = halo
          ctx.fill()

          const core = ctx.createRadialGradient(px, py, 0, px, py, 4)
          core.addColorStop(0, `rgba(220,230,255,${0.70 * alpha})`)
          core.addColorStop(0.5, `rgba(185,210,255,${0.30 * alpha})`)
          core.addColorStop(1, `rgba(180,200,255,0)`)
          ctx.beginPath()
          ctx.arc(px, py, 4, 0, Math.PI * 2)
          ctx.fillStyle = core
          ctx.fill()
        }
      }

      for (const via of vias) {
        via.blinkTimer--
        if (via.blinkTimer <= 0) {
          via.lit = !via.lit
          via.blinkTimer = 180 + Math.random() * 420
        }

        ctx.beginPath()
        ctx.arc(via.x, via.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = via.lit
          ? "rgba(155,190,255,0.26)"
          : "rgba(255,255,255,0.045)"
        ctx.fill()

        if (via.lit) {
          const glow = ctx.createRadialGradient(via.x, via.y, 0, via.x, via.y, 7)
          glow.addColorStop(0, "rgba(130,175,255,0.10)")
          glow.addColorStop(1, "rgba(130,175,255,0)")
          ctx.beginPath()
          ctx.arc(via.x, via.y, 7, 0, Math.PI * 2)
          ctx.fillStyle = glow
          ctx.fill()
        }
      }

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}/>
  )
}