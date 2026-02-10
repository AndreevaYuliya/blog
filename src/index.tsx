import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";

import reportWebVitals from "./reportWebVitals";

import { store } from "./store/store";

import { AlertProvider } from "./providers/AlertContext";
import Notification from "./providers/Notification";

import App from "./App";

import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AlertProvider>
          <Notification>
            <App />
          </Notification>
        </AlertProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
