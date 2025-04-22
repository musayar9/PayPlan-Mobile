import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface CreateGroupData {
  name: string;
  description: string;
  members: string[];
  groupPicture: string;
  createdBy: string;
}

export const createGroup = createAsyncThunk(
  "group/createGroup",
  async (data: CreateGroupData, { rejectWithValue }) => {
    try {
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
