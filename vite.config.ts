import { AliasOptions, defineConfig, ResolveOptions } from 'vite'
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron';
import { rmSync } from 'node:fs'
import { join } from 'node:path'


const resolveConfig = {
  alias: {
    '@main': join(__dirname, 'src', 'main'),
    '@renderer': join(__dirname, 'src', 'renderer')
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {

  rmSync('dist-electron', { recursive: true, force: true });

  return {
    resolve: resolveConfig,
    plugins: [
      react(),
      electron([
        {
          entry: 'src/main/index.ts',
          vite: {
            resolve: resolveConfig,
            build: {
              outDir: 'dist-electron',
              rollupOptions: {
                external: [
                  'active-win',
                  'better-sqlite3'
                ]
              }
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
          vite: {
            resolve: resolveConfig,
            build: {
              rollupOptions: {
                external: [
                  'active-win',
                  'better-sqlite3'
                ]
              }
            }
          }
        }
      ])
    ],
    build: {
      outDir: 'dist-web'
    }
  }
})
