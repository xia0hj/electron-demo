/// <reference types="vite/client" />

import { NativeApiDef } from '@main/preload'


declare global {
  interface Window {
    NativeApi: NativeApiDef
  }
}
