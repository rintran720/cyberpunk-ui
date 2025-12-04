/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./.storybook/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary palette - Cyber Cyan #40F4FF
        primary: {
          50: "#e0f9ff",
          100: "#b3f0ff",
          200: "#80e6ff",
          300: "#4ddcff",
          400: "#40f4ff",
          500: "#40f4ff",
          600: "#36d9e6",
          700: "#2cbecc",
          800: "#22a3b3",
          900: "#188899",
          950: "#0e6d66",
        },
        // Secondary palette - Electric Violet
        secondary: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7c22ce",
          800: "#6821a8",
          900: "#551c87",
          950: "#3b0764",
        },
        // Accent palette - Cyber Lime
        accent: {
          50: "#f4ffe6",
          100: "#e5ffc9",
          200: "#ccff99",
          300: "#a8ff5c",
          400: "#85f728",
          500: "#65dd09",
          600: "#4ab102",
          700: "#398607",
          800: "#30690c",
          900: "#2a590f",
          950: "#123202",
        },
        // Surface colors for 3D effects
        surface: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
      },
      boxShadow: {
        // Cyberpunk neon glow effects
        "cyber-primary":
          "0 0 10px rgba(64, 244, 255, 0.6), 0 0 20px rgba(64, 244, 255, 0.4), 0 0 30px rgba(64, 244, 255, 0.2)",
        "cyber-secondary":
          "0 0 10px rgba(255, 0, 255, 0.6), 0 0 20px rgba(255, 0, 255, 0.4), 0 0 30px rgba(255, 0, 255, 0.2)",
        "cyber-accent":
          "0 0 10px rgba(64, 244, 255, 0.6), 0 0 20px rgba(64, 244, 255, 0.4), 0 0 30px rgba(64, 244, 255, 0.2)",
        "cyber-glow":
          "0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor",
        "cyber-glow-lg":
          "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor",
        // Border glow
        "cyber-border": "0 0 10px currentColor, inset 0 0 10px currentColor",
        "cyber-border-lg": "0 0 20px currentColor, inset 0 0 20px currentColor",
        // Inner glow
        "cyber-inner": "inset 0 0 10px rgba(64, 244, 255, 0.3)",
        "cyber-inner-primary": "inset 0 0 10px rgba(64, 244, 255, 0.3)",
        "cyber-inner-secondary": "inset 0 0 10px rgba(255, 0, 255, 0.3)",
        "cyber-inner-accent": "inset 0 0 10px rgba(64, 244, 255, 0.3)",
      },
      animation: {
        // Cyberpunk animations
        "cyber-pulse": "cyberPulse 2s ease-in-out infinite",
        "cyber-glow": "cyberGlow 2s ease-in-out infinite",
        "cyber-flicker": "cyberFlicker 3s infinite",
        glitch: "glitch 0.3s infinite",
        "scan-line": "scanLine 8s linear infinite",
        float: "float 3s ease-in-out infinite",
        "bounce-subtle": "bounceSubtle 0.6s ease-out",
        // Dialog animations
        in: "animateIn 0.2s ease-out",
        out: "animateOut 0.2s ease-in",
        "fade-in": "fadeIn 0.2s ease-out",
        "fade-out": "fadeOut 0.2s ease-in",
        "zoom-in": "zoomIn 0.2s ease-out",
        "zoom-out": "zoomOut 0.2s ease-in",
        "slide-in-from-top": "slideInFromTop 0.3s ease-out",
        "slide-in-from-bottom": "slideInFromBottom 0.3s ease-out",
        "dialog-show": "dialogShow 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "dialog-hide": "dialogHide 0.2s ease-in",
        "overlay-show": "overlayShow 0.3s ease-out",
        "overlay-hide": "overlayHide 0.2s ease-in",
      },
      keyframes: {
        cyberPulse: {
          "0%, 100%": {
            boxShadow:
              "0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor",
            opacity: "1",
          },
          "50%": {
            boxShadow:
              "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor",
            opacity: "0.9",
          },
        },
        cyberGlow: {
          "0%, 100%": {
            textShadow: "0 0 5px currentColor, 0 0 10px currentColor",
          },
          "50%": {
            textShadow:
              "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor",
          },
        },
        cyberFlicker: {
          "0%, 100%": { opacity: "1" },
          "41.99%": { opacity: "1" },
          "42%": { opacity: "0" },
          "43%": { opacity: "0" },
          "43.01%": { opacity: "1" },
          "47.99%": { opacity: "1" },
          "48%": { opacity: "0" },
          "49%": { opacity: "0" },
          "49.01%": { opacity: "1" },
        },
        glitch: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" },
        },
        scanLine: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(4px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        bounceSubtle: {
          "0%": { transform: "translateY(0)" },
          "30%": { transform: "translateY(-4px)" },
          "50%": { transform: "translateY(0)" },
          "70%": { transform: "translateY(-2px)" },
          "100%": { transform: "translateY(0)" },
        },
        // Dialog keyframes
        animateIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        animateOut: {
          "0%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.95)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        zoomIn: {
          "0%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
        zoomOut: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0.95)" },
        },
        slideInFromTop: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInFromBottom: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        dialogShow: {
          "0%": {
            opacity: "0",
            transform: "translate(-50%, -48%) scale(0.96)",
          },
          "100%": { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        },
        dialogHide: {
          "0%": { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
          "100%": {
            opacity: "0",
            transform: "translate(-50%, -48%) scale(0.96)",
          },
        },
        overlayShow: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        overlayHide: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      backgroundImage: {
        // Cyberpunk gradients
        "cyber-gradient":
          "linear-gradient(135deg, rgba(0, 184, 255, 0.1) 0%, rgba(255, 0, 255, 0.1) 100%)",
        "cyber-gradient-primary":
          "linear-gradient(135deg, rgba(0, 184, 255, 0.2) 0%, rgba(0, 184, 255, 0.05) 100%)",
        "cyber-gradient-secondary":
          "linear-gradient(135deg, rgba(255, 0, 255, 0.2) 0%, rgba(255, 0, 255, 0.05) 100%)",
        "cyber-gradient-accent":
          "linear-gradient(135deg, rgba(0, 255, 0, 0.2) 0%, rgba(0, 255, 0, 0.05) 100%)",
        "cyber-grid":
          "linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
