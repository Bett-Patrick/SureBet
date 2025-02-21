/** @type {import('tailwindcss').Config} */
import scrollbar from 'tailwind-scrollbar'; // Use CommonJS syntax

export const content = [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}', // Make sure all files with Tailwind classes are included
];
export const theme = {
  extend: {
    colors: {
      silver: '#C0C0C0',
    },
    keyframes: {
      "infinite-scroll": {
        "0%": { transform: "translateX(0)" },
        "100%": { transform: "translateX(calc(-50% - 20px))" }
      },
    },
    animation: {
      "infinite-scroll": "infinite-scroll 20s linear infinite",
    },
  },
};
export const plugins = [
  scrollbar, // Ensure the plugin is properly installed
];
