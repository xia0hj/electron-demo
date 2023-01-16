import React, { MouseEventHandler, useState } from "react";
import { addGame, Game, selectGames } from "@/store/game-library-slice";
import { useAppDispatch, useAppSelector } from "@/store";
import { Button, Menu, Tooltip, Modal, Typography } from 'antd';
import type { MenuProps } from 'antd';
import { FileAddOutlined, SettingOutlined, EditOutlined } from '@ant-design/icons'
import styles from './index.module.scss'

function GameLibrary() {

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

  function buildSiderBarList(games: {[key:string]:Game}): MenuProps['items'] {
    return [
      {
        key: 'addGame',
        label: '添加游戏',
        icon: <FileAddOutlined />
      },
      {
        type: 'divider',
      },
      ...Object.keys(games).map(key=>({
        key,
        label: games[key].properties.title
      }))
    ]
  }


  const onSiderBarClick: MenuProps['onClick'] = function (info) {
    if(info.key==='addGame'){
      clickAddGame()
    }else{
      setCurGameDetail(games[info.key])
    }
  }


  function renderGameDetail() {
    if (curGameDetail) {
      return (
        <div className={styles.detail_top}>
          <Typography.Title className={styles.title}>{curGameDetail.properties.title}</Typography.Title>
          <Tooltip title="编辑属性">
            <EditOutlined className={styles.edit_icon}  />
          </Tooltip>
        </div>
      )
    }
  }



  return (
    <div className={styles.game_library}>
      <Menu className={styles.sider_bar} items={buildSiderBarList(games)} mode="vertical" onClick={onSiderBarClick} />
      <div className={styles.detail}>
        {renderGameDetail()}
      </div>
    </div>
  )
}

export default GameLibrary
