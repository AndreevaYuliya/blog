import { FC } from "react";
import { Route, Routes } from "react-router";

import { useRequest } from "ahooks";

import routes from "./routes/routes";
import ProtectedRoutes from "./routes/ProtectedRoutes";

import { getUser } from "./api/userActions";
import { useAppDispatch } from "./store/store";
import { setUser } from "./store/slices/userSlice";

import { useAlertContext } from "./providers/AlertContext";

import StripePage from "./layouts/StripePage";
import HomePage from "./layouts/HomePage";
import LoginPage from "./layouts/LoginPage";
import RegisterPage from "./layouts/RegisterPage";
import NewPostPage from "./layouts/NewPostPage";
import NotFound from "./layouts/NotFound";

const App: FC = () => {
  const { showAlert } = useAlertContext();

  const dispatch = useAppDispatch();

  const token = localStorage.getItem("token");

  const { loading: isLoading } = useRequest(getUser, {
    ready: !!token,
    onSuccess: (user) => {
      user && dispatch(setUser(user));
    },
    onError: (error) => {
      showAlert(`Error loading user: ${error.message}`, "error");
    },
  });

  if (isLoading) {
    return null;
  }

  return (
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
  );
};

export default App;
