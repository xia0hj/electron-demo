/// <reference types="vite/client" />

import {NativeApi} from '../electron/native'

declare global {
  interface Window {
    nativeApi: NativeApi
  }
}
