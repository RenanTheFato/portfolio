'use client'

import React, { useEffect, useRef } from "react";
import Linkedin from '../../public/linkedin.svg';
import TextType from "../animations/text-type";
import { SocialButton } from "../ui/social-button";
import { SiGithub, SiGmail } from "@icons-pack/react-simple-icons";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

interface TopbarProps {
  onAnimationComplete?: () => void
  skipAnimation?: boolean
}

const SCROLL_KEY = "portfolio_scroll_pos"

function LanguageSwitcher() {
  const currentLocale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
    const newPath = segments.join('/')

    const mainEl = document.querySelector('main')
    const scrollY = mainEl ? mainEl.scrollTop : 0
    sessionStorage.setItem(SCROLL_KEY, String(scrollY))

    router.replace(newPath, { scroll: false })
  }

  return (
    <div className="flex flex-row items-center gap-2 shrink-0">
      {(['pt', 'en'] as const).map((locale, idx) => (
        <React.Fragment key={locale}>
          {idx > 0 && (
            <span className="text-white/20 font-brains text-xs select-none">|</span>
          )}
          <button
            onClick={() => switchLocale(locale)}
            className={`font-brains text-xs sm:text-sm transition-colors ${currentLocale === locale
                ? 'text-white'
                : 'text-white/30 hover:text-white/60'
              }`}
          >
            {locale.toUpperCase()}
          </button>
        </React.Fragment>
      ))}
    </div>
  )
}

export function Topbar({ onAnimationComplete, skipAnimation = false }: TopbarProps) {
  const typingSpeed = 50

  const texts = [
    { text: "> Welcome to ", className: "font-brains text-white" },
    { text: "Renan Santana ", className: "font-brains text-blue-500" },
    { text: "portfolio", className: "font-brains text-white", showCursor: true },
  ];

  const delays = texts.reduce((acc, curr, idx) => {
    if (idx === 0) return [0];
    return [...acc, acc[idx - 1] + (texts[idx - 1].text.length * typingSpeed)]
  }, [] as number[])

  const totalDuration = delays[delays.length - 1] + (texts[texts.length - 1].text.length * typingSpeed)

  React.useEffect(() => {
    if (!onAnimationComplete) return
    if (skipAnimation) {
      onAnimationComplete()
      return
    }
    const timer = setTimeout(onAnimationComplete, totalDuration)
    return () => clearTimeout(timer)
  }, [skipAnimation])

  return (
    <header className="w-full flex flex-row items-center justify-between border-b border-b-white/25 px-5 sm:px-10 lg:px-36
      py-3 sm:py-4 gap-3">

      <span className="inline min-w-0 overflow-hidden text-xs sm:text-sm lg:text-base leading-none">
        {texts.map((item, idx) => (
          <TextType
            key={idx}
            text={item.text}
            showCursor={item.showCursor ?? false}
            loop={false}
            className={`inline ${item.className}`}
            initialDelay={skipAnimation ? 0 : delays[idx]}
            skipAnimation={skipAnimation}
          />
        ))}
      </span>

      <div className="flex flex-row items-center gap-2 sm:gap-3 lg:gap-4 shrink-0">
        <LanguageSwitcher />

        <div className="h-4 w-px bg-white/20 hidden sm:block" />

        <div className="flex flex-row items-center gap-1.5 sm:gap-2 lg:gap-3">
          <SocialButton.Root href="https://www.linkedin.com/in/renan-santana007">
            <SocialButton.Background className="bg-linear-to-r from-blue-400 to-blue-800" />
            <SocialButton.Icon icon={Linkedin} text="LinkedIn" isSvg={true} />
            <SocialButton.Text>LinkedIn</SocialButton.Text>
          </SocialButton.Root>

          <SocialButton.Root href="https://github.com/RenanTheFato">
            <SocialButton.Background className="bg-linear-to-r from-gray-400 to-white" />
            <SocialButton.Icon icon={SiGithub} text="GitHub" isSvg={false} iconClassName="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-black transition-colors" />
            <SocialButton.Text className="text-white group-hover:text-black transition-colors">GitHub</SocialButton.Text>
          </SocialButton.Root>

          <SocialButton.Root href="mailto:renan.thefato.dev@gmail.com">
            <SocialButton.Background className="bg-linear-to-r from-red-800 to-red-950" />
            <SocialButton.Icon icon={SiGmail} text="Gmail" isSvg={false} iconClassName="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            <SocialButton.Text>Email</SocialButton.Text>
          </SocialButton.Root>
        </div>
      </div>
    </header>
  )
}