'use client'

import { useRef, useEffect, useImperativeHandle, forwardRef } from "react";

interface GridOffset {
  x: number,
  y: number,
}

export interface InteractiveGridHandle {
  setMousePos: (x: number, y: number) => void,
  clearMousePos: () => void,
}

export const InteractiveGrid = forwardRef<InteractiveGridHandle>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const gridOffset = useRef<GridOffset>({ x: 0, y: 0 })
  const hoveredSquareRef = useRef<GridOffset | null>(null)
  const SQUARE_SIZE = 32

  useImperativeHandle(ref, () => ({
    setMousePos(clientX: number, clientY: number) {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const mouseX = clientX - rect.left
      const mouseY = clientY - rect.top
      hoveredSquareRef.current = {
        x: Math.floor(mouseX / SQUARE_SIZE),
        y: Math.floor(mouseY / SQUARE_SIZE),
      }
    },
    clearMousePos() {
      hoveredSquareRef.current = null
    },
  }))

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let x = 0; x < canvas.width + SQUARE_SIZE; x += SQUARE_SIZE) {
        for (let y = 0; y < canvas.height + SQUARE_SIZE; y += SQUARE_SIZE) {
          const colIdx = Math.floor(x / SQUARE_SIZE)
          const rowIdx = Math.floor(y / SQUARE_SIZE)

          if (
            hoveredSquareRef.current &&
            hoveredSquareRef.current.x === colIdx &&
            hoveredSquareRef.current.y === rowIdx
          ) {
            ctx.fillStyle = "rgba(80, 100, 255, 0.18)"
            ctx.fillRect(x, y, SQUARE_SIZE, SQUARE_SIZE)
          }

          ctx.strokeStyle = "rgba(255, 255, 255, 0.045)"
          ctx.strokeRect(x, y, SQUARE_SIZE, SQUARE_SIZE)
        }
      }
    }

    const animate = () => {
      drawGrid();
      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
})

InteractiveGrid.displayName = "InteractiveGrid"