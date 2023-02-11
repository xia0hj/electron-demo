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
      <div>
        <button onClick={onAdd}>add</button>
        <button onClick={onDevtools}>devtools</button>
        <button onClick={onRun}>run</button>
      </div>
      <div className={styles['debug-output']}>
        <p>debug-output: {JSON.stringify(output)}</p>
      </div>
    </div>
  )
}
export default App;
