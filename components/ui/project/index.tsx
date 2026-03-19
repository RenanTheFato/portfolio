'use client'

import Image from "next/image";
import { ReactNode } from "react";

interface ProjectProps {
  children: ReactNode,
  onClick?: () => void
}

interface ProjectImageProps {
  src: string,
  alt?: string
}

function Project({ children, onClick }: ProjectProps) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col cursor-pointer border border-white/20 rounded-md overflow-hidden w-full h-full"
    >
      {children}
    </div>
  )
}

function Content({ children }: ProjectProps) {
  return (
    <div className="flex flex-col gap-2 p-3 w-full flex-1">
      {children}
    </div>
  )
}

function ProjectImage({ src, alt }: ProjectImageProps) {
  return (
    <div className="relative w-full aspect-video shrink-0">
      <Image
        src={src}
        alt={alt || "image"}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover"
        loading="lazy"
      />
    </div>
  )
}

function Title({ children }: ProjectProps) {
  return (
    <span className="text-white text-sm leading-tight line-clamp-1">
      {children}
    </span>
  )
}

function Badges({ children }: ProjectProps) {
  return (
    <div className="flex flex-row flex-wrap gap-1 min-h-7 items-start content-start">
      {children}
    </div>
  )
}

Project.Image = ProjectImage
Project.Title = Title
Project.Badges = Badges
Project.Content = Content

export { Project }