import { register } from "@/services/auth/authService";
import { createSlice } from "@reduxjs/toolkit";
import { isLoading } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { act } from "react";
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
  reducers: {},
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
        AsyncStorage.setItem("token", JSON.stringify(token));
      })

      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.message = action.error.message;
      });
  },
});

export default userSlice.reducer;
