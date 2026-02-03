import { FC, ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router";

import { useAppDispatch, useAppSelector } from "../store/store";
import { setUser } from "../store/slices/userSlice";

import routes from "./routes";

type Props = {
  children: ReactNode;
  isAllowed?: boolean;
  redirectPath?: string;
};

const ProtectedRoutes: FC<Props> = (props) => {
  const { children, isAllowed, redirectPath } = props;

  const isAuthenticated = useAppSelector((state) => state.user.user !== null);

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const allowed = isAllowed ?? isAuthenticated;

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }

    setIsLoading(false);
  }, [dispatch]);

  if (isLoading) {
    return null;
  }

  if (!allowed) {
    return <Navigate to={redirectPath || routes.login} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
