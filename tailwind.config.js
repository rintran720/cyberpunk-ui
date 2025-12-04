/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette - Deep Ocean
        primary: {
          50: '#eef9ff',
          100: '#d9f1ff',
          200: '#bce8ff',
          300: '#8edaff',
          400: '#59c3ff',
          500: '#33a6ff',
          600: '#1b87f5',
          700: '#146fe1',
          800: '#1759b6',
          900: '#194c8f',
          950: '#142f57',
        },
        // Secondary palette - Electric Violet
        secondary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c22ce',
          800: '#6821a8',
          900: '#551c87',
          950: '#3b0764',
        },
        // Accent palette - Cyber Lime
        accent: {
          50: '#f4ffe6',
          100: '#e5ffc9',
          200: '#ccff99',
          300: '#a8ff5c',
          400: '#85f728',
          500: '#65dd09',
          600: '#4ab102',
          700: '#398607',
          800: '#30690c',
          900: '#2a590f',
          950: '#123202',
        },
        // Surface colors for 3D effects
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      boxShadow: {
        // 3D shadow effects
        '3d-sm': '0 2px 0 0 rgba(0,0,0,0.2), 0 4px 8px -2px rgba(0,0,0,0.15)',
        '3d': '0 4px 0 0 rgba(0,0,0,0.25), 0 8px 16px -4px rgba(0,0,0,0.2)',
        '3d-lg': '0 6px 0 0 rgba(0,0,0,0.3), 0 12px 24px -6px rgba(0,0,0,0.25)',
        '3d-xl': '0 8px 0 0 rgba(0,0,0,0.35), 0 16px 32px -8px rgba(0,0,0,0.3)',
        // Pressed state shadows
        '3d-pressed': '0 1px 0 0 rgba(0,0,0,0.2), 0 2px 4px -1px rgba(0,0,0,0.15)',
        // Glow effects
        'glow-primary': '0 0 20px rgba(51, 166, 255, 0.4)',
        'glow-secondary': '0 0 20px rgba(168, 85, 247, 0.4)',
        'glow-accent': '0 0 20px rgba(101, 221, 9, 0.4)',
        // Inner shadows for depth
        'inner-3d': 'inset 0 2px 4px 0 rgba(0,0,0,0.1)',
        'inner-3d-top': 'inset 0 2px 0 0 rgba(255,255,255,0.2)',
      },
      animation: {
        'press-3d': 'press3d 0.1s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'bounce-subtle': 'bounceSubtle 0.6s ease-out',
        // Dialog animations
        'in': 'animateIn 0.2s ease-out',
        'out': 'animateOut 0.2s ease-in',
        'fade-in': 'fadeIn 0.2s ease-out',
        'fade-out': 'fadeOut 0.2s ease-in',
        'zoom-in': 'zoomIn 0.2s ease-out',
        'zoom-out': 'zoomOut 0.2s ease-in',
        'slide-in-from-top': 'slideInFromTop 0.3s ease-out',
        'slide-in-from-bottom': 'slideInFromBottom 0.3s ease-out',
        'dialog-show': 'dialogShow 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'dialog-hide': 'dialogHide 0.2s ease-in',
        'overlay-show': 'overlayShow 0.3s ease-out',
        'overlay-hide': 'overlayHide 0.2s ease-in',
      },
      keyframes: {
        press3d: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(4px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(51, 166, 255, 0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(51, 166, 255, 0.6)' },
        },
        bounceSubtle: {
          '0%': { transform: 'translateY(0)' },
          '30%': { transform: 'translateY(-4px)' },
          '50%': { transform: 'translateY(0)' },
          '70%': { transform: 'translateY(-2px)' },
          '100%': { transform: 'translateY(0)' },
        },
        // Dialog keyframes
        animateIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        animateOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.95)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        zoomOut: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0.95)' },
        },
        slideInFromTop: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInFromBottom: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        dialogShow: {
          '0%': { opacity: '0', transform: 'translate(-50%, -48%) scale(0.96)' },
          '100%': { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
        },
        dialogHide: {
          '0%': { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
          '100%': { opacity: '0', transform: 'translate(-50%, -48%) scale(0.96)' },
        },
        overlayShow: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        overlayHide: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      backgroundImage: {
        // Gradient for 3D surface lighting
        '3d-surface': 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.05) 100%)',
        '3d-surface-dark': 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.2) 100%)',
      },
    },
  },
  plugins: [],
}

