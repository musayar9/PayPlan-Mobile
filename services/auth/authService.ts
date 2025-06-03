import { api } from "@/utils/api";
import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface RegisterData {
  name: string;
  surname: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const register = createAsyncThunk(
  "user/register",
  async (data: RegisterData, { rejectWithValue }) => {
    // console.log("data", data);
    try {
      const response = await api.post("/api/v1/auth/register", data);
      // console.log("response", response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Bilinmeyen bir hata oluştu.";
        return rejectWithValue(message);
      } else {
        return rejectWithValue("Bilinmeyen bir hata oluştu.");
      }
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (data: LoginData, { rejectWithValue }) => {
    // console.log("data", data);
    try {
      const response = await api.post("/api/v1/auth/login", data);
      // console.log("respınse", response.data);
      return response.data;
    } catch (error) {
      console.log("errorersres", error);
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Bilinmeyen bir hata oluştu.";
        return rejectWithValue(message);
      } else {
        console.log("error", error);
        return rejectWithValue("Bilinmeyen bir hata oluştu.");
      }
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "user/getProfile",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/v1/users/${userId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Bilinmeyen bir hata oluştu.";
        return rejectWithValue(message);
      } else {
        return rejectWithValue("Bilinmeyen bir hata oluştu.");
      }
    }
  }
);
