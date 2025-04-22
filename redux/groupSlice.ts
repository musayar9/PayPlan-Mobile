import { createGroup } from "@/services/group/groupService";
import { createSlice } from "@reduxjs/toolkit";
import { isLoading } from "expo-font";
interface GroupState {
  group: null;
  isLoading: boolean;
  error: null;
  message: string;
}

const initialState = {
  group: null,
  isLoading: false,
  error: null,
  message: "",
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createGroup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = "";
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        const { group, message } = action.payload;
        state.group = group;
        state.message = message;
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.message = action.error.message;
      });
  },
});
