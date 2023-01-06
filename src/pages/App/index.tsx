import React from "react";
import { addGame, selectGames } from "@/store/GameLibrarySlice";
import { useAppDispatch, useAppSelector } from "@/store";
import {Button} from 'antd'

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

  return (
    <React.Fragment>
      <Button type="primary" onClick={clickAddGame}>添加游戏</Button>
      <div>
        {
          games.map(game => <p key={game.properties.title}>{JSON.stringify(game)}</p>)
        }
      </div>

    </React.Fragment>
  )
}

export default App;