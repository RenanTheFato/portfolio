'use client'

interface CpuPinProps {
  side: "left" | "right"
}

const PINS = [false, true, false, false, true, false, true, false, false, false, true, false, false, true, false]

export function CpuPin({ side }: CpuPinProps) {
  const isLeft = side === "left"

  return (
    <div
      className={`flex flex-col ${isLeft ? "items-end" : "items-start"}`}
      style={{ gap: "clamp(6px, 1vw, 10px)" }}
    >
      {PINS.map((active, i) => (
        <div key={i} className="flex items-center" style={{ gap: 0 }}>
          <div
            style={{
              width: "clamp(14px, 3vw, 36px)",
              height: "1px",
              background: active ? "hsla(0, 0%, 100%, 0.28)" : "hsla(0, 0%, 100%, 0.07)",
              order: isLeft ? 1 : 0,
            }}
          />
          <div
            style={{
              width: "clamp(8px, 1.5vw, 18px)",
              height: "clamp(7px, 1vw, 10px)",
              borderRadius: isLeft ? "3px 0 0 3px" : "0 3px 3px 0",
              background: active ? "hsla(0, 0%, 100%, 0.25)" : "hsla(0, 0%, 100%, 0.07)",
              boxShadow: active ? "0 0 6px hsla(0, 0%, 100%, 0.15)" : "none",
              order: isLeft ? 0 : 1,
            }}
          />
        </div>
      ))}
    </div>
  )
}