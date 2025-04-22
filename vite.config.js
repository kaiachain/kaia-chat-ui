import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {}
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.js'),
      name: 'kaia-chat-ui',
      formats: ['es', 'umd'],
      fileName: (format) => `kaia-chat-ui.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
  },
});
