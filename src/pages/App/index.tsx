import React from "react";
import { ipcRenderer } from "electron";

function App() {

  function onImport(){
    ipcRenderer.send('open-import-dialog')
  }

  return (
    <React.Fragment>
      <button onClick={onImport}>点击打开文件</button>
    </React.Fragment>
  )
}

export default App;