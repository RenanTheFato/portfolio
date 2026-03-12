'use client'

import { VscRootFolder } from "react-icons/vsc"
import { Project } from "../project"
import { Badge } from "../badge"
import { useCustomScrollbar, ScrollTrack } from "@/utils/scroll"
import { projects } from "@/data/projects"
import { useProject } from "@/contexts/project-context"

export function Window() {
  const { mainRef, thumbRef, trackRef, handleScroll } = useCustomScrollbar()
  const { setSelected } = useProject()

  return (
    <section className="flex flex-col w-7/12 h-full border-2 border-white/40 rounded-t-lg">
      <div className="w-full h-10 flex items-center flex-row border-b border-b-white/25 rounded-t-2xl shrink-0">
        <VscRootFolder className="mx-4" size={22} />
        <div className="w-2/12 bg-gray-100/30 h-full rounded-t-lg flex items-center justify-center">
          <span className="text-white text-sm">Project's Folder</span>
        </div>
      </div>

      <div className="relative flex-1 min-h-0">
        <div ref={mainRef} onScroll={handleScroll} className="h-full overflow-y-auto p-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="grid grid-cols-3 gap-4 pt-2">
            {projects.map((project) => (
              <Project key={project.title} onClick={() => setSelected(project)}>
                <Project.Image src={project.image} alt={project.alt} />
                <Project.Content>
                  <Project.Title>{project.title}</Project.Title>
                  <Project.Badges>
                    {project.techs.slice(0, 3).map((tech) => (
                      <Badge key={tech.label} color={tech.color}>
                        <Badge.Icon icon={tech.icon} color={tech.color} />
                        <Badge.Title>{tech.label}</Badge.Title>
                      </Badge>
                    ))}
                  </Project.Badges>
                </Project.Content>
              </Project>
            ))}
          </div>
        </div>
        <ScrollTrack trackRef={trackRef} thumbRef={thumbRef} />
      </div>
    </section>
  )
}