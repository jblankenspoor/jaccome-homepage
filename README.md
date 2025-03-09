# Jacco's Portfolio

A modern, responsive portfolio website built with Next.js and Tailwind CSS to showcase personal projects, skills, and experience.

## Features

- Clean, modern design with responsive layout
- Project showcase with images, descriptions, tags, and links
- Experience timeline with company history
- Skills section with proficiency indicators
- Contact information with social links
- Built with Next.js and Tailwind CSS for optimal performance
- TypeScript for type safety and better developer experience
- JSDoc comments for comprehensive documentation

## Structure

- `src/app/` - Next.js app directory with page components
- `src/components/ui/` - Reusable UI components
- `src/lib/` - Utility functions and helpers
- `public/images/` - Directory for project images and assets

## How to Use

### Prerequisites

- Node.js 16.8.0 or later
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the portfolio.

### Build for Production

```bash
# Build the project
npm run build

# Start the production server
npm start
```

## How to Customize

Edit the `page.tsx` file in the `src/app` directory to update your personal information, projects, experiences, and skills:

```typescript
<Portfolio
  name="Your Name"
  title="Your Professional Title"
  about="Your bio goes here..."
  projects={[
    {
      title: "Project Title",
      description: "Project description",
      image: "/images/project-image.jpg",
      tags: ["React", "TypeScript", "Tailwind"],
      link: "https://example.com/project",
      github: "https://github.com/username/project"
    },
    // Add more projects here
  ]}
  // Other properties...
/>
```

## Version History

- v3.0.0 - Complete redesign with Next.js and Tailwind CSS
- v2.0.0 - Previous version (vanilla JavaScript)
- v1.0.0 - Initial release

## Usage

Run the development server to view the portfolio locally, or deploy to your preferred hosting platform.
