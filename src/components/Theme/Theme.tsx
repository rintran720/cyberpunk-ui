import * as React from "react";

// Theme color definitions
export interface ThemeColors {
  primary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
  secondary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
  accent: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
  surface: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  ring: string;
}

export interface Theme {
  name: string;
  mode: "light" | "dark";
  colors: ThemeColors;
}

// Pre-defined themes
export const themes: Record<string, Theme> = {
  dark: {
    name: "Dark",
    mode: "dark",
    colors: {
      primary: {
        50: "#e6f4ff",
        100: "#b3ddff",
        200: "#80c6ff",
        300: "#4dafff",
        400: "#33a6ff",
        500: "#1a9dff",
        600: "#147fe1",
        700: "#0f61b3",
        800: "#0a4385",
        900: "#052557",
        950: "#021229",
      },
      secondary: {
        50: "#faf5ff",
        100: "#f3e8ff",
        200: "#e9d5ff",
        300: "#d8b4fe",
        400: "#c084fc",
        500: "#a855f7",
        600: "#9333ea",
        700: "#7e22ce",
        800: "#6b21a8",
        900: "#581c87",
        950: "#3b0764",
      },
      accent: {
        50: "#ecfdf5",
        100: "#d1fae5",
        200: "#a7f3d0",
        300: "#6ee7b7",
        400: "#34d399",
        500: "#10b981",
        600: "#059669",
        700: "#047857",
        800: "#065f46",
        900: "#064e3b",
        950: "#022c22",
      },
      surface: {
        50: "#fafafa",
        100: "#f4f4f5",
        200: "#e4e4e7",
        300: "#d4d4d8",
        400: "#a1a1aa",
        500: "#71717a",
        600: "#52525b",
        700: "#3f3f46",
        800: "#27272a",
        900: "#18181b",
        950: "#09090b",
      },
      background: "#09090b",
      foreground: "#fafafa",
      muted: "#27272a",
      mutedForeground: "#a1a1aa",
      border: "#27272a",
      ring: "#1a9dff",
    },
  },
  light: {
    name: "Light",
    mode: "light",
    colors: {
      primary: {
        50: "#e6f4ff",
        100: "#b3ddff",
        200: "#80c6ff",
        300: "#4dafff",
        400: "#33a6ff",
        500: "#1a9dff",
        600: "#147fe1",
        700: "#0f61b3",
        800: "#0a4385",
        900: "#052557",
        950: "#021229",
      },
      secondary: {
        50: "#faf5ff",
        100: "#f3e8ff",
        200: "#e9d5ff",
        300: "#d8b4fe",
        400: "#c084fc",
        500: "#a855f7",
        600: "#9333ea",
        700: "#7e22ce",
        800: "#6b21a8",
        900: "#581c87",
        950: "#3b0764",
      },
      accent: {
        50: "#ecfdf5",
        100: "#d1fae5",
        200: "#a7f3d0",
        300: "#6ee7b7",
        400: "#34d399",
        500: "#10b981",
        600: "#059669",
        700: "#047857",
        800: "#065f46",
        900: "#064e3b",
        950: "#022c22",
      },
      surface: {
        50: "#09090b",
        100: "#18181b",
        200: "#27272a",
        300: "#3f3f46",
        400: "#52525b",
        500: "#71717a",
        600: "#a1a1aa",
        700: "#d4d4d8",
        800: "#e4e4e7",
        900: "#f4f4f5",
        950: "#fafafa",
      },
      background: "#ffffff",
      foreground: "#09090b",
      muted: "#f4f4f5",
      mutedForeground: "#71717a",
      border: "#e4e4e7",
      ring: "#1a9dff",
    },
  },
  ocean: {
    name: "Ocean",
    mode: "dark",
    colors: {
      primary: {
        50: "#e0f7fa",
        100: "#b2ebf2",
        200: "#80deea",
        300: "#4dd0e1",
        400: "#26c6da",
        500: "#00bcd4",
        600: "#00acc1",
        700: "#0097a7",
        800: "#00838f",
        900: "#006064",
        950: "#004d40",
      },
      secondary: {
        50: "#e8f5e9",
        100: "#c8e6c9",
        200: "#a5d6a7",
        300: "#81c784",
        400: "#66bb6a",
        500: "#4caf50",
        600: "#43a047",
        700: "#388e3c",
        800: "#2e7d32",
        900: "#1b5e20",
        950: "#0d3d12",
      },
      accent: {
        50: "#fff8e1",
        100: "#ffecb3",
        200: "#ffe082",
        300: "#ffd54f",
        400: "#ffca28",
        500: "#ffc107",
        600: "#ffb300",
        700: "#ffa000",
        800: "#ff8f00",
        900: "#ff6f00",
        950: "#e65100",
      },
      surface: {
        50: "#eceff1",
        100: "#cfd8dc",
        200: "#b0bec5",
        300: "#90a4ae",
        400: "#78909c",
        500: "#607d8b",
        600: "#546e7a",
        700: "#455a64",
        800: "#37474f",
        900: "#263238",
        950: "#1a252a",
      },
      background: "#0d1b2a",
      foreground: "#e0f7fa",
      muted: "#1b3a4b",
      mutedForeground: "#90a4ae",
      border: "#1b3a4b",
      ring: "#00bcd4",
    },
  },
  sunset: {
    name: "Sunset",
    mode: "dark",
    colors: {
      primary: {
        50: "#fff3e0",
        100: "#ffe0b2",
        200: "#ffcc80",
        300: "#ffb74d",
        400: "#ffa726",
        500: "#ff9800",
        600: "#fb8c00",
        700: "#f57c00",
        800: "#ef6c00",
        900: "#e65100",
        950: "#bf360c",
      },
      secondary: {
        50: "#fce4ec",
        100: "#f8bbd9",
        200: "#f48fb1",
        300: "#f06292",
        400: "#ec407a",
        500: "#e91e63",
        600: "#d81b60",
        700: "#c2185b",
        800: "#ad1457",
        900: "#880e4f",
        950: "#560027",
      },
      accent: {
        50: "#f3e5f5",
        100: "#e1bee7",
        200: "#ce93d8",
        300: "#ba68c8",
        400: "#ab47bc",
        500: "#9c27b0",
        600: "#8e24aa",
        700: "#7b1fa2",
        800: "#6a1b9a",
        900: "#4a148c",
        950: "#2a0a52",
      },
      surface: {
        50: "#fafafa",
        100: "#f5f5f5",
        200: "#eeeeee",
        300: "#e0e0e0",
        400: "#bdbdbd",
        500: "#9e9e9e",
        600: "#757575",
        700: "#616161",
        800: "#424242",
        900: "#212121",
        950: "#121212",
      },
      background: "#1a0a0a",
      foreground: "#fff3e0",
      muted: "#2d1810",
      mutedForeground: "#bdbdbd",
      border: "#3d2820",
      ring: "#ff9800",
    },
  },
  forest: {
    name: "Forest",
    mode: "dark",
    colors: {
      primary: {
        50: "#e8f5e9",
        100: "#c8e6c9",
        200: "#a5d6a7",
        300: "#81c784",
        400: "#66bb6a",
        500: "#4caf50",
        600: "#43a047",
        700: "#388e3c",
        800: "#2e7d32",
        900: "#1b5e20",
        950: "#0d3d12",
      },
      secondary: {
        50: "#fff8e1",
        100: "#ffecb3",
        200: "#ffe082",
        300: "#ffd54f",
        400: "#ffca28",
        500: "#ffc107",
        600: "#ffb300",
        700: "#ffa000",
        800: "#ff8f00",
        900: "#ff6f00",
        950: "#e65100",
      },
      accent: {
        50: "#efebe9",
        100: "#d7ccc8",
        200: "#bcaaa4",
        300: "#a1887f",
        400: "#8d6e63",
        500: "#795548",
        600: "#6d4c41",
        700: "#5d4037",
        800: "#4e342e",
        900: "#3e2723",
        950: "#2a1a17",
      },
      surface: {
        50: "#eceff1",
        100: "#cfd8dc",
        200: "#b0bec5",
        300: "#90a4ae",
        400: "#78909c",
        500: "#607d8b",
        600: "#546e7a",
        700: "#455a64",
        800: "#37474f",
        900: "#263238",
        950: "#1a252a",
      },
      background: "#0a1510",
      foreground: "#e8f5e9",
      muted: "#1a2f20",
      mutedForeground: "#90a4ae",
      border: "#2a4030",
      ring: "#4caf50",
    },
  },
};

// Theme context
interface ThemeContextValue {
  theme: Theme;
  themeName: string;
  setTheme: (themeName: string) => void;
  availableThemes: string[];
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined
);

// Check if we're in browser environment
const isBrowser =
  typeof window !== "undefined" && typeof document !== "undefined";

// Convert theme colors to CSS variables
function applyThemeToDOM(theme: Theme) {
  // SSR safety check
  if (!isBrowser) return;

  const root = document.documentElement;
  const { colors } = theme;

  // Apply color palette
  const colorKeys = ["primary", "secondary", "accent", "surface"] as const;
  const shades = [
    "50",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "950",
  ] as const;

  colorKeys.forEach((colorKey) => {
    shades.forEach((shade) => {
      root.style.setProperty(
        `--color-${colorKey}-${shade}`,
        colors[colorKey][shade]
      );
    });
  });

  // Apply semantic colors
  root.style.setProperty("--color-background", colors.background);
  root.style.setProperty("--color-foreground", colors.foreground);
  root.style.setProperty("--color-muted", colors.muted);
  root.style.setProperty("--color-muted-foreground", colors.mutedForeground);
  root.style.setProperty("--color-border", colors.border);
  root.style.setProperty("--color-ring", colors.ring);

  // Set mode class
  root.classList.remove("light", "dark");
  root.classList.add(theme.mode);
}

export interface ThemeProviderProps {
  /** Default theme name */
  defaultTheme?: string;
  /** Storage key for persisting theme */
  storageKey?: string;
  /** Custom themes to add */
  customThemes?: Record<string, Theme>;
  /** Children */
  children: React.ReactNode;
}

export function ThemeProvider({
  defaultTheme = "dark",
  storageKey = "votekio-cyberpunk-ui-theme",
  customThemes = {},
  children,
}: ThemeProviderProps) {
  const allThemes = React.useMemo(
    () => ({ ...themes, ...customThemes }),
    [customThemes]
  );

  // Initialize with default theme (SSR-safe)
  const [themeName, setThemeNameState] = React.useState<string>(defaultTheme);
  const [mounted, setMounted] = React.useState(false);

  // Hydrate theme from localStorage after mount (client-side only)
  React.useEffect(() => {
    setMounted(true);
    if (isBrowser) {
      const stored = localStorage.getItem(storageKey);
      if (stored && allThemes[stored]) {
        setThemeNameState(stored);
      }
    }
  }, [storageKey, allThemes]);

  const theme = allThemes[themeName] || allThemes.dark;

  // Apply theme to DOM (client-side only)
  React.useEffect(() => {
    if (mounted) {
      applyThemeToDOM(theme);
      if (isBrowser) {
        localStorage.setItem(storageKey, themeName);
      }
    }
  }, [theme, themeName, storageKey, mounted]);

  const setTheme = React.useCallback(
    (name: string) => {
      if (allThemes[name]) {
        setThemeNameState(name);
      }
    },
    [allThemes]
  );

  const value = React.useMemo(
    () => ({
      theme,
      themeName,
      setTheme,
      availableThemes: Object.keys(allThemes),
    }),
    [theme, themeName, setTheme, allThemes]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// Hook to use theme
export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// Theme toggle button component
export interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const toggleMode = () => {
    setTheme(theme.mode === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleMode}
      className={className}
      aria-label={`Switch to ${theme.mode === "dark" ? "light" : "dark"} mode`}
    >
      {theme.mode === "dark" ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )}
    </button>
  );
}

// Theme selector component
export interface ThemeSelectorProps {
  className?: string;
}

export function ThemeSelector({ className }: ThemeSelectorProps) {
  const { themeName, setTheme, availableThemes } = useTheme();

  return (
    <div className={className}>
      <select
        value={themeName}
        onChange={(e) => setTheme(e.target.value)}
        className="bg-surface-800 border border-surface-600 rounded-lg px-3 py-2 text-surface-100 outline-none focus:border-primary-500"
      >
        {availableThemes.map((name) => (
          <option key={name} value={name}>
            {themes[name]?.name || name}
          </option>
        ))}
      </select>
    </div>
  );
}

// Re-export color utilities
export {
  generatePalette,
  applyPaletteToCSS,
  setPrimaryColor,
  setSecondaryColor,
  setAccentColor,
  presetColors,
  hexToRgb,
  rgbToHex,
} from "../../lib/color-utils";
export type { ColorPalette, PresetColorName } from "../../lib/color-utils";
