/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
            100: "rgb(var(--color-primary-100) / <alpha-value>)",
            200: "rgb(var(--color-primary-200) / <alpha-value>)",
            300: "rgb(var(--color-primary-300) / <alpha-value>)",
            400: "rgb(var(--color-primary-400) / <alpha-value>)",
            500: "rgb(var(--color-primary-500) / <alpha-value>)",
            600: "rgb(var(--color-primary-600) / <alpha-value>)",
            700: "rgb(var(--color-primary-700) / <alpha-value>)",
          },
          accent: "rgb(var(--color-accent) / <alpha-value>)",
          danger: "rgb(var(--color-danger) / <alpha-value>)",
          background: {
            light: "#f9fafb",
            dark: "#1f2937",
          },
        },
        fontFamily: {
          sans: ['var(--font-sans)', 'sans-serif'],
          serif: ['var(--font-serif)', 'serif'],
          mono: ['var(--font-mono)', 'monospace'],
        },
        spacing: {
          header: "40px",
          footer: "32px",
        },
      },
    },
    plugins: [],
  };
  
  
  
  