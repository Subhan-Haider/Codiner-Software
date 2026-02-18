import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { readFileSync } from "fs";

const pkg = JSON.parse(readFileSync("./package.json", "utf-8"));

// Mobile-specific Vite config — uses a dedicated entry point that avoids Electron APIs
export default defineConfig({
    plugins: [react(), tailwindcss()],
    root: ".",
    build: {
        outDir: "dist",
        emptyOutDir: true,
        rollupOptions: {
            input: path.resolve(__dirname, "index.mobile.html"),
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    define: {
        __APP_VERSION__: JSON.stringify(pkg.version),
    },
    base: "./",
});
