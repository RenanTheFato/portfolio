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
    <div onClick={onClick} className="flex flex-col items-start justify-between border border-white/20 rounded-md overflow-hidden">
      {children}
    </div>
  )
}

function Content({ children }: ProjectProps) {
  return <div className="flex flex-col gap-2 p-3 w-full">{children}</div>
}

function ProjectImage({ src, alt }: ProjectImageProps) {
  return (
    <div className="relative w-full h-36">
      <Image src={src} alt={alt || "image"} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
    </div>
  )
}

function Title({ children }: ProjectProps) {
  return <span className="text-white text-base">{children}</span>
}

function Badges({ children }: ProjectProps) {
  return <div className="flex flex-row flex-wrap gap-1">{children}</div>
}


Project.Image = ProjectImage
Project.Title = Title
Project.Badges = Badges
Project.Content = Content

export { Project }