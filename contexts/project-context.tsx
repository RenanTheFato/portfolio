'use client'

import { createContext, useContext, useState } from "react"
import { ProjectData } from "@/types/project-data"

interface ProjectContextType {
  selected: ProjectData | null
  setSelected: (project: ProjectData | null) => void
}

const ProjectContext = createContext<ProjectContextType>({
  selected: null,
  setSelected: () => {},
})

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<ProjectData | null>(null)
  return (
    <ProjectContext.Provider value={{ selected, setSelected }}>
      {children}
    </ProjectContext.Provider>
  )
}

export const useProject = () => useContext(ProjectContext)