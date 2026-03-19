'use client'

import { ElementType, ReactNode } from "react"

interface BadgeProps {
  children: ReactNode
  color?: string
}

interface BadgeIconProps {
  icon: ElementType,
  color: string,
  iconColor?: string
}

function Badge({ children, color }: BadgeProps) {

  const bgColor = color ? color.replace("hsl(", "hsla(").replace(")", ", 0.2)") : "rgba(255,255,255,0.2)"

  return (
    <div className="p-1 flex flex-row space-x-2 rounded-sm border-2 border-white/20" style={{ backgroundColor: bgColor }}>
      {children}
    </div>
  )
}

function Title({ children }: BadgeProps) {
  return (
    <div className="flex flex-row flex-1">
      <span className="text-white font-brains text-sm">{children}</span>
    </div>
  )
}

function Icon({ icon: IconComponent, color, iconColor }: BadgeIconProps) {
  return (
    <div className="flex items-center">
      <IconComponent color={iconColor ?? color} size={14} />
    </div>
  )
}

Badge.Title = Title
Badge.Icon = Icon

export { Badge }