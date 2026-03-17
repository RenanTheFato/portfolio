export interface ContactChipProps {
  label: string
  value: string
  href: string
  icon: React.ElementType |  string
  isSvg?: boolean
  color: string
  accentBg: string
  accentBorder: string
  copyable?: boolean
}