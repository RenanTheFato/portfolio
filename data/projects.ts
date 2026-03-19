import { ProjectData } from "@/types/project-data"
import { SiApachemaven, SiDocker, SiFastify, SiFedora, SiFlask, SiGnometerminal, SiGnubash, SiJson, SiJsonwebtokens, SiLinux, SiNodedotjs, SiPandas, SiPoetry, SiPostgresql, SiPrisma, SiPython, SiReact, SiRedis, SiScikitlearn, SiTailwindcss, SiTypescript, SiZod } from "@icons-pack/react-simple-icons"
import { FaJava } from "react-icons/fa"

export const projects: ProjectData[] = [
  {
    title: "Hisui",
    translationKey: "hisui",
    image: "/hisui.png",
    alt: "Hisui project",
    description: "Hisui is a fullstack platform focused on empowering smarter investment decisions through data-driven insights, featuring its own machine learning model to analyze stock market behavior and support more informed financial strategies. Designed with the purpose of reducing uncertainty and improving clarity in investment management, the project emphasizes intelligent analysis and decision support, earning 2nd place in a programming competition for its innovation and impact.",
    focus: "fullstack",
    techs: [
      { icon: SiNodedotjs, label: "Node.js", color: "hsl(120, 50%, 40%)" },
      { icon: SiTypescript, label: "Typescript", color: "hsl(205, 100%, 40%)" },
      { icon: SiFastify, label: "Fastify", color: "hsl(0, 0%, 0%)", iconColor: "hsl(255, 100%, 100%)" },
      { icon: SiJson, label: "JSON", color: "hsl(0, 0%, 0%)", iconColor: "hsl(255, 100%, 100%)" },
      { icon: SiJsonwebtokens, label: "JWT", color: "hsl(0, 0%, 0%)", iconColor: "hsl(255, 100%, 100%)" },
      { icon: SiPostgresql, label: "Postgresql", color: "hsl(210, 50%, 38%)" },
      { icon: SiPrisma, label: "Prisma", color: "hsl(165, 81%, 41%)" },
      { icon: SiZod, label: "Zod", color: "hsl(215, 58%, 45%)" },
      { icon: SiPython, label: "Python", color: "hsl(207, 49%, 42%)" },
      { icon: SiPoetry, label: "Poetry", color: "hsl(180, 100%, 36%)" },
      { icon: SiFlask, label: "Flask", color: "hsl(0, 0%, 0%)", iconColor: "hsl(255, 100%, 100%)" },
      { icon: SiPandas, label: "Pandas", color: "hsl(270, 63%, 33%)" },
      { icon: SiScikitlearn, label: "Sci Kit Learn", color: "hsl(27, 100%, 57%)" },
    ],
    links: {
      github: { url: "https://github.com/RenanTheFato/Hisui" }
    }
  },
  {
    title: "LogAnalyzer",
    translationKey: "logAnalyzer",
    image: "/log-analyzer-cli.png",
    alt: "LogAnalyzer project",
    description: "Log Analyzer is a command-line interface tool built with Java for analyzing log files directly from your terminal. It allows you to filter log content by level, keywords, and date, displaying results in a structured format and exporting the output to a text file automatically.",
    focus: "backend",
    techs: [
      { icon: FaJava, label: "Java", color: "hsl(29, 100%, 45%)" },
      { icon: SiApachemaven, label: "Maven", color: "hsl(350, 77%, 44%)" },
      { icon: SiGnometerminal, label: "Command Line", color: "hsl(1, 100%, 100%)" },
    ],
    links: {
      github: { url: "https://github.com/RenanTheFato/log-analyzer-cli" },
      project: { url: "https://github.com/RenanTheFato/log-analyzer-cli" }
    }
  },
  {
    title: "Reservation API",
    translationKey: "reservationApi",
    image: "/reservation-api.png",
    alt: "Reservation API project",
    description: "Reservation API is a robust RESTful backend application built with Node.js and TypeScript for managing reservations of rooms, resources, or services. It features role-based authentication and authorization, structured CRUD operations, and advanced business logic to handle booking rules and availability. The system leverages PostgreSQL for persistent storage, Redis for caching and background job processing, and Docker for easy containerized deployment. With automated tasks for reservation status management and integrated Swagger documentation, the API delivers a scalable, organized, and production-ready solution for scheduling systems.",
    focus: "backend",
    techs: [
      { icon: SiNodedotjs, label: "Node.js", color: "hsl(120, 50%, 40%)" },
      { icon: SiTypescript, label: "Typescript", color: "hsl(205, 100%, 40%)" },
      { icon: SiRedis, label: "Redis", color: "hsl(346.697, 100%, 43.333%)" },
      { icon: SiFastify, label: "Fastify", color: "hsl(0, 0%, 0%)", iconColor: "hsl(255, 100%, 100%)" },
      { icon: SiPostgresql, label: "Postgresql", color: "hsl(210, 50%, 38%)" },
      { icon: SiDocker, label: "Docker", color: "hsl(205, 100%, 40%)" },
    ],
    links: {
      github: { url: "https://github.com/RenanTheFato/Reservation-API" },
    }
  },
  {
    title: "Thermal Shell Script",
    translationKey: "thermalScript",
    image: "/thermal-script.png",
    alt: "Thermal Shell Script project",
    description: "Thermal Shell Script is a command-line tool built with Bash for monitoring CPU and hardware temperatures directly from your terminal. It reads sensor data natively from the Linux kernel filesystem, requiring no external dependencies, and displays results with color-coded status indicators based on configurable temperature thresholds.",
    focus: "backend",
    techs: [
      { icon: SiGnubash, label: "Bash", color: "hsl(101.504, 64.251%, 40.588%)" },
      { icon: SiFedora, label: "Fedora", color: "hsl(204.526, 64.929%, 58.627%)" },
      { icon: SiLinux, label: "Linux", color: "hsl(45, 97.297%, 56.471%)" },
    ],
    links: {
      github: { url: "https://github.com/RenanTheFato/thermal-shell-script" }
    }
  },
  {
    title: "Goat Music",
    translationKey: "goatMusic",
    image: "/goat-music.png",
    alt: "Goat Music project",
    description: "Goat Music is a modern music streaming web application built with React, TypeScript, and Tailwind CSS, designed to deliver a smooth and visually engaging user experience. It connects to a backend service for managing audio files and media assets, allowing users to upload songs and album covers while providing full control over playback. With features like dynamic sound wave visualizations, music filtering, and responsive design for both desktop and mobile, the application offers a clean, intuitive interface for interacting with personal music libraries.",
    focus: "frontend",
    techs: [
      { icon: SiReact, label: "React", color: "hsl(222, 13.514%, 14.51%)", iconColor: "hsl(205, 100%, 40%)"},
      { icon: SiTypescript, label: "Typescript", color: "hsl(205, 100%, 40%)" },
      { icon: SiTailwindcss, label: "Tailwindcss", color: "hsl(165, 81%, 41%)", iconColor: "hsl(255, 100%, 100%)" },
      { icon: SiNodedotjs, label: "Node.js", color: "hsl(120, 50%, 40%)" },
      { icon: SiJson, label: "Json", color: "hsl(0, 0%, 0%)", iconColor: "hsl(255, 100%, 100%)" },
    ],
    links: {
      github: { url: "https://github.com/RenanTheFato/GoatMusic" },
    }
  },
    {
    title: "Social Media API",
    translationKey: "socialMediaApi",
    image: "/social-media.png",
    alt: "Social Media API project",
    description: "Social Media API is a RESTful backend application built with Node.js and TypeScript for managing core social network functionalities. It provides secure JWT-based authentication, user management, post creation, commenting, and a follow system, all powered by a PostgreSQL database. The API is designed with a modular architecture, delivering organized, scalable endpoints and automatic interactive documentation via Swagger.",
    focus: "backend",
    techs: [
      { icon: SiNodedotjs, label: "Node.js", color: "hsl(120, 50%, 40%)" },
      { icon: SiTypescript, label: "Typescript", color: "hsl(205, 100%, 40%)" },
      { icon: SiFastify, label: "Fastify", color: "hsl(0, 0%, 0%)", iconColor: "hsl(255, 100%, 100%)" },
      { icon: SiJsonwebtokens, label: "JWT", color: "hsl(0, 0%, 0%)", iconColor: "hsl(255, 100%, 100%)" },
      { icon: SiPostgresql, label: "Postgresql", color: "hsl(210, 50%, 38%)" },
    ],
    links: {
      github: { url: "https://github.com/RenanTheFato/Social-Media-API" },
    }
  },
]