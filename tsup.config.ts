import { defineConfig } from "tsup";
import { copyFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  treeshake: true,
  onSuccess: async () => {
    // Copy CSS files to dist/styles
    const distStylesDir = join(process.cwd(), "dist", "styles");
    if (!existsSync(distStylesDir)) {
      mkdirSync(distStylesDir, { recursive: true });
    }

    const stylesDir = join(process.cwd(), "src", "styles");
    const cssFiles = ["globals.css", "themes.css"];

    cssFiles.forEach((file) => {
      const srcPath = join(stylesDir, file);
      const destPath = join(distStylesDir, file);
      if (existsSync(srcPath)) {
        copyFileSync(srcPath, destPath);
        console.log(`✓ Copied ${file} to dist/styles/`);
      }
    });
  },
});
