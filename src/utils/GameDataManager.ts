import nodePath from 'path'
import Store from 'electron-store'
import { app } from 'electron'

export interface Game {
  properties: {
    title: string,
    path: string,
  },
  stats: {
    totalRunDuration: number,
    lastRunTime: number,
    totalRunNumber: number,
  }
}

class GameDataManager {

  store: Store
  games: Array<Game>


  constructor() {
    this.store = new Store({
      name: 'MyGame',
      fileExtension: 'json',
      cwd: nodePath.join(window.ipcEventSender.getAppPath(), 'userdata')
    });
    this.games = (this.store.get('games') as Array<Game>) ?? []
  }

  addGame(path: string) {
    this.games.unshift({
      properties: {
        title: nodePath.basename(path, '.exe'),
        path
      },
      stats: {
        totalRunDuration: 0,
        lastRunTime: 0,
        totalRunNumber: 0,
      }
    })
    this.store.set('games', this.games)
  }

}

const gameDataManager = new GameDataManager();
export default gameDataManager;
