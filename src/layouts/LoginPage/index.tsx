import { FC } from "react";

import LoginForm from "../../components/LoginForm";
import PageContainer from "../../components/PageContainer";
import ContentContainer from "../../components/ContentContainer";
import ControlBar from "../../components/ControlBar";

const LoginPage: FC = () => {
  return (
    <PageContainer>
      <ControlBar title="Login Page" />

      <ContentContainer>
        <LoginForm />
      </ContentContainer>
    </PageContainer>
  );
};

export default LoginPage;
