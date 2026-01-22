'use client'

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

interface PresentationSectionProps {
  startAnimation: boolean
}

export function PresentationSection({ startAnimation }: PresentationSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const bootSequenceRef = useRef<HTMLDivElement>(null)
  const [bootAnimationComplete, setBootAnimationComplete] = useState(false)

  useEffect(() => {
    if (bootAnimationComplete || !startAnimation) {
      return
    }
    const bootCommands = [
      '> Initializing profile session.............. [OK]',
      '> Loading personal data..................... [OK]',
      '> Fetching identity......................... [OK]',
      '> Scanning core skills...................... [OK]',
      '> Analyzing experience level................ [OK]',
      '> Mapping interests......................... [OK]',
      '> Compiling profile summary................. [OK]',
      '> Presentation module ready................. [OK]',
    ]


    const bootTimeline = gsap.timeline()

    bootCommands.forEach((command, index) => {
      bootTimeline.to({}, {
        duration: 0.5,
        onStart: () => {
          const commandLine = document.createElement('div')
          commandLine.className = 'font-brains opacity-0 text-justify text-nowrap'
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
                      }, 200)
                    }
                  })
                }, 200)
              }
            }
          })
        }
      })
    })
  }, [bootAnimationComplete, startAnimation])

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-black">
      {!bootAnimationComplete ? (
        <div className="absolute inset-0 z-50 bg-black flex">
          <div className="w-full max-w-2xl p-8 px-36">
            <div ref={bootSequenceRef} className="space-y-2" />
          </div>
        </div>
      ) : (
        <div className="flex flex-row w-screen h-screen px-36 p-12">
          <div className="flex flex-col">
            <Image src={'/avatar.png'} alt="profile pic" width={144} height={144} className="rounded-md" loading="eager"/>
          </div>
        </div>
      )}
    </div>
  )
}