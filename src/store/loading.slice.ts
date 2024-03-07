import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: "loading",
  initialState: false,
  reducers: {
    toogleLoading: (_, action: PayloadAction<boolean>) => {
      return action.payload;
    },
  },
});

export default loadingSlice.reducer;

export const { toogleLoading } = loadingSlice.actions;
