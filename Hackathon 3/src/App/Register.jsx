import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Form, Formik, useFormik } from "formik";
import { toast } from "react-toastify";

import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../Services/http.service";
import { useMediaQuery } from "@mui/material";

import TtyIcon from "@mui/icons-material/Tty";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (values) => {
    const newUser = {
      id: values.email,
      password: values.password,
    };

    addUser(newUser)
      .then(() => {
        toast.success("Successfully registered. You can now log in.", {
          theme: "colored",
        });
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error registering user:", error);
        toast.error("Error during registration", {
          theme: "colored",
        });
      });
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Minimum 8 characters")
      .max(12, "Maximum 12 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      handleRegister(values);
    },
    validationSchema: SignupSchema,
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
            Register for Telecom Service
          </Typography>
          <Typography component="h1" variant="h5">
            Sign up
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
                {formik.touched.email && formik.errors.email ? (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ fontSize: 14, fontWeight: "bold" }}
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
                  autoComplete="new-password"
                />
                {formik.touched.password && formik.errors.password ? (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ fontSize: 14, fontWeight: "bold" }}
                  >
                    {formik.errors.password}
                  </Typography>
                ) : (
                  <></>
                )}
                <TextField
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  margin="normal"
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ fontSize: 14, fontWeight: "bold" }}
                  >
                    {formik.errors.confirmPassword}
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
                  Register
                </Button>
              </Form>
            </Formik>
            <Typography
              variant="body2"
              sx={{ textAlign: "center", marginTop: 2 }}
            >
              Already have an account?{" "}
              <Link to="/login" style={{ color: "green", fontWeight: "bold" }}>
                Log in here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
