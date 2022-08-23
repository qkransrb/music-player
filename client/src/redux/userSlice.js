import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: undefined,
    allSongs: [],
    currentSong: null,
    currentSongIndex: 0,
  },
  reducers: {
    SetUser: (state, action) => {
      state.user = action.payload;
    },
    SetAllSongs: (state, action) => {
      state.allSongs = action.payload;
    },
    SetCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
    SetCurrentSongIndex: (state, action) => {
      state.currentSongIndex = action.payload;
    },
  },
});

export const { SetUser, SetAllSongs, SetCurrentSong, SetCurrentSongIndex } =
  userSlice.actions;
