'use client'

import { Window } from "../ui/window"
import { Visualizer } from "../ui/visualizer"
import { ProjectProvider } from "@/contexts/project-context"

export function Projects() {
  return (
    <ProjectProvider>
      <div className="relative w-full h-full flex flex-col lg:flex-row p-4 sm:p-6 lg:p-8 lg:px-24 gap-4 sm:gap-6 lg:space-x-8 bg-black border-t border-t-white/30 overflow-hidden">
        <Window />
        <Visualizer />
      </div>
    </ProjectProvider>
  )
}