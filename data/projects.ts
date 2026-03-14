import { ProjectData } from "@/types/project-data"
import { SiApachemaven, SiGnometerminal } from "@icons-pack/react-simple-icons"
import { FaJava } from "react-icons/fa"

export const projects: ProjectData[] = [
  {
    title: "LogAnalyzer",
    image: "/log-analyzer.png",
    alt: "LogAnalyzer project",
    description: "Log Analyzer is a command-line interface tool built with Java for analyzing log files directly from your terminal. It allows you to filter log content by level, keywords, and date, displaying results in a structured format and exporting the output to a text file automatically.",
    focus: "backend",
    techs: [
      { icon: FaJava, label: "Java", color: "hsl(29, 100%, 45%)" },
      { icon: SiApachemaven, label: "Maven", color: "hsl(350, 77%, 44%)" },
      { icon: SiGnometerminal, label: "CLI", color: "hsl(1, 100%, 100%)" },
    ],
    links: {
      github: {
        url: "https://github.com/RenanTheFato/log-analyzer-cli",
      },
      project: {
        url: "https://github.com/RenanTheFato/log-analyzer-cli"
      }
    }
  },
]