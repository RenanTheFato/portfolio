'use client'

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { MenuItem } from "../ui/menu-main-item";

import {
  SiTypescript, SiReact, SiNextdotjs, SiNodedotjs, SiPostgresql, SiDocker, SiGit, SiPrisma,
  SiPython, SiRust, SiGo
} from "@icons-pack/react-simple-icons";
import { FaJava } from "react-icons/fa";
import { InteractiveGrid, InteractiveGridHandle } from "../animations/squares";

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

function BurgerMenu() {
  const t = useTranslations('nav')
  const [open, setOpen] = useState(false)

  const MENU_ITEMS = [
    t('skills'),
    t('projects'),
    t('certifications'),
    t('contact'),
  ]

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden flex flex-col justify-center gap-1.5 w-8 h-8 shrink-0"
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
  const t = useTranslations()

  const HARD_SKILLS = [
    { label: t('skills.frontend.label'), desc: t('skills.frontend.desc') },
    { label: t('skills.backend.label'), desc: t('skills.backend.desc') },
    { label: t('skills.database.label'), desc: t('skills.database.desc') },
    { label: t('skills.devops.label'), desc: t('skills.devops.desc') },
    { label: t('skills.api.label'), desc: t('skills.api.desc') },
    { label: t('skills.system.label'), desc: t('skills.system.desc') },
  ]

  return (
    <div className="mt-7 flex flex-col gap-6 w-full lg:max-w-lg">
      <div className="flex flex-col gap-3">
        <span className="font-brains text-lg lg:text-base text-white font-semibold">
          {t('presentation.skillsTitle')}
        </span>
        <div className="grid grid-cols-2 gap-x-6 lg:gap-x-10 gap-y-3 sm:gap-y-2.5 lg:gap-y-4">
          {HARD_SKILLS.map(({ label, desc }) => (
            <div key={label} className="flex flex-col gap-1 sm:gap-0.5 lg:gap-1">
              <span className="font-brains text-sm text-white leading-snug">{label}</span>
              <span className="font-brains text-xs text-white/45 leading-snug">{desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-white/10" />

      <div className="flex flex-col gap-3">
        <span className="font-brains text-lg lg:text-base text-white font-semibold">
          {t('presentation.techStack')}
        </span>
        <div className="grid grid-cols-3 gap-x-4 lg:gap-x-6 gap-y-3 sm:gap-y-2 lg:gap-y-3">
          {LANGUAGES.map(({ icon: Icon, label, color }) => (
            <div key={label} className="flex flex-row items-center gap-2 sm:gap-1.5 lg:gap-2">
              <Icon size={14} className="shrink-0 lg:hidden" style={{ color }} />
              <Icon size={16} className="shrink-0 hidden lg:block" style={{ color }} />
              <span className="font-brains text-sm text-white/75">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface PresentationSectionProps {
  startAnimation: boolean
  skipAnimation?: boolean
  onAnimationComplete?: () => void
}

export function PresentationSection({ startAnimation, skipAnimation = false, onAnimationComplete }: PresentationSectionProps) {
  const t = useTranslations()
  const containerRef = useRef<HTMLDivElement>(null)
  const bootSequenceRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLElement>(null)
  const gridRef = useRef<InteractiveGridHandle>(null)

  const [bootAnimationComplete, setBootAnimationComplete] = useState(false)

  const MENU_ITEMS = [
    t('nav.skills'),
    t('nav.projects'),
    t('nav.certifications'),
    t('nav.contact'),
  ]

  const handleMouseMove = (e: React.MouseEvent) => {
    gridRef.current?.setMousePos(e.clientX, e.clientY)
  }
  const handleMouseLeave = () => {
    gridRef.current?.clearMousePos()
  }

  useEffect(() => {
    if (skipAnimation) {
      setBootAnimationComplete(true)
      onAnimationComplete?.()
    }
  }, [skipAnimation])

  useEffect(() => {
    if (skipAnimation) return
    if (bootAnimationComplete || !startAnimation) return

    const bootCommands = t.raw('boot.lines') as string[]
    const bootTimeline = gsap.timeline()

    bootCommands.forEach((command, index) => {
      bootTimeline.to({}, {
        duration: 0.5,
        onStart: () => {
          const commandLine = document.createElement("div")
          commandLine.className = "font-brains opacity-0 whitespace-nowrap"
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
  }, [skipAnimation, bootAnimationComplete, startAnimation])

  useEffect(() => {
    if (!bootAnimationComplete) return

    const el = contentRef.current
    if (!el) return

    const avatar = el.querySelector('.fade-avatar')
    const info = el.querySelector('.fade-info')
    const skills = el.querySelector('.fade-skills')
    const menu = el.querySelector('.fade-menu')

    if (skipAnimation) {
      gsap.set([avatar, info, skills, menu], { opacity: 1, y: 0, x: 0 })
      return
    }

    const tl = gsap.timeline()

    tl.fromTo(avatar,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    )
      .fromTo(info,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(skills,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(menu,
        { opacity: 0, x: 16 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
        "-=0.5"
      )
  }, [bootAnimationComplete, skipAnimation])

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
          <div className="w-full p-6 px-5 sm:px-12 lg:px-36 overflow-hidden">
            <div
              ref={bootSequenceRef}
              className="space-y-2"
              style={{ fontSize: "clamp(9px, 2.4vw, 14px)" }}
            />
          </div>
        </div>
      ) : (
        <section
          ref={contentRef}
          className="relative z-10 flex flex-col lg:flex-row justify-start lg:justify-between w-full min-h-full px-6 sm:px-10 lg:px-36 py-10 sm:py-10 lg:py-12 gap-8 lg:gap-0"
        >
          <div className="flex flex-col w-full lg:flex-3">

            <div className="flex flex-row items-center gap-5 sm:gap-6">

              <div className="fade-avatar opacity-0 shrink-0">
                <Image
                  src={"/avatar.png"}
                  alt="profile pic"
                  width={144}
                  height={144}
                  className="rounded-md w-22 h-22 sm:w-24 sm:h-24 lg:w-36 lg:h-36"
                  loading="eager"
                />
              </div>

              <section className="fade-info opacity-0 flex flex-col gap-1.5 sm:gap-1 lg:gap-2 min-w-0">
                <div className="flex flex-row flex-wrap gap-x-2 sm:gap-x-4">
                  <span className="text-white/40 font-brains text-xs sm:text-sm lg:text-base shrink-0">
                    {t('presentation.myName')}
                  </span>
                  <span className="text-white font-brains text-xs sm:text-sm lg:text-base">Renan Santana</span>
                </div>
                <div className="flex flex-row flex-wrap gap-x-2 sm:gap-x-4">
                  <span className="text-white/40 font-brains text-xs sm:text-sm lg:text-base shrink-0">
                    {t('presentation.experience')}
                  </span>
                  <span className="text-white font-brains text-xs sm:text-sm lg:text-base">
                    {t('presentation.years')}
                  </span>
                </div>
                <div className="flex flex-row flex-wrap gap-x-2 sm:gap-x-4">
                  <span className="text-white/40 font-brains text-xs sm:text-sm lg:text-base shrink-0">
                    {t('presentation.scope')}
                  </span>
                  <span className="text-white font-brains text-xs sm:text-sm lg:text-base">
                    {t('presentation.fullstack')}
                  </span>
                </div>
              </section>

              <div className="ml-auto self-start lg:hidden shrink-0">
                <BurgerMenu />
              </div>

            </div>

            <div className="fade-skills opacity-0">
              <SkillsSection />
            </div>
          </div>

          <div className="fade-menu opacity-0 hidden lg:flex flex-col flex-1">
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