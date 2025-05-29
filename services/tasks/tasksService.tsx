import { api } from "@/utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTasksByGroupId = createAsyncThunk(
  "tasks/getTasksByGroupId",
  async (groupId: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/v1/tasks/group/${groupId}`);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error?.response.data?.message || "Bilinmeyen bir gata oluştu";
        return rejectWithValue(message);
      } else {
        return rejectWithValue("Bilinmeyen bir hata oluştu.");
      }
    }
  }
);
