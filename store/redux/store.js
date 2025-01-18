// store.js
import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favorites";

const store = configureStore({
  reducer: {
    favoriteEvents: favoritesReducer,
  },
});

export default store;
