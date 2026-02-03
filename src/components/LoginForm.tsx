import { FC, useState } from "react";
import { useNavigate } from "react-router";

import {
  Box,
  Button,
  CircularProgress,
  colors,
  InputAdornment,
  Link,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik, Form } from "formik";
import { TextField } from "formik-mui";
import { object, string, InferType } from "yup";

import { logInUser } from "../api/userActions";
import { useAppDispatch } from "../store/store";
import { setUser } from "../store/slices/userSlice";
import routes from "../routes/routes";

import { StyledField } from "../styles";

let LoginSchema = object({
  email: string().email("Invalid email address").required("Required"),
  password: string()
    .required("Required")
    .min(6, "Password must be at least 6 characters long"),
});

const LoginForm: FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () =>
    setShowPassword((prevValue) => !prevValue);

  const onSubmit = async (values: InferType<typeof LoginSchema>) => {
    try {
      const user = await logInUser(values.email, values.password);

      dispatch(setUser(user));

      navigate(routes.home);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }

      console.error("Failed to login:", error);
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={onSubmit}
    >
      {({ submitForm, isSubmitting, touched, errors, isValid, dirty }) => (
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 15,
            boxSizing: "border-box",
            borderRadius: 10,
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
            padding: 20,
            width: 340,
            marginTop: 50,
          }}
        >
          <StyledField
            component={TextField}
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />

          <StyledField
            component={TextField}
            name="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            placeholder="Enter your password"
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {showPassword ? (
                    <Visibility
                      onClick={handleClickShowPassword}
                      sx={{
                        cursor: "pointer",
                        color: colors.green[500],
                        ":hover": { color: colors.green[300] },
                      }}
                    />
                  ) : (
                    <VisibilityOff
                      onClick={handleClickShowPassword}
                      sx={{
                        color: colors.green[500],
                        cursor: "pointer",
                        ":hover": { color: colors.green[300] },
                      }}
                    />
                  )}
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={isSubmitting || !isValid || !dirty}
            sx={{ height: 45, boxSizing: "border-box" }}
            onClick={submitForm}
          >
            {isSubmitting ? (
              <CircularProgress size={24} />
            ) : (
              <Typography variant="button">Login</Typography>
            )}
          </Button>

          <Box>
            <Typography
              variant="subtitle2"
              component="span"
              sx={{ marginRight: 1 }}
            >
              Don't have an account?
            </Typography>

            <Link
              variant="button"
              sx={{ cursor: "pointer", color: colors.green[300] }}
              onClick={() => navigate(routes.register)}
            >
              Register
            </Link>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;

