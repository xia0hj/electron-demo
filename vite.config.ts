import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron';
import { rmSync } from 'node:fs'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  rmSync('dist-electron', { recursive: true, force: true })
  return {
    plugins: [
      react(),
      electron([
        {
          entry: 'src/main/index.ts',
          vite: {
            build: {
              outDir: 'dist-electron'
            }
          }
        },
        {
          entry: 'src/main/preload.ts',
          onstart(options) {
            // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete, 
            // instead of restarting the entire Electron App.
            options.reload()
          },
        }
      ])
    ],
    build: {
      outDir: 'dist-web'
    }
  }
})
