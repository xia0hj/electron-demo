import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import {AppstoreOutlined,SettingOutlined} from '@ant-design/icons';

const LeftToolBar = ():JSX.Element => {
  const items: MenuProps['items'] = [
    {
      key: 'k1',
      label: 'lib',
      icon:<AppstoreOutlined />
    },
    {
      key: 'settings',
      label: 'settings',
      icon: <SettingOutlined />
    }
  ];

  return (
    <Menu
      items={items}
      mode="vertical"
    />
  )
}

export default LeftToolBar;
