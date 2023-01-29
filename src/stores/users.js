import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: null,
    name: null,
    connectionTime: null,
  },
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export const { setUser, setUsers } = usersSlice.actions;
export default usersSlice.reducer;
