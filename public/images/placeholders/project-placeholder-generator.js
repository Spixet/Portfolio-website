// Generate beautiful project placeholder SVGs
const fs = require('fs');
const path = require('path');

const placeholdersPath = path.join(process.cwd(), 'public', 'images', 'placeholders');

// Ensure the directory exists
if (!fs.existsSync(placeholdersPath)) {
  fs.mkdirSync(placeholdersPath, { recursive: true });
}

// Define project types and their associated colors/icons
const projects = [
  {
    name: 'ai-project',
    title: 'AI Project',
    gradient: ['#8B5CF6', '#6D28D9'],
    icon: `<path d="M10 4c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zM17 14.1c0-.8-.3-1.6-.9-2.1l-2.5-2.5c-.1-.1-.2-.3-.2-.5v-1c0-.2.1-.5.3-.7.1-.1.3-.2.4-.3.2-.1.3-.2.4-.4.2-.1.3-.3.4-.5.1-.2.1-.4.1-.6 0-.2 0-.4-.1-.6 0-.2-.1-.4-.2-.5-.1-.2-.2-.3-.4-.5-.1-.1-.3-.2-.5-.3-.1-.1-.3-.2-.5-.2-.2-.1-.4-.1-.6-.1-.6 0-1.1.2-1.5.6-.4.4-.6.9-.6 1.5v3c0 .2-.1.5-.3.7L10 10.9c-.6.6-.9 1.3-.9 2.1 0 .3.1.6.2.9l1.3 2.8c.1.2.3.5.5.7.2.2.4.4.7.5.3.1.5.2.8.2 1.1 0 2-.9 2-2v-1.2c0-.3.1-.6.4-.8l1.8-1.5c.3-.2.8-.2 1.1 0 .7.5 1.1 1.4.9 2.1-.3 1-.8 1.9-1.5 2.6-.1.1-.1.3-.1.4v1.5c0 .7.2 1.2.6 1.7.4.4 1 .7 1.7.7h4.2c.5 0 1-.2 1.4-.5.4-.4.6-.8.6-1.3v-2c0-.8-.3-1.6-.9-2.1l-2.5-2.5z" fill="currentColor" opacity="0.8"/>`
  },
  {
    name: 'web-project',
    title: 'Web Project',
    gradient: ['#3B82F6', '#1D4ED8'],
    icon: `<path d="M21 9v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h7m5 2v5a2 2 0 01-2 2H5M11 3v4c0 1.1.9 2 2 2h4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`
  },
  {
    name: 'iot-project',
    title: 'IoT Project',
    gradient: ['#10B981', '#047857'],
    icon: `<path d="M17 10L15 12M15 8L17 10M7 10L9 8M9 12L7 10M12 12L12 14M12 6L12 8M3.54686 5.6184C4.61607 3.99751 6.79047 3.00519 8.99986 3.00519C9.95293 3.00519 10.3294 3.00519 11.8542 3.5C14.5129 4.40384 16.5961 6.48702 17.5 9.14583C17.9948 10.6706 17.9948 11.047 17.9948 12.0001C17.9948 14.2095 17.0025 16.3839 15.3816 17.4531C14.5553 18.0122 13.5791 18.3437 12.5664 18.4166C12.3825 18.4276 12.1923 18.4269 12 18.4144C11.8077 18.4269 11.6175 18.4276 11.4336 18.4166C10.4209 18.3437 9.44473 18.0122 8.6184 17.4531C6.99751 16.3839 6.00519 14.2095 6.00519 12.0001C6.00519 11.047 6.00519 10.6706 6.5 9.14583C6.71841 8.50447 7.00455 7.89797 7.35143 7.34185" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`
  },
  {
    name: 'weather-project',
    title: 'Weather Project',
    gradient: ['#38BDF8', '#0284C7'],
    icon: `<path d="M8 16.5a4.5 4.5 0 101.06-2.9A5.5 5.5 0 0116.5 8a.75.75 0 001.5 0A7 7 0 0015 1.5a.75.75 0 000 1.5 5.5 5.5 0 014.244 9.046A4.493 4.493 0 0016.5 10a.75.75 0 000 1.5c1.202 0 2.296.482 3.096 1.265A4.497 4.497 0 0121 16.5a4.5 4.5 0 11-9 0z" fill="currentColor" opacity="0.8"/>`
  },
  {
    name: 'ai-recognition',
    title: 'AI Recognition',
    gradient: ['#8B5CF6', '#4C1D95'],
    icon: `<path d="M12 15a3 3 0 100-6 3 3 0 000 6z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" fill="none" stroke="currentColor" stroke-width="1.5"/>`
  },
  {
    name: 'portfolio-project',
    title: 'Portfolio',
    gradient: ['#EC4899', '#BE185D'],
    icon: `<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M16.24 7.76a6 6 0 010 8.49m-8.48-.01a6 6 0 010-8.49m11.31-2.82a10 10 0 010 14.14m-14.14 0a10 10 0 010-14.14" fill="none" stroke="currentColor" stroke-width="1.5"/>`
  },
  {
    name: 'chatbot-project',
    title: 'Chatbot',
    gradient: ['#F97316', '#C2410C'],
    icon: `<path d="M21 15a2 2 0 01-2 2h-2a2 2 0 01-2-2v-1a2 2 0 012-2h2a2 2 0 012 2v1zm-6-6a2 2 0 01-2 2h-2a2 2 0 01-2-2V8a2 2 0 012-2h2a2 2 0 012 2v1zm-6 6a2 2 0 01-2 2H5a2 2 0 01-2-2v-1a2 2 0 012-2h2a2 2 0 012 2v1z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`
  },
  {
    name: 'default-project',
    title: 'Project',
    gradient: ['#6366F1', '#4F46E5'],
    icon: `<path d="M12 18v-6m0 0V6m0 6h6m-6 0H6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`
  }
];

// SVG template
const createSvg = (title, gradient, icon) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
  <!-- Background -->
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${gradient[0]}" />
      <stop offset="100%" stop-color="${gradient[1]}" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="10" />
      <feOffset dx="5" dy="5" />
      <feComposite operator="out" in="SourceGraphic" />
    </filter>
  </defs>
  
  <!-- Main Background -->
  <rect width="800" height="400" fill="url(#grad)" rx="15" ry="15"/>
  
  <!-- Pattern -->
  <g fill="#FFFFFF" opacity="0.1">
    ${Array.from({ length: 10 }, (_, i) => 
      Array.from({ length: 5 }, (_, j) => 
        `<circle cx="${80 * i + 40}" cy="${80 * j + 40}" r="${Math.random() * 15 + 5}" />`
      ).join('')
    ).join('')}
  </g>
  
  <!-- Center Icon and Text -->
  <g transform="translate(400, 200)">
    <!-- Icon Background -->
    <circle cx="0" cy="-20" r="60" fill="#FFFFFF" opacity="0.2" />
    
    <!-- Icon -->
    <g transform="translate(-24, -44) scale(2)" fill="#FFFFFF" stroke="#FFFFFF">
      ${icon}
    </g>
    
    <!-- Project Title -->
    <text x="0" y="80" font-family="'Arial', sans-serif" font-size="32" font-weight="bold" fill="#FFFFFF" text-anchor="middle">${title}</text>
  </g>
  
  <!-- Bottom Tag -->
  <g transform="translate(400, 360)">
    <rect x="-100" y="-20" width="200" height="40" rx="20" ry="20" fill="#FFFFFF" opacity="0.2"/>
    <text x="0" y="5" font-family="'Arial', sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF" text-anchor="middle">VIEW PROJECT</text>
  </g>
</svg>`;

// Generate all SVGs
projects.forEach(project => {
  const svgContent = createSvg(project.title, project.gradient, project.icon);
  const filePath = path.join(placeholdersPath, `${project.name}.svg`);
  
  fs.writeFileSync(filePath, svgContent);
  console.log(`Created ${filePath}`);
});

console.log('All placeholder SVGs generated successfully!');
