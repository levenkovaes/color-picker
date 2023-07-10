import { BrowserRouter, Route, Routes } from "react-router-dom";

import { People } from "./components/features/people/People";
import { Person } from "./components/features/person/Person";
import { Planet } from "./components/features/planet/Planet";
import { Planets } from "./components/features/planets/Planets";
import { Home } from "./components/pages/home/Home";
import { Layout } from "./components/pages/Layout";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />}></Route>
          <Route element={<Layout />}>
            <Route path="planets" element={<Planets />}></Route>
            <Route path="people" element={<People />}></Route>
            <Route path="people/:personId" element={<Person />}></Route>
            <Route path="planets/:planetId" element={<Planet />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
