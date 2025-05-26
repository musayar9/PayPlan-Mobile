import { TasksType } from "@/types/TaskType";
import { createSlice } from "@reduxjs/toolkit";

interface TaskState {
  taskId: String;
  updateTask: Boolean;
  taskUpdateLoading: Boolean;
  myTask: TasksType[] | null;
  filterData: TasksType[] | null;
}

const initialState: TaskState = {
  taskId: "",
  updateTask: false,
  taskUpdateLoading: false,
  filterData: null,
  myTask: null,
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
  },
});

export const {
  setTaskId,
  setUpdateTask,
  setUpdateTaskLoading,
  setMyTask,
  setFilterData,
} = taskSlice.actions;
export default taskSlice.reducer;
