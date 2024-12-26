import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const repositoryName = '/art_museum/';

export default defineConfig({
  base: repositoryName,
  plugins: [react()],
})
