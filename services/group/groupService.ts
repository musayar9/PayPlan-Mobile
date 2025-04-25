import { api } from "@/utils/api";
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
      const response = await api.post("/api/v1/groups", data);
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

export const getMyGroups = createAsyncThunk(
  "group/getMyGroups",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/v1/groups/my-groups/${userId}`);
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
