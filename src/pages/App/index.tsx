import React, { MouseEventHandler, useState } from "react";
import { addGame, Game, selectGames } from "@/store/GameLibrarySlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { Button, Menu, Tooltip, Modal, Typography } from 'antd';
import type { MenuProps } from 'antd';
import { FileAddOutlined, SettingOutlined, EditOutlined } from '@ant-design/icons'
import styles from './styles.module.scss'
import TopMenuBar from "@/components/TopMenuBar";
import { Route, Routes } from "react-router-dom";
import GameLibrary from "../GameLibrary";

function App() {









  return (
    <div className={styles.app}>
      <TopMenuBar />
      <Routes>
        <Route path="/" element={ <GameLibrary /> } />
        <Route path="/game-library" element={ <GameLibrary /> } />
        <Route path="/settings" element={ <div>设置页</div> } />
      </Routes>
    </div>
  )
}

export default App;