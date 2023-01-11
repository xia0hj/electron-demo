import { Menu, MenuProps } from "antd";
import {useNavigate} from 'react-router-dom'

function TopMenuBar(){

  const navigate = useNavigate();

  const topMenuConfig: MenuProps['items'] = [
    {
      key: 'gameLibrary',
      label: '游戏库'
    },
    {
      key: 'settings',
      label: '设置'
    }
  ];

  const onTopMenuBarClick: MenuProps['onClick'] = function(info) {
    if(info.key==='gameLibrary'){
      navigate('/game-library')
    }
  }



  return <Menu items={topMenuConfig} mode="horizontal" selectable={false} onClick={onTopMenuBarClick} />
}

export default TopMenuBar;
