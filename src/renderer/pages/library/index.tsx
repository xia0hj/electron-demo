import { App } from '@shared/types';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import { useState } from 'react';

import styles from './index.module.scss';

const initialAppList:App[] = window.NativeApi.getAllApps();

const Library = ():JSX.Element => {

  const [appList, setAppList] = useState<App[]>(initialAppList);



  const convertAppListToMenuItems = ():MenuProps['items'] => {
    const items = appList.map(app=>{
      return {
        key: `appList-${app.id}`,
        label: app.name,
      }
    });
    items.unshift({
      key: 'add',
      label: 'add'
    })
    return items;
  }

  const menuClickHandler:MenuProps['onClick'] = (menuInfo)=>{
    if(menuInfo.key==='add'){
      window.NativeApi.addExe().then(newApp=>{
        if(newApp!==null){
          setAppList([newApp, ...appList]);
        }
      });
    }else if(menuInfo.key.startsWith('appList-')) {

    }

  }



  return (
    <div className={styles['library-layout']}>
      <Menu
        mode="vertical"
        items={convertAppListToMenuItems()}
        onClick={menuClickHandler}
      />
    </div>
  )
}

export default Library;
