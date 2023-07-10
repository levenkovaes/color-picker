import { createSlice } from "@reduxjs/toolkit";
import { RootState, store } from "../../store";

const initialState = {
  content: "content",
};

export const featureSlice = createSlice({
  name: "feature",
  initialState,
  reducers: {
    reducer: (state) => {},
  },
});

export const featureSliceReducer = featureSlice.reducer;

export const { reducer } = featureSlice.actions;

export const selectContent = (state: RootState) => {
  return state.feature.content;
};
