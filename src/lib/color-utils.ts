/**
 * Color utility functions for generating palettes and manipulating colors
 */

// Convert hex to RGB
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// Convert RGB to hex
export function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = Math.round(Math.max(0, Math.min(255, x))).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

// Convert RGB to HSL
export function rgbToHsl(
  r: number,
  g: number,
  b: number
): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

// Convert HSL to RGB
export function hslToRgb(
  h: number,
  s: number,
  l: number
): { r: number; g: number; b: number } {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

// Shade configuration for generating palette
const SHADE_CONFIG: Record<string, { lightness: number; saturationAdjust: number }> = {
  "50": { lightness: 97, saturationAdjust: -30 },
  "100": { lightness: 94, saturationAdjust: -20 },
  "200": { lightness: 86, saturationAdjust: -10 },
  "300": { lightness: 76, saturationAdjust: -5 },
  "400": { lightness: 64, saturationAdjust: 0 },
  "500": { lightness: 50, saturationAdjust: 0 },
  "600": { lightness: 42, saturationAdjust: 5 },
  "700": { lightness: 34, saturationAdjust: 10 },
  "800": { lightness: 26, saturationAdjust: 15 },
  "900": { lightness: 18, saturationAdjust: 20 },
  "950": { lightness: 10, saturationAdjust: 25 },
};

export interface ColorPalette {
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
}

/**
 * Generate a full color palette from a single base color
 * @param baseColor - Hex color string (e.g., "#3b82f6")
 * @returns Object with shades from 50 to 950
 */
export function generatePalette(baseColor: string): ColorPalette {
  const rgb = hexToRgb(baseColor);
  if (!rgb) {
    throw new Error(`Invalid color: ${baseColor}`);
  }

  const baseHsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const palette: Record<string, string> = {};

  for (const [shade, config] of Object.entries(SHADE_CONFIG)) {
    const newSaturation = Math.max(
      0,
      Math.min(100, baseHsl.s + config.saturationAdjust)
    );
    const { r, g, b } = hslToRgb(baseHsl.h, newSaturation, config.lightness);
    palette[shade] = rgbToHex(r, g, b);
  }

    return palette as unknown as ColorPalette;
}

/**
 * Apply a color palette to CSS variables
 * @param palette - Color palette object
 * @param prefix - CSS variable prefix (e.g., "primary", "secondary")
 */
export function applyPaletteToCSS(
  palette: ColorPalette,
  prefix: string
): void {
  // SSR safety check
  if (typeof document === "undefined") return;
  
  const root = document.documentElement;
  
  for (const [shade, color] of Object.entries(palette)) {
    root.style.setProperty(`--color-${prefix}-${shade}`, color);
  }
}

/**
 * Generate and apply a color palette from a single color
 * @param baseColor - Hex color string
 * @param prefix - CSS variable prefix
 */
export function setPrimaryColor(baseColor: string): void {
  const palette = generatePalette(baseColor);
  applyPaletteToCSS(palette, "primary");
}

export function setSecondaryColor(baseColor: string): void {
  const palette = generatePalette(baseColor);
  applyPaletteToCSS(palette, "secondary");
}

export function setAccentColor(baseColor: string): void {
  const palette = generatePalette(baseColor);
  applyPaletteToCSS(palette, "accent");
}

/**
 * Preset colors for quick selection
 */
export const presetColors = {
  // Blues
  blue: "#3b82f6",
  sky: "#0ea5e9",
  cyan: "#06b6d4",
  
  // Purples
  violet: "#8b5cf6",
  purple: "#a855f7",
  fuchsia: "#d946ef",
  
  // Pinks
  pink: "#ec4899",
  rose: "#f43f5e",
  
  // Reds
  red: "#ef4444",
  orange: "#f97316",
  amber: "#f59e0b",
  
  // Greens
  yellow: "#eab308",
  lime: "#84cc16",
  green: "#22c55e",
  emerald: "#10b981",
  teal: "#14b8a6",
  
  // Neutrals
  slate: "#64748b",
  zinc: "#71717a",
  stone: "#78716c",
};

export type PresetColorName = keyof typeof presetColors;

