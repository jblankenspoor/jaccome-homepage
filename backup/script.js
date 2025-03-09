/**
 * Main script for Jacco's Portfolio
 * @description Handles loading and displaying project data on the portfolio page
 * @version 2.0.0
 * @author Jacco
 */

/**
 * Project data structure
 * @typedef {Object} Project
 * @property {string} title - The title of the project
 * @property {string} description - A description of the project
 * @property {string} imageUrl - Path to the project screenshot
 * @property {string} projectUrl - URL to the live project
 */

/**
 * Projects data container
 * @type {Project[]}
 */
let projects = [];

/**
 * Flag to track if projects are currently being loaded
 * @type {boolean}
 */
let isLoading = false;

/**
 * Cache for the projects data to prevent repeated fetching
 * @type {Project[]|null}
 */
let projectsCache = null;

/**
 * Fetches project data from the JSON file with caching
 * @async
 * @function fetchProjects
 * @returns {Promise<Project[]>} Promise that resolves to the array of projects
 * @throws {Error} If the fetch operation fails
 */
async function fetchProjects() {
    // Return cached projects if available
    if (projectsCache !== null) {
        return projectsCache;
    }
    
    try {
        const response = await fetch('projects.json', {
            // Add cache control to prevent browser caching issues
            cache: 'no-store',
            headers: {
                'Cache-Control': 'no-cache'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Failed to fetch projects: ${response.status}`);
        }
        
        const data = await response.json();
        // Store in cache for future use
        projectsCache = data.projects;
        return projectsCache;
    } catch (error) {
        console.error('Error loading projects:', error);
        return [];
    }
}

/**
 * Preloads an image to ensure it's in browser cache
 * @function preloadImage
 * @param {string} src - The image source URL
 * @returns {Promise<void>} Promise that resolves when image is loaded or errors
 */
function preloadImage(src) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Resolve even on error to continue flow
        img.src = src;
    });
}

/**
 * Creates and returns a project card element
 * @function createProjectCard
 * @param {Project} project - The project data to display
 * @returns {HTMLElement} - The completed project card DOM element
 */
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    // Create image element with error handling
    const img = document.createElement('img');
    img.alt = project.title;
    img.className = 'project-image';
    
    // Set a placeholder initially
    img.src = 'images/placeholder.jpg';
    
    // Then try to load the actual image
    const actualImg = new Image();
    actualImg.onload = () => {
        img.src = project.imageUrl;
    };
    actualImg.onerror = () => {
        console.warn(`Image for ${project.title} could not be loaded`);
    };
    actualImg.src = project.imageUrl;
    
    // Create project info container
    const infoDiv = document.createElement('div');
    infoDiv.className = 'project-info';
    
    // Create and populate title
    const title = document.createElement('h3');
    title.className = 'project-title';
    title.textContent = project.title;
    
    // Create and populate description
    const description = document.createElement('p');
    description.className = 'project-description';
    description.textContent = project.description;
    
    // Create and populate link
    const link = document.createElement('a');
    link.href = project.projectUrl;
    link.className = 'project-link';
    link.target = '_blank';
    link.textContent = 'View Project';
    
    // Assemble the card
    infoDiv.appendChild(title);
    infoDiv.appendChild(description);
    infoDiv.appendChild(link);
    
    card.appendChild(img);
    card.appendChild(infoDiv);
    
    return card;
}

/**
 * Displays a loading indicator while projects are being fetched
 * @function showLoading
 * @param {HTMLElement} container - The container to show loading indicator in
 */
function showLoading(container) {
    // Only show loading if not already showing
    if (!isLoading) {
        container.innerHTML = '<div class="loading">Loading projects...</div>';
        isLoading = true;
    }
}

/**
 * Shows an error message if projects cannot be loaded
 * @function showError
 * @param {HTMLElement} container - The container to show error message in
 * @param {string} message - The error message to display
 */
function showError(container, message) {
    container.innerHTML = `<div class="error">${message}</div>`;
    isLoading = false;
}

/**
 * Initializes the portfolio page by loading and displaying projects
 * @async
 * @function initPortfolio
 */
async function initPortfolio() {
    const projectsContainer = document.getElementById('projects-container');
    
    // Prevent multiple simultaneous loading attempts
    if (isLoading) return;
    
    // Show loading indicator
    showLoading(projectsContainer);
    
    try {
        // Fetch projects from JSON file
        projects = await fetchProjects();
        
        if (projects.length === 0) {
            showError(projectsContainer, 'No projects found.');
            return;
        }
        
        // Preload all images first
        const imagePromises = projects.map(project => preloadImage(project.imageUrl));
        await Promise.all(imagePromises);
        
        // Clear loading indicator
        projectsContainer.innerHTML = '';
        
        // Add all projects to the container
        projects.forEach(project => {
            const projectCard = createProjectCard(project);
            projectsContainer.appendChild(projectCard);
        });
        
        isLoading = false;
    } catch (error) {
        showError(projectsContainer, 'Failed to load projects. Please try again later.');
        console.error('Portfolio initialization error:', error);
    }
}

// Initialize the portfolio when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initPortfolio);

// Update version number in footer
document.addEventListener('DOMContentLoaded', () => {
    const versionElement = document.querySelector('.version');
    if (versionElement) {
        versionElement.textContent = 'v2.0.0';
    }
});
