'use client'

import React from "react";
import Linkedin from '../../public/linkedin.svg';
import TextType from "../animations/text-type";
import { SocialButton } from "../ui/social-button";
import { SiGithub, SiGmail } from "@icons-pack/react-simple-icons";

interface TopbarProps {
  onAnimationComplete?: () => void
}

export function Topbar({ onAnimationComplete }: TopbarProps) {
  const typingSpeed = 50

  const texts = [
    { text: "> ", className: "italic font-brains text-blue-500" },
    { text: " Welcome to ", className: "font-brains text-white" },
    { text: "Renan Santana ", className: "font-brains text-blue-500" },
    { text: "portfolio", className: "font-brains text-white", showCursor: true },
  ];

  const delays = texts.reduce((acc, curr, idx) => {
    if (idx === 0) return [0];
    return [...acc, acc[idx - 1] + (texts[idx - 1].text.length * typingSpeed)]
  }, [] as number[])

  const totalDuration = delays[delays.length - 1] + (texts[texts.length - 1].text.length * typingSpeed)
  
  React.useEffect(() => {
    if (onAnimationComplete) {
      const timer = setTimeout(onAnimationComplete, totalDuration)
      return () => clearTimeout(timer)
    }
  }, [onAnimationComplete, totalDuration])

  return (
    <header className="w-full flex flex-row justify-between items-center border-b border-b-white/25 p-4">
      <div className="flex flex-row">
        {texts.map((item, idx) => (
          <TextType
            key={idx}
            text={item.text}
            showCursor={item.showCursor ?? false}
            loop={false}
            className={item.className}
            initialDelay={delays[idx]}
          />
        ))}
      </div>

      <div className="flex gap-3">
        <SocialButton.Root href="https://www.linkedin.com/in/renan-santana007">
          <SocialButton.Background className="bg-linear-to-r from-blue-400 to-blue-800" />
          <SocialButton.Icon icon={Linkedin} text="LinkedIn" isSvg={true} />
          <SocialButton.Text>LinkedIn</SocialButton.Text>
        </SocialButton.Root>

        <SocialButton.Root href="https://github.com/RenanTheFato">
          <SocialButton.Background className="bg-linear-to-r from-gray-400 to-white" />
          <SocialButton.Icon icon={SiGithub} text="GitHub" isSvg={false} iconClassName="w-5 h-5 text-white group-hover:text-black transition-colors" />
          <SocialButton.Text className="text-white group-hover:text-black transition-colors">GitHub</SocialButton.Text>
        </SocialButton.Root>

        <SocialButton.Root href="mailto:renan.thefato.dev@gmail.com">
          <SocialButton.Background className="bg-linear-to-r from-red-800 to-red-950" />
          <SocialButton.Icon icon={SiGmail} text="GitHub" isSvg={false} iconClassName="w-5 h-5 text-white " />
          <SocialButton.Text>Email</SocialButton.Text>
        </SocialButton.Root>
      </div>
    </header>
  )
}