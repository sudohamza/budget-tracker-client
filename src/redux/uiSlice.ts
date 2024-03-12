import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: false,
};

const uiSlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
  },
});

export default uiSlice.reducer;
export const { openSidebar, closeSidebar } = uiSlice.actions;
