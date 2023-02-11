import LeftToolBar from '@renderer/components/left-tool-bar';
import { Exe } from '@shared/types';
import { useState } from 'react'
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
      <div>
        <h1>H1</h1>
        <h2>H2</h2>
      </div>
    </div>
  )
}
export default App;
