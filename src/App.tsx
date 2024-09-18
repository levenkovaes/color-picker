import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ColorPicker } from "./components/pages/color-picker";
import { Layout } from "./components/pages/Layout";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route element={<Layout />}>
            <Route index element={<ColorPicker />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
