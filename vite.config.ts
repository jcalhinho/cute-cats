import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/cats': {
        target: 'https://data.latelier.co',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/cats$/, '/cats.json'),
      },
    },
  },
});
