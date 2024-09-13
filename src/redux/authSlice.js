import { createSlice } from "@reduxjs/toolkit";

const initial = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : {
      login: false,
      id: "",
      name: "",
      email: "",
    };

const AuthSlice = createSlice({
  name: "Auth",
  initialState: initial,
  reducers: {
    doLogin(state, action) {
      state.login = action.payload.login;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;

      localStorage.setItem("auth", JSON.stringify(state));
    },
    doLogOut(state) {
      state.login = false;
      state.id = "";
      state.name = "";
      state.email = "";

      localStorage.setItem("auth", JSON.stringify(state));
    },
  },
});

export default AuthSlice;
export const { doLogin, doLogOut } = AuthSlice.actions;
