import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './index';
import electronStore from './ElectronStore';
import nodePath from 'path'

interface Game {
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
  games: Array<Game>
}

const initialState: GameLibraryState = {
  games: (electronStore.get('games') as Array<Game>) ?? []
};



export const gameLibrarySlice = createSlice({
  name: 'game-libray',
  initialState,
  reducers: {
    addGame: (state, action: PayloadAction<string>) =>{
      const gamePath = action.payload;

      state.games.push({
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
      });
      electronStore.set('games', state.games)
    },
  },
});

export const { addGame } = gameLibrarySlice.actions;

export const selectGames = (state: RootState) => state.gameLibrary.games;

export default gameLibrarySlice.reducer;
