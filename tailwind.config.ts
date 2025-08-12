import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'creser': {
          blue: '#6B83BD',
          purple: '#554781',
          dark: '#282557',
          gold: '#B39A41',
          white: '#F3F3F1',
          lavender: '#988BA9',
          'light-blue': '#95B8E4',
          beige: '#C9C09A',
          'pale-lavender': '#C5B6CA',
          teal: '#2F5C78',
        },
        'gradient': {
          primary: 'var(--color-gradient-primary)',
          secondary: 'var(--color-gradient-secondary)',
          accent: 'var(--color-gradient-accent)',
          hero: 'var(--color-gradient-hero)',
        }
      },
      fontFamily: {
        'primary': 'var(--font-primary)',
        'display': 'var(--font-display)',
      },
      boxShadow: {
        'glow': 'var(--shadow-glow)',
        'card': 'var(--shadow-card)',
        'elevated': 'var(--shadow-elevated)',
      },
      animation: {
        'gradient-shift': 'gradientShift 12s ease infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'slide-in-up': 'slideInUp 0.6s ease-out',
        'hover-lift': 'hoverLift 0.3s ease-out',
        'card-glow': 'cardGlow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        hoverLift: {
          '0%': { transform: 'translateY(0)', boxShadow: 'var(--shadow-card)' },
          '100%': { transform: 'translateY(-8px)', boxShadow: 'var(--shadow-elevated)' },
        },
        cardGlow: {
          '0%': { boxShadow: 'var(--shadow-card)' },
          '100%': { boxShadow: 'var(--shadow-glow)' },
        },
      },
      backgroundImage: {
        'gradient-primary': 'var(--color-gradient-primary)',
        'gradient-secondary': 'var(--color-gradient-secondary)',
        'gradient-accent': 'var(--color-gradient-accent)',
        'gradient-hero': 'var(--color-gradient-hero)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      transitionDuration: {
        'slow': 'var(--animate-duration-slow)',
        'normal': 'var(--animate-duration-normal)',
        'fast': 'var(--animate-duration-fast)',
      }
    },
  },
  plugins: [],
};

export default config; 