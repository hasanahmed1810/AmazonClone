import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchItems: [],
  allItems: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchItems: (state, action) => {
      state.searchItems = [...action.payload];
    },
    setAllItems: (state, action) => {
      state.allItems = [...action.payload];
    },
  },
});

export const { setSearchItems, setAllItems } = searchSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectSearchItems = (state) => state.search.searchItems;
export const selectAllItems = (state) => state.search.allItems;

export default searchSlice.reducer;
