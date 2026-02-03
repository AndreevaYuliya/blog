import { FC } from "react";

import Header from "../../components/Header";
import RegisterForm from "../../components/RegisterForm";
import Container from "../../components/Container";

const RegisterPage: FC = () => {
  return (
    <Container>
      <Header title="Register Page" goBackButton />

      <RegisterForm />
    </Container>
  );
};

export default RegisterPage;
