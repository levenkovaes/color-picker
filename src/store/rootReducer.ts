import { combineReducers } from "@reduxjs/toolkit";

import { smthSliceReducer } from "./features/smth/smthSlice";

export const rootReducer = combineReducers({
  smth: smthSliceReducer,
});
