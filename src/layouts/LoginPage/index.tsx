import { FC } from "react";

import { Box } from "@mui/material";
import { Formik } from "formik";

import Header from "../../components/Header";

const LoginPage: FC = () => {
  return (
    <Box>
      <Header title="Login Page" />

      <Formik initialValues={{}} onSubmit={() => {}} type="login"></Formik>
    </Box>
  );
};

export default LoginPage;
