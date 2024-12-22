import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    ids: [],
  },
  reducers: {
    addFavourite: (state, action) => {
      if (!state.ids.includes(action.payload)) {
        state.ids.push(action.payload);
      }
    },
    removeFavourite: (state, action) => {
      const index = state.ids.indexOf(action.payload);
      if (index !== -1) {
        state.ids.splice(index, 1);
      }
    },
  },
});

export const { addFavourite, removeFavourite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
