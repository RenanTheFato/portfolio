'use client'

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface TerminalProps {
  startAnimation: boolean
}

export function Terminal({ startAnimation }: TerminalProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const bootSequenceRef = useRef<HTMLDivElement>(null)
  const [bootAnimationComplete, setBootAnimationComplete] = useState(false)

  useEffect(() => {
    if (bootAnimationComplete || !startAnimation) {
      return
    }

    const bootCommands = [
      '> Initializing Specter System...',
      '> Loading core modules................ [OK]',
      '> Establishing neural network......... [OK]',
      '> Scanning system files............... [OK]',
      '> Calibrating interface............... [OK]',
      '> Loading user preferences............ [OK]',
      '> Connecting to databases............. [OK]',
      '> System ready........................ [OK]',
    ]

    const bootTimeline = gsap.timeline({ delay: 1 })

    bootCommands.forEach((command, index) => {
      bootTimeline.to({}, {
        duration: 0.5,
        onStart: () => {
          const commandLine = document.createElement('div')
          commandLine.className = 'font-brains opacity-0'
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
                    delay: 1,
                    onComplete: () => {
                      setTimeout(() => {
                        setBootAnimationComplete(true)
                      }, 1500)
                    }
                  })
                }, 500)
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
          <div className="w-full max-w-2xl p-8">
            <div ref={bootSequenceRef} className="space-y-2" />
          </div>
        </div>
      ) : (
        <div>
          oiiiiiiiiiiiiiiiiiiiii
        </div>
      )}
    </div>
  )
}