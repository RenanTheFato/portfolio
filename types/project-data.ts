import { IconType } from "@icons-pack/react-simple-icons";
import { IconType as RcIconType } from "react-icons";

export interface TechItem {
  icon: IconType | RcIconType
  label: string
  color: string
}

export interface ProjectData {
  title: string
  image: string
  alt: string
  description: string
  focus: "frontend" | "backend" | "fullstack"
  techs: TechItem[]
}