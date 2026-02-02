import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";

import { store } from "./store/store";
import routes from "./routes/routes";

import "./App.css";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import StripePage from "./layouts/StripePage";
import HomePage from "./layouts/HomePage";
import LoginPage from "./layouts/LoginPage";
import RegisterPage from "./layouts/RegisterPage";
import NewPostPage from "./layouts/NewPostPage";
import NotFound from "./layouts/NotFound";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          {/* <Route path={routes.StripePage} element={<StripePage />} /> */}
          <Route
            path="/protected"
            element={
              <ProtectedRoutes>
                <Route path={routes.HomePage} element={<HomePage />} />
                <Route path={routes.NewPostPage} element={<NewPostPage />} />
              </ProtectedRoutes>
            }
          />
          <Route path={routes.LoginPage} element={<LoginPage />} />
          <Route path={routes.RegisterPage} element={<RegisterPage />} />
          <Route path={routes.NotFound} element={<NotFound />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
