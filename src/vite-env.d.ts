/// <reference types="vite/client" />

declare interface Window {
  ipcEventSender: typeof import('../electron/preload').ipcEventSender
}
