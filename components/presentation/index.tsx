'use client'

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { MenuItem } from "../ui/menu-main-item";

import {
  SiTypescript, SiReact, SiNextdotjs, SiNodedotjs, SiPostgresql, SiDocker, SiGit, SiPrisma,
  SiPython, SiRust, SiGo
} from "@icons-pack/react-simple-icons";
import { FaJava } from "react-icons/fa";
import { InteractiveGrid, InteractiveGridHandle } from "../animations/squares";

const HARD_SKILLS = [
  { label: "Frontend Development", desc: "SPAs, SSR, component systems" },
  { label: "Backend Development", desc: "REST, microservices" },
  { label: "Database Design", desc: "Relational, migrations, ORMs" },
  { label: "Cloud & DevOps", desc: "Docker, CI/CD, deployments" },
  { label: "API Architecture", desc: "Design, versioning, contracts" },
  { label: "System Design", desc: "Scalability, patterns, DDD" },
]

const LANGUAGES = [
  { icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
  { icon: SiNodedotjs, label: "Node.js", color: "#339933" },
  { icon: SiPython, label: "Python", color: "#3776AB" },
  { icon: SiRust, label: "Rust", color: "#CE422B" },
  { icon: FaJava, label: "Java", color: "#ED8B00" },
  { icon: SiGo, label: "Go", color: "#00ADD8" },
  { icon: SiReact, label: "React", color: "#61DAFB" },
  { icon: SiNextdotjs, label: "Next.js", color: "#ffffff" },
  { icon: SiPostgresql, label: "Postgres", color: "#4169E1" },
  { icon: SiPrisma, label: "Prisma", color: "#ffffff" },
  { icon: SiDocker, label: "Docker", color: "#2496ED" },
  { icon: SiGit, label: "Git", color: "#F05032" },
]

const MENU_ITEMS = ["$ Skills", "$ Projects", "$ Certifications", "$ Contact"]

function BurgerMenu() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden flex flex-col justify-center gap-1.25 w-8 h-8 shrink-0"
        aria-label="Open menu"
      >
        <span className="block h-px w-full bg-white" />
        <span className="block h-px w-full bg-white" />
        <span className="block h-px w-full bg-white" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="ml-auto w-64 sm:w-72 h-full bg-black border-l border-white/10 flex flex-col p-8 gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="self-end text-white/50 hover:text-white text-xl font-brains leading-none mb-2"
              aria-label="Close menu"
            >
              ✕
            </button>
            {MENU_ITEMS.map((label) => (
              <MenuItem key={label} label={label} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

function SkillsSection() {
  return (
    <div className="mt-7 flex flex-col gap-6 max-w-sm lg:max-w-lg">

      <div className="flex flex-col gap-3">
        <span className="font-brains text-lg lg:text-base text-white font-semibold">Skills</span>
        <div className="grid grid-cols-2 gap-x-6 lg:gap-x-10 gap-y-3 sm:gap-y-2.5 lg:gap-y-4">
          {HARD_SKILLS.map(({ label, desc }) => (
            <div key={label} className="flex flex-col gap-1 sm:gap-0.5 lg:gap-1">
              <span className="font-brains text-sm lg:text-sm text-white">{label}</span>
              <span className="font-brains text-xs lg:text-xs text-white/45">{desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-white/10" />

      <div className="flex flex-col gap-3">
        <span className="font-brains text-lg lg:text-base text-white font-semibold">Tech Stack</span>
        <div className="grid grid-cols-3 gap-x-4 lg:gap-x-6 gap-y-3 sm:gap-y-2 lg:gap-y-3">
          {LANGUAGES.map(({ icon: Icon, label, color }) => (
            <div key={label} className="flex flex-row items-center gap-2 sm:gap-1.5 lg:gap-2">
              <Icon size={14} className="shrink-0 lg:hidden" style={{ color }} />
              <Icon size={16} className="shrink-0 hidden lg:block" style={{ color }} />
              <span className="font-brains text-sm lg:text-sm text-white/75">{label}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

interface PresentationSectionProps {
  startAnimation: boolean,
  onAnimationComplete?: () => void
}

export function PresentationSection({ startAnimation, onAnimationComplete }: PresentationSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const bootSequenceRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<InteractiveGridHandle>(null)
  const [bootAnimationComplete, setBootAnimationComplete] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    gridRef.current?.setMousePos(e.clientX, e.clientY)
  }
  const handleMouseLeave = () => {
    gridRef.current?.clearMousePos()
  }

  useEffect(() => {
    if (bootAnimationComplete || !startAnimation) return

    const bootCommands = [
      "> Initializing profile session.............. [OK]",
      "> Loading personal data..................... [OK]",
      "> Fetching identity......................... [OK]",
      "> Scanning core skills...................... [OK]",
      "> Analyzing experience level................ [OK]",
      "> Mapping interests......................... [OK]",
      "> Compiling profile summary................. [OK]",
      "> Presentation module ready................. [OK]",
    ]

    const bootTimeline = gsap.timeline()

    bootCommands.forEach((command, index) => {
      bootTimeline.to({}, {
        duration: 0.5,
        onStart: () => {
          const commandLine = document.createElement("div")
          commandLine.className = "font-brains opacity-0 text-sm lg:text-base sm:text-xs text-justify text-nowrap"
          commandLine.textContent = command
          bootSequenceRef.current?.appendChild(commandLine)

          gsap.to(commandLine, {
            opacity: 1,
            duration: 0.5,
            onComplete: () => {
              if (index === bootCommands.length - 1) {
                setTimeout(() => {
                  gsap.to(bootSequenceRef.current, {
                    opacity: 0,
                    duration: 1,
                    delay: 0.5,
                    onComplete: () => {
                      setTimeout(() => {
                        setBootAnimationComplete(true)
                        onAnimationComplete?.()
                      }, 200)
                    },
                  })
                }, 200)
              }
            },
          })
        },
      })
    })
  }, [bootAnimationComplete, startAnimation])

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black"
      style={{ minHeight: 'calc(100vh - 57px)' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <InteractiveGrid ref={gridRef} />

      {!bootAnimationComplete ? (
        <div className="absolute inset-0 z-50 bg-black flex overflow-hidden">
          <div className="w-full p-6 px-5 sm:px-12 lg:px-36">
            <div ref={bootSequenceRef} className="space-y-2" />
          </div>
        </div>
      ) : (
        <section className="relative z-10 flex flex-col lg:flex-row justify-start lg:justify-between w-full min-h-full px-6 sm:px-10 lg:px-36
          py-10 sm:py-10 lg:py-12 gap-8 lg:gap-0">

          <div className="flex flex-col w-full lg:flex-3">

            <div className="flex flex-row items-center gap-5 sm:gap-6">
              <Image
                src={"/avatar.png"}
                alt="profile pic"
                width={144}
                height={144}
                className="rounded-md w-22 h-22 sm:w-24 sm:h-24 lg:w-36 lg:h-36 shrink-0"
                loading="eager"
              />
              <section className="flex flex-col gap-1.5 sm:gap-1 lg:gap-2 min-w-0">
                <div className="flex flex-row flex-wrap gap-x-2 sm:gap-x-4">
                  <span className="text-white/40 font-brains text-xs sm:text-sm lg:text-base shrink-0">My Name:</span>
                  <span className="text-white font-brains text-xs sm:text-sm lg:text-base">Renan Santana</span>
                </div>
                <div className="flex flex-row flex-wrap gap-x-2 sm:gap-x-4">
                  <span className="text-white/40 font-brains text-xs sm:text-sm lg:text-base shrink-0">Experience:</span>
                  <span className="text-white font-brains text-xs sm:text-sm lg:text-base">4 years</span>
                </div>
                <div className="flex flex-row flex-wrap gap-x-2 sm:gap-x-4">
                  <span className="text-white/40 font-brains text-xs sm:text-sm lg:text-base shrink-0">Scope:</span>
                  <span className="text-white font-brains text-xs sm:text-sm lg:text-base">FullStack</span>
                </div>
              </section>

              <div className="ml-auto self-start lg:hidden">
                <BurgerMenu />
              </div>
            </div>

            <SkillsSection />
          </div>

          <div className="hidden lg:flex flex-col flex-1">
            <section className="flex flex-col gap-6">
              {MENU_ITEMS.map((label) => (
                <MenuItem key={label} label={label} />
              ))}
            </section>
          </div>

        </section>
      )}
    </div>
  )
}