const fs = require('fs');
const path = require('path');

// Simple CSS builder for Tailwind v4
const inputCss = fs.readFileSync('input.css', 'utf8');

// For now, let's create a basic CSS file with common utilities
// This is a simplified approach for demonstration
const outputCss = `
/* Tailwind CSS - Production Build */

/* Base styles */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Utilities */
.bg-gray-50 { background-color: rgb(249 250 251); }
.bg-white { background-color: rgb(255 255 255); }
.bg-primary { background-color: rgb(99 102 241); }
.bg-accent { background-color: rgb(251 146 60); }

.min-h-screen { min-height: 100vh; }
.p-4 { padding: 1rem; }
.p-6 { padding: 1.5rem; }
.p-8 { padding: 2rem; }
.p-3 { padding: 0.75rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }

.mt-4 { margin-top: 1rem; }
.mt-8 { margin-top: 2rem; }
.mt-3 { margin-top: 0.75rem; }
.mb-10 { margin-bottom: 2.5rem; }
.mb-2 { margin-bottom: 0.5rem; }

.max-w-4xl { max-width: 56rem; }
.mx-auto { margin-left: auto; margin-right: auto; }
.w-full { width: 100%; }

.text-center { text-align: center; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
.text-white { color: rgb(255 255 255); }
.text-gray-900 { color: rgb(17 24 39); }
.text-gray-600 { color: rgb(75 85 99); }
.text-gray-700 { color: rgb(55 65 81); }
.text-gray-800 { color: rgb(31 41 55); }
.text-gray-500 { color: rgb(107 114 128); }
.text-red-600 { color: rgb(220 38 38); }

.font-sans { font-family: ui-sans-serif, system-ui, sans-serif; }
.font-bold { font-weight: 700; }
.font-extrabold { font-weight: 800; }
.font-medium { font-weight: 500; }

.border { border-width: 1px; }
.border-gray-100 { border-color: rgb(243 244 246); }
.border-gray-300 { border-color: rgb(209 213 219); }
.border-primary { border-color: rgb(99 102 241); }

.rounded-lg { border-radius: 0.5rem; }
.rounded-xl { border-radius: 0.75rem; }

.shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
.shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
.shadow-inner { box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06); }

.grid { display: grid; }
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.gap-8 { gap: 2rem; }

.focus\\:outline-none:focus { outline: 2px solid transparent; outline-offset: 2px; }
.focus\\:ring-primary:focus { --tw-ring-color: rgb(99 102 241); }
.focus\\:ring-4:focus { --tw-ring-width: 4px; }
.focus\\:ring-indigo-500:focus { --tw-ring-color: rgb(99 102 241); }
.focus\\:ring-opacity-50:focus { --tw-ring-opacity: 0.5; }
.focus\\:ring-orange-500:focus { --tw-ring-color: rgb(249 115 22); }

.hover\\:bg-indigo-700:hover { background-color: rgb(67 56 202); }
.hover\\:bg-orange-600:hover { background-color: rgb(234 88 12); }
.hover\\:scale-\\[1\\.01\\]:hover { transform: scale(1.01); }

.transition { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
.duration-150 { transition-duration: 150ms; }
.duration-300 { transition-duration: 300ms; }
.ease-in-out { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }

.resize-none { resize: none; }
.block { display: block; }

.hidden { display: none; }
.disabled\\:bg-gray-400:disabled { background-color: rgb(156 163 175); }

/* Custom styles for output text area */
#output-json {
  font-family: 'Consolas', 'Monaco', monospace;
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* Responsive */
@media (min-width: 640px) {
  .sm\\:p-8 { padding: 2rem; }
  .sm\\:text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
  .sm\\:p-8 { padding: 2rem; }
}

@media (min-width: 1024px) {
  .lg\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
`;

fs.writeFileSync('style.css', outputCss);
console.log('CSS built successfully!');