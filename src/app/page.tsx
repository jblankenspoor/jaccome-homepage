/**
 * Main Page Component for Jacco's Homepage
 * @description The main page component that renders the portfolio
 * @version 3.0.0
 * @author Jacco
 */

import { Portfolio } from "@/components/ui/portfolio";
import { Metadata } from "next";

/**
 * Metadata for the page
 * @type {Metadata}
 */
export const metadata: Metadata = {
  title: "Jacco's Portfolio",
  description: "Welcome to Jacco's portfolio of projects",
};

/**
 * Home page component
 * @returns {JSX.Element} - Home page component
 */
export default function Home() {
  return (
    <Portfolio
      name="Jacco"
      title="Full Stack Developer"
      about="I'm a passionate developer with a focus on creating clean, user-friendly applications. With expertise in both frontend and backend technologies, I enjoy building complete solutions that solve real-world problems. I'm constantly learning and exploring new technologies to improve my skills."
      projects={[
        {
          title: "Personal Blog",
          description: "A minimalist blog built with HTML, CSS, and vanilla JavaScript, focusing on clean typography and user experience.",
          image: "/images/project1.jpg",
          tags: ["HTML", "CSS", "JavaScript"],
          link: "https://example.com/blog",
          github: "https://github.com/username/blog"
        },
        {
          title: "Weather Dashboard",
          description: "An interactive weather application that pulls data from a public API and displays current conditions and forecasts.",
          image: "/images/project2.jpg",
          tags: ["React", "API Integration", "Tailwind CSS"],
          link: "https://example.com/weather",
          github: "https://github.com/username/weather"
        },
        {
          title: "Task Manager",
          description: "A productivity tool that helps users organize their daily tasks with drag-and-drop functionality and localStorage persistence.",
          image: "/images/project3.jpg",
          tags: ["TypeScript", "React", "Local Storage"],
          link: "https://example.com/tasks",
          github: "https://github.com/username/tasks"
        }
      ]}
      experiences={[
        {
          company: "Tech Solutions Inc.",
          role: "Senior Developer",
          period: "2022 - Present",
          description: "Lead development for client projects, mentor junior developers, and implement best practices for code quality and performance."
        },
        {
          company: "Digital Agency XYZ",
          role: "Web Developer",
          period: "2020 - 2022",
          description: "Developed responsive web applications and collaborated with designers to implement pixel-perfect interfaces."
        },
        {
          company: "Startup ABC",
          role: "Frontend Developer",
          period: "2018 - 2020",
          description: "Built UI components and implemented modern frontend development practices."
        }
      ]}
      skills={[
        { name: "JavaScript", level: 9 },
        { name: "TypeScript", level: 8 },
        { name: "React", level: 9 },
        { name: "Node.js", level: 7 },
        { name: "HTML/CSS", level: 9 },
        { name: "Next.js", level: 8 }
      ]}
      contact={{
        email: "jacco@example.com",
        github: "https://github.com/jacco",
        linkedin: "https://linkedin.com/in/jacco"
      }}
      version="3.0.0"
    />
  );
}
