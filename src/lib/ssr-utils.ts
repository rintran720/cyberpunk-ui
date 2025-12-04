/**
 * SSR (Server Side Rendering) utilities
 * These utilities help ensure components work correctly in SSR environments
 * like Next.js, Remix, Gatsby, etc.
 */

import * as React from "react";

/**
 * Check if code is running in browser environment
 */
export const isBrowser = 
  typeof window !== "undefined" && 
  typeof document !== "undefined";

/**
 * Check if code is running on server
 */
export const isServer = !isBrowser;

/**
 * Hook to check if component has mounted (client-side only)
 * Useful for preventing hydration mismatches
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const isMounted = useIsMounted();
 *   
 *   // Only access browser APIs after mount
 *   if (!isMounted) return <Skeleton />;
 *   
 *   return <div>{window.innerWidth}</div>;
 * }
 * ```
 */
export function useIsMounted(): boolean {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

/**
 * Hook to safely access localStorage with SSR support
 * 
 * @param key - localStorage key
 * @param initialValue - default value if key doesn't exist
 * @returns [value, setValue] tuple similar to useState
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const [theme, setTheme] = useLocalStorage('theme', 'dark');
 *   return <button onClick={() => setTheme('light')}>Toggle</button>;
 * }
 * ```
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // Initialize with the initial value (SSR-safe)
  const [storedValue, setStoredValue] = React.useState<T>(initialValue);

  // Hydrate from localStorage after mount
  React.useEffect(() => {
    if (!isBrowser) return;

    try {
      const item = localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
  }, [key]);

  // Setter that also updates localStorage
  const setValue = React.useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        
        if (isBrowser) {
          localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}

/**
 * Hook to get window dimensions with SSR support
 * Returns undefined on server, actual dimensions on client
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { width, height } = useWindowSize();
 *   return <div>Window: {width}x{height}</div>;
 * }
 * ```
 */
export function useWindowSize(): { width: number | undefined; height: number | undefined } {
  const [size, setSize] = React.useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  React.useEffect(() => {
    if (!isBrowser) return;

    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Set initial size
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}

/**
 * Hook to detect if user prefers dark mode
 * Returns undefined on server, boolean on client
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const prefersDark = usePrefersDarkMode();
 *   return <div>Dark mode: {prefersDark ? 'Yes' : 'No'}</div>;
 * }
 * ```
 */
export function usePrefersDarkMode(): boolean | undefined {
  const [prefersDark, setPrefersDark] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    if (!isBrowser) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setPrefersDark(mediaQuery.matches);

    function handleChange(e: MediaQueryListEvent) {
      setPrefersDark(e.matches);
    }

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersDark;
}

