import { createSlice } from "@reduxjs/toolkit";

interface TaskState {
  taskId: String;
}

const initialState: TaskState = {
  taskId: "",
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTaskId: (state, action) => {
      state.taskId = action.payload;
    },
  },
});

export const { setTaskId } = taskSlice.actions;
export default taskSlice.reducer;
