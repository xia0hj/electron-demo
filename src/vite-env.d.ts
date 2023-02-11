/// <reference types="vite/client" />

declare namespace NodeJS {
  interface ProcessEnv {
    VSCODE_DEBUG?: 'true'
    DIST_ELECTRON: string
    DIST_WEB: string
    /** /dist/ or /public/ */
    PUBLIC: string
  }
}
