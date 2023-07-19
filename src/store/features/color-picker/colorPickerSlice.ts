import { createSlice } from "@reduxjs/toolkit";

import image from "../../../assets/imgs/image1.jpg";
import { RootState } from "../../store";

const initialState = {
  img: image,
  colors: [],
  size: { width: 0, height: 0 },
};

export const colorPickerSlice = createSlice({
  name: "colorPicker",
  initialState,
  reducers: {
    addColors: (state, action) => {
      state.colors = action.payload;
    },
    changeColor: (state, action) => {
      state.colors[action.payload.index] = action.payload.color;
    },
    // updateSize: (state, action) => {
    //   state.size = action.payload;
    // },
  },
});

export const colorPickerSliceReducer = colorPickerSlice.reducer;
export const selectImg = (state: RootState) => {
  return state.colorPicker.img;
};
export const selectColors = (state: RootState) => {
  return state.colorPicker.colors;
};

// export const selectSize = (state: RootState) => state.colorPicker.size;

export const { addColors, changeColor } = colorPickerSlice.actions;
