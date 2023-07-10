import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { App } from "./App";
import "../scss/input.scss";
import { Provider } from "react-redux";
import { store } from "./store/store";

// ReactDOM.render(<App />, document.getElementById("root"));

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
