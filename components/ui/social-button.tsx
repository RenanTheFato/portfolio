'use client'

import { useRef, useLayoutEffect, ComponentType, SVGProps, createContext, useContext, ReactNode } from "react";
import { gsap } from "gsap";
import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface SocialButtonContextValue {
  bgRef: React.RefObject<HTMLDivElement | null>
  textContainerRef: React.RefObject<HTMLDivElement | null>
  textRef: React.RefObject<HTMLDivElement | null>
  charsRef: React.RefObject<HTMLSpanElement[]>
  timelineRef: React.RefObject<gsap.core.Timeline | null>
}

const SocialButtonContext = createContext<SocialButtonContextValue | null>(null)

function useSocialButtonContext() {
  const context = useContext(SocialButtonContext)
  if (!context) {
    throw new Error('SocialButton components must be used within SocialButton.Root')
  }
  return context
}

interface RootProps {
  children: ReactNode,
  href: string,
}

function Root({ children, href }: RootProps) {
  const bgRef = useRef<HTMLDivElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const charsRef = useRef<HTMLSpanElement[]>([])

  useLayoutEffect(() => {
    const timeline = gsap.timeline({ paused: true })
    timelineRef.current = timeline

    timeline.to(
      bgRef.current,
      {
        scaleX: 1,
        duration: 0.4,
        ease: "power2.inOut",
      },
      0
    )

    timeline.to(
      textContainerRef.current,
      {
        width: "auto",
        duration: 0.4,
        ease: "power2.inOut",
      },
      0
    )

    charsRef.current.forEach((char, index) => {
      timeline.to(
        char,
        {
          opacity: 1,
          duration: 0.05,
        },
        0.4 + index * 0.08
      )
    })

    return () => {
      timeline.kill()
    }
  }, [])

  function handleMouseEnter() {
    if (timelineRef.current) {
      timelineRef.current.play()
    }
  }

  function handleMouseLeave() {
    if (timelineRef.current) {
      timelineRef.current.reverse()
    }
  }

  return (
    <SocialButtonContext.Provider value={{ bgRef, textContainerRef, textRef, charsRef, timelineRef }}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative overflow-hidden border-b border-b-white/25 p-3 inline-flex items-center gap-0 cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </a>
    </SocialButtonContext.Provider>
  )
}

interface BackgroundProps {
  className?: string
}

function Background({ className = "" }: BackgroundProps) {
  const { bgRef } = useSocialButtonContext()

  return (
    <div
      ref={bgRef}
      className={`absolute inset-0 z-0 ${className}`}
      style={{
        transform: "scaleX(0)",
        transformOrigin: "left",
      }}
    />
  )
}

interface IconProps {
  icon: StaticImageData | ComponentType<SVGProps<SVGSVGElement>>
  text: string
  isSvg?: boolean
  iconClassName?: string
}

function Icon({ icon, text, isSvg = false, iconClassName }: IconProps) {
  return (
    <div className="relative z-10">
      {isSvg ? (
        <Image
          src={icon as StaticImageData}
          alt={text}
          width={20}
          height={20}
          className={iconClassName || "brightness-0 invert"}
        />
      ) : (
        React.createElement(icon as ComponentType<SVGProps<SVGSVGElement>>, { 
          className: iconClassName || "w-5 h-5 text-white" 
        })
      )}
    </div>
  )
}

interface TextProps {
  children: string
  className?: string
}

function Text({ children, className }: TextProps) {
  const { textContainerRef, textRef, charsRef } = useSocialButtonContext()

  return (
    <div
      ref={textContainerRef}
      className="relative z-10 overflow-hidden"
      style={{ width: 0 }}
    >
      <div ref={textRef} className={`pl-2 font-brains text-sm whitespace-nowrap ${className || "text-white"}`}>
        {children.split("").map((char: string, index: number) => (
          <span
            key={index}
            ref={(el) => {
              if (el) charsRef.current[index] = el
            }}
            style={{ opacity: 0 }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  )
}

export const SocialButton = {
  Root,
  Background,
  Icon,
  Text,
}