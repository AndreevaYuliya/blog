import { FC } from "react";

import Container from "../../components/Container";
import Header from "../../components/Header";
import LoginForm from "../../components/LoginForm";

const LoginPage: FC = () => {
  return (
    <Container>
      <Header title="Login Page" goBackButton />

      <LoginForm />
    </Container>
  );
};

export default LoginPage;
