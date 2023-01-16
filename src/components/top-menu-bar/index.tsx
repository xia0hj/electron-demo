import { Menu, MenuProps } from "antd";
import {useNavigate} from 'react-router-dom'
import {DatabaseOutlined,SettingOutlined} from '@ant-design/icons'

function TopMenuBar(){

  const navigate = useNavigate();

  const topMenuConfig: MenuProps['items'] = [
    {
      key: 'gameLibrary',
      label: '游戏库',
      icon: <DatabaseOutlined />
    },
    {
      key: 'settings',
      label: '设置',
      icon:<SettingOutlined />
    }
  ];

  const onTopMenuBarClick: MenuProps['onClick'] = function(info) {
    if(info.key==='gameLibrary'){
      navigate('/game-library')
    }else if(info.key==='settings'){
      navigate('/settings')
    }
  }



  return <Menu items={topMenuConfig} mode="horizontal" selectable={false} onClick={onTopMenuBarClick} />
}

export default TopMenuBar;
