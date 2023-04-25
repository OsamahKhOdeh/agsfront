/* eslint-disable no-unused-expressions */
import { createSlice } from "@reduxjs/toolkit";
export const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
  },
  reducers: {
    fetchAll: (state, action) => {
      const data = action.payload;
      console.log(data);
      state.projects = data;
    },
  },
});

export const { fetchAll } = projectSlice.actions;

export default projectSlice.reducer;
