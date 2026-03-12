import { ProjectData } from "@/types/project-data";
import { FaJava } from "react-icons/fa";

export const projects: ProjectData[] = [
  {
    title: "LogAnalyzer",
    image: "/log-analyzer.png",
    alt: "LogAnalyzer project",
    techs: [
      { icon: FaJava, label: "Java", color: "#3178C6" },
    ],
  },
]