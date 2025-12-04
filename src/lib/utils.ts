import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and merges Tailwind classes intelligently
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculate 3D shadow color based on base color
 */
export function get3DShadowColor(
  _baseColor: string,
  opacity: number = 0.3
): string {
  // This is a simplified version - in production you'd parse the color
  return `rgba(0, 0, 0, ${opacity})`;
}

/**
 * Generate CSS custom properties for 3D depth
 */
export function get3DDepthStyles(depth: number) {
  return {
    "--ui-3d-depth": `${depth}px`,
    transform: `translateY(-${depth}px)`,
    boxShadow: `0 ${depth}px 0 0 rgba(0,0,0,0.25), 0 ${depth * 2}px ${
      depth * 4
    }px -${depth}px rgba(0,0,0,0.2)`,
  } as React.CSSProperties;
}
