# Jacco's Portfolio

A modern, single-page portfolio website to showcase personal projects.

## Features

- Clean, responsive design
- Project showcase with screenshots, descriptions, and links
- No database required - all project data stored in JavaScript
- Easy to update and maintain

## Structure

- `index.html` - Main HTML document
- `styles.css` - All styling for the site
- `script.js` - JavaScript functionality and project data
- `images/` - Directory for project screenshots

## How to Add Projects

Edit the `projects` array in `script.js` to add your own projects:

```javascript
const projects = [
    {
        title: "Your Project Title",
        description: "Description of your project",
        imageUrl: "images/your-project-image.jpg",
        projectUrl: "https://example.com/your-project"
    },
    // Add more projects here
];
```

## Version History

- v1.0.0 - Initial release

## Usage

Simply open `index.html` in a web browser to view the portfolio.
