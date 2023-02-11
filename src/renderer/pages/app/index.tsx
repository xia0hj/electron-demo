import LeftToolBar from '@renderer/components/left-tool-bar';
import { Exe } from '@shared/types';
import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import styles from './index.module.scss';

const App = (): JSX.Element => {

  // hooks
  const [path, setPath] = useState('');
  const [output, setOutput] = useState({});
  const [curExe, setCurExe] = useState<Exe|null>(null);


  // event
  const onAdd = () => {

    window.NativeApi.addExe().then(exe=>{
      setOutput(exe);
      setCurExe(exe)
    })
  }


  const onDevtools = () => window.NativeApi.openDevtools();

  const onRun = () => {
    if(curExe!==null){
      window.NativeApi.run(curExe);
    }
  }

  // JSX
  return (
    <div className={styles.container}>
      <LeftToolBar/>
      <Routes>
        <Route path="/" element={<div>Home</div>} ></Route>
        <Route path="/library" element={<div>Library</div>} ></Route>
        <Route path="/settings" element={<div>Settings</div>} ></Route>
      </Routes>
    </div>
  )
}
export default App;
