import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import image from "../../../assets/imgs/image2.jpg";
import { RootState } from "../../store";
import { IAddColorsAction, IChangeColorAction, IState } from "./types";

const initialState: IState = {
  img: image,
  colors: [],
};

export const colorPickerSlice = createSlice({
  name: "colorPicker",
  initialState,
  reducers: {
    addColors: (state, action: PayloadAction<IAddColorsAction>) => {
      state.colors = action.payload;
    },
    changeColor: (state, action: PayloadAction<IChangeColorAction>) => {
      state.colors[action.payload.index] = action.payload.color;
    },
  },
});

export const colorPickerSliceReducer = colorPickerSlice.reducer;
export const selectImg = (state: RootState) => {
  return state.colorPicker.img;
};
export const selectColors = (state: RootState) => {
  return state.colorPicker.colors;
};

export const { addColors, changeColor } = colorPickerSlice.actions;
