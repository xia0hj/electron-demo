import { useState } from 'react'
import styles from './index.module.scss';

const App = (): JSX.Element => {

  // hooks
  const [path, setPath] = useState('');
  const [output, setOutput] = useState({});


  // event
  const onAdd = () => {

    window.NativeApi.addExe().then(exe=>{
      setOutput(exe);
    })
  }


  const onDevtools = () => window.NativeApi.openDevtools();

  const onRun = () => window.NativeApi.run(path);

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
