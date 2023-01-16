import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './index';
import { userDataGet, userDataSet } from './persistence';
import nodePath from 'path'

export interface Game {
  properties: {
    title: string,
    path:string,
    description?:string,
  },
  stats: {
    totalRunDuration: number,
    lastRunTime: number,
    totalRunNumber: number,
  }
}

export interface GameLibraryState {
  games: {[key:string]:Game}
}

function parseGamesJsonToMap(){
  const localGames = userDataGet('games', {}) as {[key:string]:Game};
  const gamesMap = new Map<string, Game>()
  Object.keys(localGames).forEach(key=>{
    gamesMap.set(key, localGames[key])
  })
  return gamesMap;
}

const initialState: GameLibraryState = {
  games: userDataGet('games', {}) as {[key:string]:Game}
};



export const gameLibrarySlice = createSlice({
  name: 'game-libray',
  initialState,
  reducers: {
    addGame: (state, action: PayloadAction<string>) =>{
      const gamePath = action.payload;

      state.games[gamePath] = {
        properties: {
          title: nodePath.basename(gamePath, '.exe'),
          path: gamePath,
          description: ''
        },
        stats: {
          totalRunDuration: 0,
          lastRunTime: 0,
          totalRunNumber: 0,
        }
      }

      userDataSet(`games.${gamePath}`, state.games)
    },
  },
});

export const { addGame } = gameLibrarySlice.actions;

export const selectGames = (state: RootState) => state.gameLibrary.games;

export default gameLibrarySlice.reducer;
