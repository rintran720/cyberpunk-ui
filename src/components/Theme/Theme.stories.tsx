import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider, useTheme, themes } from "./Theme";
import { Button } from "../Button";
import { TextField } from "../TextField";
import { Alert, AlertTitle, AlertDescription } from "../Alert";
import * as React from "react";
import {
  generatePalette,
  setPrimaryColor,
  setSecondaryColor,
  setAccentColor,
  presetColors,
  type PresetColorName,
} from "../../lib/color-utils";

// Theme Preview Card
function ThemePreviewCard({ themeName }: { themeName: string }) {
  const theme = themes[themeName];
  if (!theme) return null;

  return (
    <div
      className="p-4 rounded-xl border cursor-pointer transition-all hover:scale-[1.02]"
      style={{
        backgroundColor: theme.colors.surface[900],
        borderColor: theme.colors.surface[700],
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-8 h-8 rounded-full"
          style={{ backgroundColor: theme.colors.primary[500] }}
        />
        <div>
          <div
            className="font-semibold"
            style={{ color: theme.colors.surface[100] }}
          >
            {theme.name}
          </div>
          <div className="text-xs" style={{ color: theme.colors.surface[400] }}>
            {theme.mode} mode
          </div>
        </div>
      </div>
      <div className="flex gap-1">
        {["primary", "secondary", "accent"].map((colorKey) => (
          <div
            key={colorKey}
            className="flex-1 h-2 rounded-full"
            style={{
              backgroundColor: theme.colors[
                colorKey as keyof typeof theme.colors
              ][500] as string,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Interactive Theme Switcher
function ThemeSwitcher() {
  const { themeName, setTheme, availableThemes, theme } = useTheme();

  return (
    <div className="space-y-6">
      {/* Theme Selector */}
      <div className="flex flex-wrap gap-3">
        {availableThemes.map((name) => (
          <button
            key={name}
            onClick={() => setTheme(name)}
            className={`
              px-4 py-2 rounded-lg font-medium transition-all
              ${
                themeName === name
                  ? "bg-primary-500 text-white shadow-[0_4px_0_0_rgba(20,111,225,0.5)]"
                  : "bg-surface-800 text-surface-300 hover:bg-surface-700"
              }
            `}
          >
            {themes[name]?.name || name}
          </button>
        ))}
      </div>

      {/* Current Theme Info */}
      <div className="p-4 rounded-xl bg-surface-800 border border-surface-700">
        <div className="text-sm text-surface-400 mb-1">Current Theme</div>
        <div className="text-xl font-bold text-surface-100">{theme.name}</div>
        <div className="text-sm text-surface-500">{theme.mode} mode</div>
      </div>

      {/* Color Palette */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-surface-100">
          Color Palette
        </h3>

        {(["primary", "secondary", "accent", "surface"] as const).map(
          (colorKey) => (
            <div key={colorKey} className="space-y-2">
              <div className="text-sm font-medium text-surface-300 capitalize">
                {colorKey}
              </div>
              <div className="flex gap-1 rounded-lg overflow-hidden">
                {(
                  [
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
                  ] as const
                ).map((shade) => (
                  <div
                    key={shade}
                    className="flex-1 h-10 flex items-end justify-center pb-1"
                    style={{ backgroundColor: theme.colors[colorKey][shade] }}
                  >
                    <span
                      className={`text-[10px] font-mono ${
                        parseInt(shade) > 400
                          ? "text-white/60"
                          : "text-black/60"
                      }`}
                    >
                      {shade}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>

      {/* Component Preview */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-surface-100">
          Components Preview
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="ghost">Ghost</Button>
        </div>

        <TextField
          label="Sample Input"
          placeholder="Type something..."
          fullWidth
        />

        <Alert variant="info">
          <AlertTitle>Theme Applied</AlertTitle>
          <AlertDescription>
            The {theme.name} theme is now active.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}

// Demo with all themes
function AllThemesDemo() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {Object.keys(themes).map((themeName) => (
        <ThemePreviewCard key={themeName} themeName={themeName} />
      ))}
    </div>
  );
}

const meta: Meta = {
  title: "Components/Theme",
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="dark">
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj;

// All Available Themes
export const AvailableThemes: Story = {
  render: () => (
    <div className="w-[600px] p-6 rounded-2xl bg-surface-900 border border-surface-700">
      <AllThemesDemo />
    </div>
  ),
};

// Interactive Theme Switcher
export const InteractiveDemo: Story = {
  render: () => (
    <div className="w-[600px] p-6 rounded-2xl bg-surface-900 border border-surface-700">
      <ThemeSwitcher />
    </div>
  ),
};

// Dark Theme
export const DarkTheme: Story = {
  render: () => {
    const DarkDemo = () => {
      const { setTheme } = useTheme();
      React.useEffect(() => {
        setTheme("dark");
      }, [setTheme]);
      return (
        <div className="w-[600px] p-6 rounded-2xl bg-surface-900 border border-surface-700">
          <ThemeSwitcher />
        </div>
      );
    };
    return <DarkDemo />;
  },
};

// Light Theme
export const LightTheme: Story = {
  render: () => {
    const LightDemo = () => {
      const { setTheme } = useTheme();
      React.useEffect(() => {
        setTheme("light");
      }, [setTheme]);
      return (
        <div className="w-[600px] p-6 rounded-2xl bg-surface-900 border border-surface-700">
          <ThemeSwitcher />
        </div>
      );
    };
    return <LightDemo />;
  },
};

// Ocean Theme
export const OceanTheme: Story = {
  render: () => {
    const OceanDemo = () => {
      const { setTheme } = useTheme();
      React.useEffect(() => {
        setTheme("ocean");
      }, [setTheme]);
      return (
        <div className="w-[600px] p-6 rounded-2xl bg-surface-900 border border-surface-700">
          <ThemeSwitcher />
        </div>
      );
    };
    return <OceanDemo />;
  },
};

// Sunset Theme
export const SunsetTheme: Story = {
  render: () => {
    const SunsetDemo = () => {
      const { setTheme } = useTheme();
      React.useEffect(() => {
        setTheme("sunset");
      }, [setTheme]);
      return (
        <div className="w-[600px] p-6 rounded-2xl bg-surface-900 border border-surface-700">
          <ThemeSwitcher />
        </div>
      );
    };
    return <SunsetDemo />;
  },
};

// Forest Theme
export const ForestTheme: Story = {
  render: () => {
    const ForestDemo = () => {
      const { setTheme } = useTheme();
      React.useEffect(() => {
        setTheme("forest");
      }, [setTheme]);
      return (
        <div className="w-[600px] p-6 rounded-2xl bg-surface-900 border border-surface-700">
          <ThemeSwitcher />
        </div>
      );
    };
    return <ForestDemo />;
  },
};

// Usage Example
export const UsageExample: Story = {
  render: () => (
    <div className="w-[600px] p-6 rounded-2xl bg-surface-900 border border-surface-700">
      <div className="p-4 rounded-xl bg-surface-800 border border-surface-700">
        <h3 className="text-lg font-semibold text-surface-100 mb-4">Usage</h3>
        <pre className="text-sm text-surface-300 bg-surface-900 p-4 rounded-lg overflow-x-auto">
          {`// 1. Wrap your app with ThemeProvider
import { ThemeProvider } from '@votekio/cyberpunk-ui';

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <YourApp />
    </ThemeProvider>
  );
}

// 2. Use the useTheme hook to access/change theme
import { useTheme } from '@votekio/cyberpunk-ui';

function ThemeSwitcher() {
  const { theme, themeName, setTheme, availableThemes } = useTheme();
  
  return (
    <select value={themeName} onChange={(e) => setTheme(e.target.value)}>
      {availableThemes.map((name) => (
        <option key={name} value={name}>{name}</option>
      ))}
    </select>
  );
}

// 3. Add custom themes
<ThemeProvider
  defaultTheme="myTheme"
  customThemes={{
    myTheme: {
      name: "My Theme",
      mode: "dark",
      colors: { /* ... */ }
    }
  }}
>
  <App />
</ThemeProvider>`}
        </pre>
      </div>
    </div>
  ),
};

// Color Customizer Component
function ColorCustomizer() {
  const [primaryColor, setPrimaryColorState] = React.useState("#3b82f6");
  const [secondaryColor, setSecondaryColorState] = React.useState("#a855f7");
  const [accentColor, setAccentColorState] = React.useState("#10b981");
  const [generatedPalette, setGeneratedPalette] = React.useState(
    generatePalette("#3b82f6")
  );

  const handlePrimaryChange = (color: string) => {
    setPrimaryColorState(color);
    setPrimaryColor(color);
    setGeneratedPalette(generatePalette(color));
  };

  const handleSecondaryChange = (color: string) => {
    setSecondaryColorState(color);
    setSecondaryColor(color);
  };

  const handleAccentChange = (color: string) => {
    setAccentColorState(color);
    setAccentColor(color);
  };

  return (
    <div className="space-y-6">
      {/* Color Pickers */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-surface-100">
          🎨 Color Customizer
        </h3>

        <div className="grid grid-cols-3 gap-4">
          {/* Primary Color */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-surface-300">
              Primary
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => handlePrimaryChange(e.target.value)}
                className="w-12 h-10 rounded-lg cursor-pointer border-2 border-surface-600"
              />
              <input
                type="text"
                value={primaryColor}
                onChange={(e) => handlePrimaryChange(e.target.value)}
                className="flex-1 bg-surface-800 border border-surface-600 rounded-lg px-3 py-2 text-surface-100 text-sm font-mono"
              />
            </div>
          </div>

          {/* Secondary Color */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-surface-300">
              Secondary
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={secondaryColor}
                onChange={(e) => handleSecondaryChange(e.target.value)}
                className="w-12 h-10 rounded-lg cursor-pointer border-2 border-surface-600"
              />
              <input
                type="text"
                value={secondaryColor}
                onChange={(e) => handleSecondaryChange(e.target.value)}
                className="flex-1 bg-surface-800 border border-surface-600 rounded-lg px-3 py-2 text-surface-100 text-sm font-mono"
              />
            </div>
          </div>

          {/* Accent Color */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-surface-300">
              Accent
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={accentColor}
                onChange={(e) => handleAccentChange(e.target.value)}
                className="w-12 h-10 rounded-lg cursor-pointer border-2 border-surface-600"
              />
              <input
                type="text"
                value={accentColor}
                onChange={(e) => handleAccentChange(e.target.value)}
                className="flex-1 bg-surface-800 border border-surface-600 rounded-lg px-3 py-2 text-surface-100 text-sm font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Preset Colors */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-surface-300">Quick Presets</h4>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(presetColors) as PresetColorName[]).map((name) => (
            <button
              key={name}
              onClick={() => handlePrimaryChange(presetColors[name])}
              className="group relative"
              title={name}
            >
              <div
                className="w-8 h-8 rounded-full border-2 border-surface-600 hover:border-white transition-colors hover:scale-110"
                style={{ backgroundColor: presetColors[name] }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Generated Palette Preview */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-surface-300">
          Generated Palette
        </h4>
        <div className="flex gap-1 rounded-lg overflow-hidden">
          {(
            [
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
            ] as const
          ).map((shade) => (
            <div
              key={shade}
              className="flex-1 h-12 flex items-end justify-center pb-1"
              style={{ backgroundColor: generatedPalette[shade] }}
            >
              <span
                className={`text-[10px] font-mono ${
                  parseInt(shade) > 400 ? "text-white/60" : "text-black/60"
                }`}
              >
                {shade}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Live Component Preview */}
      <div className="space-y-4 pt-4 border-t border-surface-700">
        <h4 className="text-sm font-medium text-surface-300">Live Preview</h4>

        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="outline">Outline</Button>
        </div>

        <TextField
          label="Sample Input"
          placeholder="Type something..."
          fullWidth
        />

        <div className="grid grid-cols-2 gap-3">
          <Alert variant="info">
            <AlertTitle>Info Alert</AlertTitle>
            <AlertDescription>Uses primary color</AlertDescription>
          </Alert>
          <Alert variant="success">
            <AlertTitle>Success Alert</AlertTitle>
            <AlertDescription>Uses accent color</AlertDescription>
          </Alert>
        </div>
      </div>

      {/* Code Output */}
      <div className="space-y-3 pt-4 border-t border-surface-700">
        <h4 className="text-sm font-medium text-surface-300">Generated CSS</h4>
        <pre className="text-xs text-surface-300 bg-surface-900 p-4 rounded-lg overflow-x-auto">
          {`:root {
${Object.entries(generatedPalette)
  .map(([shade, color]) => `  --color-primary-${shade}: ${color};`)
  .join("\n")}
}`}
        </pre>
      </div>
    </div>
  );
}

// Color Customizer Story
export const ColorCustomizerDemo: Story = {
  render: () => (
    <div className="w-[700px] p-6 rounded-2xl bg-surface-900 border border-surface-700">
      <ColorCustomizer />
    </div>
  ),
};

// Code Example for Color Utils
export const ColorUtilsExample: Story = {
  render: () => (
    <div className="w-[600px] p-6 rounded-2xl bg-surface-900 border border-surface-700">
      <div className="p-4 rounded-xl bg-surface-800 border border-surface-700">
        <h3 className="text-lg font-semibold text-surface-100 mb-4">
          Color Utilities
        </h3>
        <pre className="text-sm text-surface-300 bg-surface-900 p-4 rounded-lg overflow-x-auto">
          {`import { 
  generatePalette, 
  setPrimaryColor,
  setSecondaryColor,
  setAccentColor,
  presetColors 
} from '@votekio/cyberpunk-ui';

// Generate full palette from a single color
const palette = generatePalette('#3b82f6');
console.log(palette);
// {
//   50: "#eff6ff",
//   100: "#dbeafe",
//   ...
//   900: "#1e3a8a",
//   950: "#172554"
// }

// Apply color to CSS variables instantly
setPrimaryColor('#ef4444');    // Red primary
setSecondaryColor('#8b5cf6');  // Purple secondary
setAccentColor('#10b981');     // Green accent

// Use preset colors
setPrimaryColor(presetColors.rose);
setPrimaryColor(presetColors.violet);
setPrimaryColor(presetColors.emerald);

// Available presets:
// blue, sky, cyan, violet, purple, fuchsia,
// pink, rose, red, orange, amber, yellow,
// lime, green, emerald, teal, slate, zinc, stone`}
        </pre>
      </div>
    </div>
  ),
};
