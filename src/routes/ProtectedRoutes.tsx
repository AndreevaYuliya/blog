import { FC, ReactElement } from "react";
import { Navigate } from "react-router";

import { useAppSelector } from "../store/store";

import routes from "./routes";

type Props = {
  children: ReactElement;
  isAllowed?: boolean;
  redirectPath?: string;
};

const ProtectedRoutes: FC<Props> = (props) => {
  const { children, isAllowed, redirectPath } = props;

  const user = useAppSelector((state) => state.user.user);
  const token = localStorage.getItem("token");

  const allowed = isAllowed ?? (Boolean(user) && Boolean(token));

  if (!allowed) {
    return <Navigate to={redirectPath || routes.login} replace />;
  }

  return children;
};

export default ProtectedRoutes;
