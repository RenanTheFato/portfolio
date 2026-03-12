import { IconType } from "@icons-pack/react-simple-icons";
import { IconType as RcIconType } from "react-icons";

export type ProjectData = {
  title: string
  image: string
  alt: string
  techs: {
    icon: IconType | RcIconType
    label: string
    color: string
  }[]
}