import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: null,
  step: "beggining",
  usersPlaying: [],
  usersSpectating: [],
  usersKilled: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setPlayers: (state, action) => {
      state.usersPlaying = action.payload;
    },
    setSpectators: (state, action) => {
      state.usersSpectating = action.payload;
    },
    setUsersKilled: (state, action) => {
      state.usersKilled = action.payload;
    },
  },
});

export const { setStatus, setPlayers, setSpectators, setUsersKilled, setStep } =
  gameSlice.actions;
export default gameSlice.reducer;
