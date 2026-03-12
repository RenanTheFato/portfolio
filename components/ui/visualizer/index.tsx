'use client'

import Image from "next/image";
import { useProject } from "@/contexts/project-context";
import { Badge } from "../badge";

const focusLabel = {
  frontend: "Frontend",
  backend: "Backend",
  fullstack: "Fullstack",
}

const focusColor = {
  frontend: "hsl(239, 84%, 67%)",
  backend: "hsl(160, 84%, 39%)",
  fullstack: "hsl(38, 92%, 50%)",
}

export function Visualizer() {
  const { selected, setSelected } = useProject()

  if (!selected) {
    return (
      <div className="flex-1 h-full flex items-center justify-center border-2 border-white/20 border-dashed rounded-t-lg ml-4">
        <p className="text-white/30 text-sm">Select a project to preview</p>
      </div>
    )
  }

  return (
    <div className="flex-1 h-full flex flex-col border-2 border-white/40 rounded-t-lg ml-4 overflow-hidden">

      <div className="w-full h-10 flex items-center justify-between px-4 border-b border-b-white/25 shrink-0">
        <span className="text-white/60 text-sm">Preview</span>
        <button onClick={() => setSelected(null)} className="text-white/40 hover:text-white/80 text-lg leading-none transition-colors">
          ×
        </button>
      </div>

      <div className="relative w-full h-48 shrink-0 border-b border-b-white/20">
        <Image src={selected.image} alt={selected.alt} fill className="object-cover" />
      </div>

      <div className="flex flex-col gap-4 p-5 overflow-y-auto flex-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

        <div className="flex items-start justify-between gap-2">
          <h2 className="text-white text-xl font-semibold">{selected.title}</h2>
          <span
            className="text-xs px-2 py-1 rounded-md font-medium shrink-0"
            style={{
              backgroundColor: focusColor[selected.focus].replace("hsl(", "hsla(").replace(")", ", 0.13)"),
              color: focusColor[selected.focus],
              border: `1px solid ${focusColor[selected.focus].replace("hsl(", "hsla(").replace(")", ", 0.27)")}`,
            }}
          >
            {focusLabel[selected.focus]}
          </span>
        </div>

        <p className="text-white/60 text-sm text-justify leading-relaxed">{selected.description}</p>

        <div className="h-px bg-white/10" />

        <div className="flex flex-col gap-2">
          <span className="text-white/40 text-xs uppercase tracking-widest">Technologies</span>
          <div className="flex flex-wrap gap-2">
            {selected.techs.map((tech) => (
              <Badge key={tech.label} color={tech.color}>
                <Badge.Icon icon={tech.icon} color={tech.color} />
                <Badge.Title>{tech.label}</Badge.Title>
              </Badge>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}