import React from "react";
import { ipcRenderer } from "electron";
import { IPC_EVENT_OPEN_IMPORT_DIALOG } from '@shared/constants'

function App() {

  function onImport() {
    ipcRenderer.send(IPC_EVENT_OPEN_IMPORT_DIALOG)
  }

  return (
    <React.Fragment>
      <button onClick={onImport}>点击打开文件</button>
    </React.Fragment>
  )
}

export default App;