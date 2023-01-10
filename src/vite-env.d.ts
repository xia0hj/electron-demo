/// <reference types="vite/client" />

declare interface Window {
  ipcEventSender: typeof import('../electron/main/IpcEventManager').ipcEventSender,
}
