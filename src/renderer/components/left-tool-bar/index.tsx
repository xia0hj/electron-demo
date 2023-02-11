import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'

const LeftToolBar = (): JSX.Element => {

  const navigate = useNavigate();

  const items: MenuProps['items'] = [
    {
      key: 'library',
      label: 'Library',
      icon: <AppstoreOutlined />
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: <SettingOutlined />
    }
  ];

  const onMenuItemClick: MenuProps['onClick'] = (menuInfo) => navigate(menuInfo.key);

  return (
    <Menu
      items={items}
      mode="vertical"
      onClick={onMenuItemClick}
    />
  )
}

export default LeftToolBar;
