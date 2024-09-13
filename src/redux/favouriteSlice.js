import { createSlice } from "@reduxjs/toolkit";

const initial = localStorage.getItem("fvts")
  ? JSON.parse(localStorage.getItem("fvts"))
  : [];

const WishListSlice = createSlice({
  name: "WishList",
  initialState: initial,
  reducers: {
    addToWishList: (state, action) => {
      state.push(action.payload);

      localStorage.setItem("fvts", JSON.stringify(state));
    },
    removeFromWishList: (state, action) => {
      const filter = state.filter((fvt) => fvt.productId !== action.payload);
      state = filter;

      localStorage.setItem("fvts", JSON.stringify(filter));
    },
  },
});

export default WishListSlice;
export const { addToWishList, removeFromWishList } = WishListSlice.actions;
