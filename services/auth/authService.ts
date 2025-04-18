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
    console.log("data", data);
    try {
      const response = await api.post("/api/v1/auth/register", data);
      console.log("response", response.data);
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
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/v1/auth/login", data);
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
