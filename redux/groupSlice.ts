import { createGroup, getMyGroups } from "@/services/group/groupService";
import { User } from "@/types/authType";
import { GroupsType } from "@/types/groupsType";
import { createSlice } from "@reduxjs/toolkit";
import { isLoading } from "expo-font";
interface GroupState {
  group: GroupsType[] | null;
  isLoading: boolean;
  error: null;
  message: string;
  membersList: User[];
}

const initialState = {
  group: null,
  isLoading: false,
  error: null,
  message: "",
  membersList: [],
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setMembersList: (state, action) => {
      state.membersList = action.payload;
    },
    cleanMembersList: (state) => {
      state.membersList = [];
    },
    searchFilterGroup: (state, action) => {
      state.group = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyGroups.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = "";
      })
      .addCase(getMyGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.group = action.payload;
      })
      .addCase(getMyGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.message = action.error.message;
      });
  },
});

export const { setMembersList, cleanMembersList, searchFilterGroup } = groupSlice.actions;
export default groupSlice.reducer;
