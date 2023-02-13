import { App } from '@shared/types';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import { useState } from 'react';

import styles from './index.module.scss';

const initialAppList: App[] = window.NativeApi.getAllApps();

const Library = (): JSX.Element => {

  const [appList, setAppList] = useState<App[]>(initialAppList);



  const convertAppListToMenuItems = (): MenuProps['items'] => {
    return appList.map(app => {
      return {
        key: `appList-${app.id}`,
        label: app.name,
      }
    });
  }

  const menuClickHandler: MenuProps['onClick'] = (menuInfo) => {
    if (menuInfo.key === 'add') {
      window.NativeApi.addExe().then(newApp => {
        if (newApp !== null) {
          setAppList([newApp, ...appList]);
        }
      });
    } else if (menuInfo.key.startsWith('appList-')) {

    }

  }



  return (
    <div className={styles['library-layout']}>
      <div className={styles['layout-left']}>
        <div className={styles['left-top']}>
          <Button>add</Button>
          <Button>sort</Button>
        </div>

        <Menu
          mode="vertical"
          items={convertAppListToMenuItems()}
          onClick={menuClickHandler}
        />
      </div>

    </div>
  )
}

export default Library;
