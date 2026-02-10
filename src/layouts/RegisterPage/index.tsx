import { FC } from "react";

import RegisterForm from "../../components/RegisterForm";
import PageContainer from "../../components/PageContainer";
import ControlBar from "../../components/ControlBar";
import ContentContainer from "../../components/ContentContainer";

const RegisterPage: FC = () => {
  return (
    <PageContainer>
      <ControlBar title="Register Page" />

      <ContentContainer>
        <RegisterForm />
      </ContentContainer>
    </PageContainer>
  );
};

export default RegisterPage;
