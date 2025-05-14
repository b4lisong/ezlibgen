/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          gray: {
            100: '#f3f4f6',
            300: '#d1d5db',
            500: '#6b7280',
            600: '#4b5563',
            800: '#1f2937',
          },
          blue: {
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
          },
          green: {
            50: '#f0fdf4',
            200: '#bbf7d0',
            500: '#22c55e',
            600: '#16a34a',
            700: '#15803d',
          },
          red: {
            100: '#fee2e2',
            800: '#991b1b',
          },
        },
      },
    },
    plugins: [],
  }