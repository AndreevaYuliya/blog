import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";

import { store } from "./store/store";
import routes from "./routes/routes";
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
          <Route path={routes.stripe} element={<StripePage />} />
          <Route
            path={routes.home}
            element={
              <ProtectedRoutes>
                <HomePage />
              </ProtectedRoutes>
            }
          />

          <Route
            path={routes.newPost}
            element={
              <ProtectedRoutes>
                <NewPostPage />
              </ProtectedRoutes>
            }
          />

          <Route path={routes.login} element={<LoginPage />} />
          <Route path={routes.register} element={<RegisterPage />} />
          <Route path={routes.notFound} element={<NotFound />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
