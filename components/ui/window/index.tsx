'use client'

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { VscRootFolder } from "react-icons/vsc"
import { Project } from "../project"
import { Badge } from "../badge"
import { useCustomScrollbar, ScrollTrack } from "@/utils/scroll"
import { projects } from "@/data/projects"
import { useProject } from "@/contexts/project-context"
import { useTranslations } from "next-intl"

const PROJECTS_ITEMS_ANIM_KEY = "portfolio_projects_items_anim_done"

export function Window() {
  const { mainRef, thumbRef, trackRef, handleScroll } = useCustomScrollbar()
  const { setSelected } = useProject()
  const t = useTranslations('projects')
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const items = grid.querySelectorAll('.project-item')
    const seen = sessionStorage.getItem(PROJECTS_ITEMS_ANIM_KEY) === "1"

    if (seen) {
      gsap.set(items, { opacity: 1, y: 0 })
      return
    }

    sessionStorage.setItem(PROJECTS_ITEMS_ANIM_KEY, "1")

    gsap.fromTo(items,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.07,
        delay: 0.4,
      }
    )
  }, [])

  return (
    <section className="flex flex-col w-full h-84 sm:h-80 lg:h-full border-2 border-white/40 rounded-t-lg">
      <div className="w-full h-10 flex items-center flex-row border-b border-b-white/25 rounded-t-2xl shrink-0">
        <VscRootFolder className="mx-3 sm:mx-4" size={20} />
        <div className="w-5/12 sm:w-4/12 lg:w-3/12 bg-gray-100/30 h-full rounded-t-lg flex items-center justify-center">
          <span className="text-white text-xs sm:text-sm text-nowrap">{t('folderTab')}</span>
        </div>
      </div>

      <div className="relative flex-1 min-h-0">
        <div
          ref={mainRef}
          onScroll={handleScroll}
          className="h-full overflow-y-auto p-2 sm:p-3 lg:p-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 pt-2">
            {projects.map((project) => (
              <div key={project.title} className="project-item opacity-0">
                <Project onClick={() => setSelected(project)}>
                  <Project.Image src={project.image} alt={project.alt} />
                  <Project.Content>
                    <Project.Title>{project.title}</Project.Title>
                    <Project.Badges>
                      {project.techs.slice(0, 3).map((tech) => (
                        <Badge key={tech.label} color={tech.color}>
                          <Badge.Icon icon={tech.icon} color={tech.color} iconColor={tech.iconColor} />
                          <Badge.Title>{tech.label}</Badge.Title>
                        </Badge>
                      ))}
                    </Project.Badges>
                  </Project.Content>
                </Project>
              </div>
            ))}
          </div>
        </div>
        <ScrollTrack trackRef={trackRef} thumbRef={thumbRef} />
      </div>
    </section>
  )
}