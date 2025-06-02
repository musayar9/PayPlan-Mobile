import { getTasksByGroupId, getTasksByUserId } from "@/services/tasks/tasksService";
import { TasksType } from "@/types/TaskType";
import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

interface TaskState {
  taskId: String;
  updateTask: Boolean;
  taskUpdateLoading: Boolean;
  myTask: [];
  filterData: TasksType[] | null;
  selectedDate?: string;
  groupTasks: TasksType[] | null;
  loading: boolean;
  error: string | null;
  getTasksByUser: TasksType[] | null;
}

const initialState: TaskState = {
  taskId: "",
  updateTask: false,
  taskUpdateLoading: false,
  filterData: null,
  myTask: null,
  selectedDate: new Date().toISOString().split("T")[0],
  groupTasks: null,
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTaskId: (state, action) => {
      state.taskId = action.payload;
    },
    setUpdateTask: (state, action) => {
      state.updateTask = action.payload;
    },
    setUpdateTaskLoading: (state, action) => {
      state.taskUpdateLoading = action.payload;
    },
    setMyTask: (state, action) => {
      state.myTask = action.payload;
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasksByGroupId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasksByGroupId.fulfilled, (state, action) => {
        state.loading = false;
        state.groupTasks = action.payload;
        state.error = null;
      })
      .addCase(getTasksByGroupId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getTasksByUserId.fulfilled, (state, action) => {
        state.getTasksByUser = action.payload;
      });
  },
});

export const {
  setTaskId,
  setUpdateTask,
  setUpdateTaskLoading,
  setMyTask,
  setFilterData,
  setSelectedDate,
} = taskSlice.actions;
export default taskSlice.reducer;
