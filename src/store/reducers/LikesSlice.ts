import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LikesState {
  products: string[];
}

const initialState: LikesState = {
  products: ["1", "2", "3"],
};

export const LikesSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addLike: (state, action: PayloadAction<string>) => {
      state.products.push(action.payload);
    },
    removeLike: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((el) => el !== action.payload);
    },
  },
});

export default LikesSlice.reducer;
export const { addLike, removeLike } = LikesSlice.actions;
