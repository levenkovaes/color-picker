import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { featureSliceReducer } from "./features/featureSlice/featureSlice";

const rootReducer = combineReducers({
  feature: featureSliceReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
