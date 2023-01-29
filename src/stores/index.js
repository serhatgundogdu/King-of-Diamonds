import { configureStore } from "@reduxjs/toolkit";

import users from "./users";
import game from "./game";

const store = configureStore({
  reducer: {
    users,
    game,
  },
});

export default store;
