'use client'

import { Window } from "../ui/window"
import { Visualizer } from "../ui/visualizer"
import { ProjectProvider } from "@/contexts/project-context"

export function Projects() {
  return (
    <ProjectProvider>
      <div className="relative w-full h-full flex flex-row p-8 px-24 space-x-8 bg-black border-t border-t-white/30 overflow-hidden">
        <Window />
        <Visualizer />
      </div>
    </ProjectProvider>
  )
}