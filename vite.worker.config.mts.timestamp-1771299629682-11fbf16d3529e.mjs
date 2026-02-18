// vite.worker.config.mts
import { defineConfig } from "file:///C:/Users/setup/Videos/codiner.online/node_modules/vite/dist/node/index.js";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\setup\\Videos\\codiner.online";
var vite_worker_config_default = defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    sourcemap: true,
    // target: "node16",
    lib: {
      entry: path.resolve(__vite_injected_original_dirname, "workers/tsc/tsc_worker.ts"),
      name: "tsc_worker",
      fileName: "tsc_worker",
      formats: ["cjs"]
    },
    rollupOptions: {
      external: ["node:fs", "node:path", "node:worker_threads", "typescript"]
      //   output: {
      //     dir: "dist/workers/tsc",
      //   },
    }
    // outDir: "dist/workers/tsc",
    // emptyOutDir: true,
  }
});
export {
  vite_worker_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS53b3JrZXIuY29uZmlnLm10cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHNldHVwXFxcXFZpZGVvc1xcXFxjb2RpbmVyLm9ubGluZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcc2V0dXBcXFxcVmlkZW9zXFxcXGNvZGluZXIub25saW5lXFxcXHZpdGUud29ya2VyLmNvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3NldHVwL1ZpZGVvcy9jb2RpbmVyLm9ubGluZS92aXRlLndvcmtlci5jb25maWcubXRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWdcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICBzb3VyY2VtYXA6IHRydWUsXG4gICAgLy8gdGFyZ2V0OiBcIm5vZGUxNlwiLFxuICAgIGxpYjoge1xuICAgICAgZW50cnk6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwid29ya2Vycy90c2MvdHNjX3dvcmtlci50c1wiKSxcbiAgICAgIG5hbWU6IFwidHNjX3dvcmtlclwiLFxuICAgICAgZmlsZU5hbWU6IFwidHNjX3dvcmtlclwiLFxuICAgICAgZm9ybWF0czogW1wiY2pzXCJdLFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFtcIm5vZGU6ZnNcIiwgXCJub2RlOnBhdGhcIiwgXCJub2RlOndvcmtlcl90aHJlYWRzXCIsIFwidHlwZXNjcmlwdFwiXSxcbiAgICAgIC8vICAgb3V0cHV0OiB7XG4gICAgICAvLyAgICAgZGlyOiBcImRpc3Qvd29ya2Vycy90c2NcIixcbiAgICAgIC8vICAgfSxcbiAgICB9LFxuICAgIC8vIG91dERpcjogXCJkaXN0L3dvcmtlcnMvdHNjXCIsXG4gICAgLy8gZW1wdHlPdXREaXI6IHRydWUsXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd1QsU0FBUyxvQkFBb0I7QUFDclYsT0FBTyxVQUFVO0FBRGpCLElBQU0sbUNBQW1DO0FBSXpDLElBQU8sNkJBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFdBQVc7QUFBQTtBQUFBLElBRVgsS0FBSztBQUFBLE1BQ0gsT0FBTyxLQUFLLFFBQVEsa0NBQVcsMkJBQTJCO0FBQUEsTUFDMUQsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLE1BQ1YsU0FBUyxDQUFDLEtBQUs7QUFBQSxJQUNqQjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLFdBQVcsYUFBYSx1QkFBdUIsWUFBWTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBSXhFO0FBQUE7QUFBQTtBQUFBLEVBR0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
