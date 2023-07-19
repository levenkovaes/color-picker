import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ColorPicker } from "./components/pages/color-picker/ColorPicker";
import { Home } from "./components/pages/home/Home";
import { Layout } from "./components/pages/Layout";
import { Paint } from "./components/pages/paint/Paint";
import { Playground } from "./components/pages/playground/Playground";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />}></Route>
          <Route element={<Layout />}>
            <Route path="playground" element={<Playground />}></Route>
            <Route path="color-picker" element={<ColorPicker />}></Route>
            <Route path="paint" element={<Paint />}></Route>
            {/* <Route path="people/:personId" element={<Person />}></Route>
            <Route path="planets/:planetId" element={<Planet />}></Route> */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
