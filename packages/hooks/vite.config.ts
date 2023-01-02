import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  esbuild: {
    minifyIdentifiers: false,
  },
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "index.mjs" : "index.cjs"),
    },
    rollupOptions: {
      external: ["react", "react-dom", "ode-ts-client"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDom",
          "ode-ts-client": "OdeTsClient",
        },
      },
    },
  },
  plugins: [
    react({
      jsxRuntime: "classic",
    }),
    visualizer(),
    dts({
      insertTypesEntry: false,
      outputDir: "dist",
    }),
  ],
});
