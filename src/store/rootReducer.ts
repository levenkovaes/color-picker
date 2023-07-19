import { combineReducers } from "@reduxjs/toolkit";

import { colorPickerSliceReducer } from "./features/color-picker/colorPickerSlice";

export const rootReducer = combineReducers({
  colorPicker: colorPickerSliceReducer,
});
