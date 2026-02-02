import { FC, ReactNode } from "react";
import { Navigate } from "react-router";
import routes from "./routes";
import { useAppSelector } from "../store/store";

type Props = {
  children: ReactNode;
  isAllowed?: boolean;
  redirectPath?: string;
};

const ProtectedRoutes: FC<Props> = (props) => {
  const { children, isAllowed, redirectPath } = props;

  const isAuthenticated = useAppSelector((state) => state.user !== null);
  const allowed = isAllowed ?? isAuthenticated;

  if (!allowed) {
    return <Navigate to={redirectPath || routes.LoginPage} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;

