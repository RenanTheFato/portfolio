interface CpuPinProps {
  side: "left" | "right"
}

const PINS = [false, true, false, false, true, false, true, false, false, false, true, false, false, true, false]

export function CpuPin({ side }: CpuPinProps) {
  const isLeft = side === "left"

  return (
    <div className={`flex flex-col gap-2.25 ${isLeft ? "items-end" : "items-start"}`}>
      {PINS.map((active, i) => (
        <div key={i} className="flex items-center" style={{ gap: 0 }}>
          <div className="h-px"
            style={{ width: 36, background: active ? "hsla(0, 0%, 100%, 0.28)" : "hsla(0, 0%, 100%, 0.07)", order: isLeft ? 1 : 0 }}
          />
          <div style={{ width: 18, height: 12, borderRadius: isLeft ? "3px 0 0 3px" : "0 3px 3px 0",
              background: active ? "hsla(0, 0%, 100%, 0.25)" : "hsla(0, 0%, 100%, 0.07)", boxShadow: active ? "0 0 6px hsla(0, 0%, 100%, 0.15)" : "none",
              order: isLeft ? 0 : 1,
            }}
          />
        </div>
      ))}
    </div>
  )
}