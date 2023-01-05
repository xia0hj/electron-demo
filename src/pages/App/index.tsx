import React, { useState } from "react";
import gameDataManager, { Game } from "@/utils/GameDataManager";

function App() {

  const [games, setGames] = useState<Array<Game>>([]);

  function addGame(){
    window.ipcEventSender.openAddGameDialog().then(({filePaths, canceled})=>{
      if(canceled || filePaths.length===0){
        return;
      }

      gameDataManager.addGame(filePaths[0]);

      setGames(gameDataManager.games);

      console.log(gameDataManager.games)
    })
  }

  return (
    <React.Fragment>
      <button onClick={addGame}>添加游戏</button>
      <p>{games.toString()}</p>
    </React.Fragment>
  )
}

export default App;