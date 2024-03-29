import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/NetTestReact", // Замените RepoName на имя вашего репозитория
  server: {
    port: 3000, 
    proxy: {
      // string shorthand: http://localhost:3000/api -> http://localhost:8080/api
      '/': 'http://localhost:8080',
    }
  },
})
