import React from "react";
import { addGame, selectGames } from "@/store/gameLibrarySlice";
import { useAppDispatch, useAppSelector } from "@/store";
import {Button, Menu} from 'antd';
import type { MenuProps } from 'antd';
import {FileAddOutlined, SettingOutlined} from '@ant-design/icons'

const topMenuConfig: MenuProps['items'] = [
  {
    label: '添加游戏',
    key: 'addGame',
    icon: <FileAddOutlined />
  },
  {
    label: '设置',
    key: 'settings',
    icon: <SettingOutlined />
  }
]

function App() {

  const games = useAppSelector(selectGames);
  const dispatch = useAppDispatch()

  function clickAddGame() {
    window.ipcEventSender.openAddGameDialog().then(({ filePaths, canceled }) => {
      if (canceled || filePaths.length === 0) {
        return;
      }

      dispatch(addGame(filePaths[0]))

      console.log(games)
    })
  }

  const onTopMenuBarClick: MenuProps['onClick'] = function(e){
    switch(e.key){
      case 'addGame':{
        clickAddGame();
      }
    }
  }

  return (
    <React.Fragment>
      <Menu items={topMenuConfig} mode="horizontal" selectable={false} onClick={onTopMenuBarClick}/>
      <div>
        {
          games.map(game => <p key={game.properties.title}>{JSON.stringify(game)}</p>)
        }
      </div>

    </React.Fragment>
  )
}

export default App;