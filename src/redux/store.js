import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./authSlice";
import WishListSlice from "./favouriteSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    wishlist: WishListSlice.reducer,
  },
});

export default store;
