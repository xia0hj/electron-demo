import React from "react";
import { addGame, Game, selectGames } from "@/store/gameLibrarySlice";
import { useAppDispatch, useAppSelector } from "@/store";
import {Button, Menu} from 'antd';
import type { MenuProps } from 'antd';
import {FileAddOutlined, SettingOutlined} from '@ant-design/icons'
import styles from './styles.module.scss'

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

  function mapGamesToSiderMenuItems(games:Array<Game>): MenuProps['items'] {
    return games.map(game=>({
      label: game.properties.title,
      key: game.properties.title
    }))
  }

  const onTopMenuBarClick: MenuProps['onClick'] = function(e){
    switch(e.key){
      case 'addGame':{
        clickAddGame();
      }
    }
  }

  return (
    <div className={styles.container}>
      <Menu items={topMenuConfig} mode="horizontal" selectable={false} onClick={onTopMenuBarClick}/>
      <div className={styles.content}>
        <Menu items={mapGamesToSiderMenuItems(games)} mode="vertical" />
      </div>
    </div>
  )
}

export default App;