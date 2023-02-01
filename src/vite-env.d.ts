/// <reference types="vite/client" />

import {NativeApi} from '../electron/native/electron-api'

declare global {
  interface Window {
    nativeApi: NativeApi
  }
}
