import { App } from '@shared/types';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import { useState } from 'react';

import styles from './index.module.scss';



const Library = ():JSX.Element => {

  const [appList, setAppList] = useState<App[]>([]);


  return (
    <div className={styles['library-container']}>

    </div>
  )
}

export default Library;
