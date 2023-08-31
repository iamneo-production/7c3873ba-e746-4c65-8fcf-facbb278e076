import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Form, Formik, useFormik } from "formik";
import { toast } from "react-toastify";

import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { CheckLogin } from "./../Services/http.service";
import { Card, useMediaQuery } from "@mui/material";
import DialpadIcon from "@mui/icons-material/Dialpad";

import TtyIcon from "@mui/icons-material/Tty";

export const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    CheckLogin(e.email)
      .then((resp) => {
        if (e.email !== resp.data.id) {
          toast.error("Invalid Credentials", {
            theme: "colored",
          });
        } else {
          if (resp.data.password === e.password) {
            sessionStorage.setItem("email", e.email);
            toast.success("Successfully Logged In", {
              theme: "colored",
            });
            navigate("/home");
          } else {
            toast.error("Invalid Credentials", {
              theme: "colored",
            });
          }
        }
      })
      .catch((err) => {
        // toast.warn(err.message, {
        //   theme: "colored",
        // });
        toast.warn("Invalid Credentials", {
          theme: "colored",
        });
      });
  };
  const SigninSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Minimum 8 characters")
      .max(12, "Maximum 12 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      handleLogin(values);
    },
    validationSchema: SigninSchema,
  });
  const isNonMobile = useMediaQuery("(min-width:640px)");
  return (
    <Box height="99vh">
      <Container
        maxWidth="xs"
        className="center-container"
        sx={{
          boxShadow: isNonMobile
            ? "0px 1px 5px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 1px rgba(0, 0, 0, 0.2);"
            : "none",
          borderRadius: isNonMobile ? "0.5rem" : "none",
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <TtyIcon
            style={{ width: 40, height: 40, color: "green", marginBottom: 5 }}
          />
          <Typography
            textAlign="center"
            component="h1"
            variant="h5"
            style={{ fontWeight: "bold" }}
          >
            Welcome to the Telecom Service
          </Typography>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box sx={{ width: "100%" }}>
            <Formik>
              <Form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.errors.email && formik.touched.email ? (
                  <Typography
                    variant="caption"
                    style={{ color: "red", fontSize: 14, fontWeight: "bold" }}
                  >
                    {formik.errors.email}
                  </Typography>
                ) : (
                  <></>
                )}
                <TextField
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                {formik.errors.password && formik.touched.password ? (
                  <Typography
                    variant="caption"
                    style={{ color: "red", fontSize: 14, fontWeight: "bold" }}
                  >
                    {formik.errors.password}
                  </Typography>
                ) : (
                  <></>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, background: "green" }}
                >
                  Sign In
                </Button>
              </Form>
            </Formik>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
