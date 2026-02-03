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
import { object, string, InferType, ref } from "yup";

import { registerUser } from "../api/userActions";
import { useAppDispatch } from "../store/store";
import { setUser } from "../store/slices/userSlice";
import routes from "../routes/routes";

import { StyledField } from "../styles";

let RegisterSchema = object({
  userName: string().required("Required"),
  login: string(),
  email: string().email("Invalid email address").required("Required"),
  password: string()
    .required("Required")
    .min(6, "Password must be at least 6 characters long"),
  confirmPassword: string()
    .oneOf([ref("password"), ""], "Passwords must match")
    .required("Required"),
});

const RegisterForm: FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prevValue) => !prevValue);
  };

  const onSubmit = async (values: InferType<typeof RegisterSchema>) => {
    try {
      const user = await registerUser(
        values.userName,
        values.login,
        values.email,
        values.password,
      );

      dispatch(setUser(user));

      navigate(routes.home);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }

      console.error("Failed to Register:", error);
    }
  };

  return (
    <Formik
      initialValues={{
        userName: "",
        login: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={RegisterSchema}
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
            name="userName"
            type="text"
            label="Name"
            placeholder="Enter your name"
            error={touched.userName && Boolean(errors.userName)}
            helperText={touched.userName && errors.userName}
          />

          <StyledField
            component={TextField}
            name="login"
            type="text"
            label="Login"
            placeholder="Enter your login"
            error={touched.login && Boolean(errors.login)}
            helperText={touched.login && errors.login}
          />

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
                      }}
                    />
                  ) : (
                    <VisibilityOff
                      onClick={handleClickShowPassword}
                      sx={{
                        cursor: "pointer",
                        "&:hover": { color: colors.green[300] },
                        color: colors.green[500],
                      }}
                    />
                  )}
                </InputAdornment>
              ),
            }}
          />

          <StyledField
            component={TextField}
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            label="Confirm Password"
            placeholder="Confirm your password"
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {showConfirmPassword ? (
                    <Visibility
                      onClick={handleClickShowConfirmPassword}
                      sx={{
                        cursor: "pointer",
                        color: colors.green[500],
                        "&:hover": { color: colors.green[300] },
                      }}
                    />
                  ) : (
                    <VisibilityOff
                      onClick={handleClickShowConfirmPassword}
                      sx={{
                        cursor: "pointer",
                        color: colors.green[500],
                        "&:hover": { color: colors.green[300] },
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
              <Typography variant="button">Register</Typography>
            )}
          </Button>

          <Box>
            <Typography
              variant="body2"
              component="span"
              sx={{ marginRight: 1 }}
              color={colors.grey[700]}
            >
              Already have an account?
            </Typography>

            <Link
              variant="button"
              sx={{ cursor: "pointer", color: colors.green[300] }}
              onClick={() => navigate(routes.login)}
            >
              Login
            </Link>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;

