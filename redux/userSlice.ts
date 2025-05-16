import { login, register } from "@/services/auth/authService";
import { createSlice } from "@reduxjs/toolkit";
import { isLoading } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserState {
  user: null;
  isLoading: boolean;
  error: null;
  message: string;
  token: string;
}

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  token: null,
  message: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state) => {
      (state.user = null), (state.token = null);
      (state.error = null), (state.message = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        const { user, token, message } = action.payload;
        state.user = user;
        state.token = token;
        state.message = message;
        // AsyncStorage.setItem("token", JSON.stringify(token));
      })

      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.message = action.error.message;
      })

      // login controllers

      .addCase(login.pending, (state) => {
        state.isLoading = true;
        error = null;
        message = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log("action", action)
        const { user, token, message } = action.payload;
        state.user = user;
        state.token = token;
        state.message = message;
        // AsyncStorage.setItem("token", JSON.stringify(token));
      })

      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.message = action.error.message;
      });
  },
});

export const { signOut } = userSlice.actions;
export default userSlice.reducer;
