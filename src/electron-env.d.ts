/// <reference types="vite/client" />

import { NativeApi } from '@main/preload'


declare global {
  interface Window {
    nativeApi: NativeApi
  }
}
