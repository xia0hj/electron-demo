import React, { MouseEventHandler, useState } from "react";
import { addGame, Game, selectGames } from "@/store/GameLibrarySlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { Button, Menu, Tooltip, Modal, Typography } from 'antd';
import type { MenuProps } from 'antd';
import { FileAddOutlined, SettingOutlined, EditOutlined } from '@ant-design/icons'
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

  const [curGameDetail, setCurGameDetail] = useState<Game>();
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

  function mapGamesToSiderMenuItems(games: Array<Game>): MenuProps['items'] {
    return games.map(game => ({
      label: game.properties.title,
      key: game.properties.title
    }))
  }

  const onTopMenuBarClick: MenuProps['onClick'] = function (e) {
    switch (e.key) {
      case 'addGame': {
        clickAddGame();
      }
    }
  }

  const onSiderBarClick: MenuProps['onClick'] = function (e) {
    setCurGameDetail(games.find(game => game.properties.title === e.key))
  }

  function onEditPropertiesClick() {
    Modal.confirm({
      title: '编辑属性'
    })
  }

  function renderGameDetail() {
    if (curGameDetail) {
      return (
        <div className={styles.detail_top}>
          <Typography.Title className={styles.title}>{curGameDetail.properties.title}</Typography.Title>
          <Tooltip title="编辑属性">
            <EditOutlined className={styles.edit_icon} onClick={onEditPropertiesClick} />
          </Tooltip>
        </div>
      )
    }
  }

  return (
    <div className={styles.container}>
      <Menu items={topMenuConfig} mode="horizontal" selectable={false} onClick={onTopMenuBarClick} />
      <div className={styles.content}>
        <Menu items={mapGamesToSiderMenuItems(games)} mode="vertical" onClick={onSiderBarClick} />
        <div className={styles.detail}>
          <a />
          {renderGameDetail()}
        </div>
      </div>
    </div>
  )
}

export default App;