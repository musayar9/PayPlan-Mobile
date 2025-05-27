import { TasksType } from "@/types/TaskType";
import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

interface TaskState {
  taskId: String;
  updateTask: Boolean;
  taskUpdateLoading: Boolean;
  myTask: [] ;
  filterData: TasksType[] | null;
  selectedDate?: string;
}

const initialState: TaskState = {
  taskId: "",
  updateTask: false,
  taskUpdateLoading: false,
  filterData: null,
  myTask: null,
  selectedDate: new Date().toISOString().split("T")[0],
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
});

export const {
  setTaskId,
  setUpdateTask,
  setUpdateTaskLoading,
  setMyTask,
  setFilterData,
  setSelectedDate
} = taskSlice.actions;
export default taskSlice.reducer;
