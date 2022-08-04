import {copy} from 'vite-plugin-copy'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    copy([
      { src: './src/templates', dest: 'dist/' },
  ]),
  ],
  build: {
    // target: 'modules',
    lib: {
      entry: 'src/index.ts',
      name: 'generator',
      // the proper extensions will be added
      fileName: 'generator'
    },
    rollupOptions: {
      external: ['#ansi-styles', '#supports-color']
    }
  }
})
