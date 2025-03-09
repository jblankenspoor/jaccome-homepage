/**
 * Portfolio Component for Jacco's Homepage
 * @description The main portfolio component that displays personal information, projects, experience, and skills
 * @version 3.0.1
 * @author Jacco
 */

import React from "react";
import { Badge } from "./badge";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";
import Link from "next/link";
import { Github, Mail, Linkedin, ExternalLink } from "lucide-react";

/**
 * Project interface
 * @interface Project
 * @property {string} title - Project title
 * @property {string} description - Project description
 * @property {string} image - Project image URL
 * @property {string[]} tags - Project tags/technologies
 * @property {string} [link] - Optional link to live project
 * @property {string} [github] - Optional link to GitHub repository
 */
interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
}

/**
 * Experience interface
 * @interface Experience
 * @property {string} company - Company name
 * @property {string} role - Job role/title
 * @property {string} period - Time period of employment
 * @property {string} description - Job description
 */
interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

/**
 * Skill interface
 * @interface Skill
 * @property {string} name - Skill name
 * @property {number} level - Skill proficiency level (1-10)
 */
interface Skill {
  name: string;
  level: number;
}

/**
 * Portfolio component props interface
 * @interface PortfolioProps
 * @property {string} name - Your name
 * @property {string} title - Your professional title
 * @property {string} about - About you text
 * @property {Project[]} projects - Array of projects
 * @property {Experience[]} experiences - Array of work experiences
 * @property {Skill[]} skills - Array of skills
 * @property {Object} contact - Contact information
 * @property {string} contact.email - Email address
 * @property {string} [contact.github] - Optional GitHub profile URL
 * @property {string} [contact.linkedin] - Optional LinkedIn profile URL
 */
interface PortfolioProps {
  name: string;
  title: string;
  about: string;
  projects: Project[];
  experiences: Experience[];
  skills: Skill[];
  contact: {
    email: string;
    github?: string;
    linkedin?: string;
  };
  version: string;
}

/**
 * Portfolio component for displaying personal information, projects, experience, and skills
 * @param {PortfolioProps} props - Component props
 * @returns {JSX.Element} - Portfolio component
 */
export function Portfolio({
  name,
  title,
  about,
  projects,
  experiences,
  skills,
  contact,
  version,
}: PortfolioProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">{name}</h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">This site is experimental and not a reflection of my skills</p>
            <div className="flex gap-4">
              {contact.email && (
                <Link href={`mailto:${contact.email}`}>
                  <Button className="h-10 w-10 rounded-full p-0">
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </Button>
                </Link>
              )}
              {contact.github && (
                <Link href={contact.github} target="_blank" rel="noopener noreferrer">
                  <Button className="h-10 w-10 rounded-full p-0">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
              )}
              {contact.linkedin && (
                <Link href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                  <Button className="h-10 w-10 rounded-full p-0">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-center">I am an AI tool developer who specializes in creating innovative applications using AI IDEs. My focus is on leveraging advanced AI technologies to build efficient and effective tools that enhance productivity and creativity.</p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden h-full flex flex-col">
                <div className="relative h-48 bg-muted">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="flex-1 flex flex-col p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} className="bg-secondary text-secondary-foreground">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-auto">
                    {project.github && (
                      <Link href={project.github} target="_blank" rel="noopener noreferrer">
                        <Button className="h-9 px-3 border border-input bg-primary text-primary-foreground hover:bg-primary/80">
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </Button>
                      </Link>
                    )}
                    {project.link && (
                      <Link href={project.link} target="_blank" rel="noopener noreferrer">
                        <Button className="h-9 px-3 border border-input bg-primary text-primary-foreground hover:bg-primary/80">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Demo
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Experience</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {experiences.map((experience, index) => (
              <div key={index} className="relative pl-8 border-l-2 border-primary/30">
                <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-1"></div>
                <h3 className="text-xl font-bold">{experience.role}</h3>
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium">{experience.company}</p>
                  <p className="text-sm text-muted-foreground">{experience.period}</p>
                </div>
                <p className="text-muted-foreground">{experience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Skills</h2>
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{skill.name}</h3>
                  <span className="text-sm text-muted-foreground">{skill.level}/10</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: `${(skill.level / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground"> {new Date().getFullYear()} {name}. All rights reserved.</p>
            <p className="text-sm text-muted-foreground">v{version}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
