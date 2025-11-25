import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// Note: removed triple-slash reference to 'vitest/config' to avoid TS
// editor errors when dev dependencies are not installed. If you run
// Vitest and want editor intellisense, re-add the reference after
// installing dev dependencies.
// Vitest/storybook test integration removed to avoid ESM-only import issues during Storybook startup.
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5177
  },
  // Note: vitest/storybook integration removed to avoid ESM require-loader issues.
});