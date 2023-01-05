import { Store, simpleStore } from "./Store"
import nodePath from 'path'

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

export interface GameProfile {
  version: string,
  games: Array<Game>
}

class GameDataManager {

  store: Store
  games: Array<Game>


  constructor(storeImpl: Store) {
    this.store = storeImpl
    this.games = []
  }

  addGame(path: string) {
    this.games.unshift({
      properties: {
        title: nodePath.basename(path, 'exe'),
        path
      },
      stats: {
        totalRunDuration: 0,
        lastRunTime: 0,
        totalRunNumber: 0,
      }
    })
  }
}

const gameDataManager = new GameDataManager(simpleStore);
export default gameDataManager;