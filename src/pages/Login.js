import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../components/Layout";
import Toast from "../components/Toast";
import environment from "../environments";
import useToast from "../hooks/useToast";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [loginForm, setloginForm] = useState({
    email: { value: "", error: "" },
    password: { value: "", error: "" },
  });
  const [toastSeverity, setToastSeverity] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const { isShowing, toggle } = useToast();

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(environment.baseUrl + "/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: loginForm.email.value,
          password: loginForm.password.value,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.status === 401) {
        setToastSeverity("error");
        setToastMessage(data.message);
        toggle();
      } else {
        sessionStorage.setItem("token", data.data.token);
        history.push("/movies");
      }
    } catch (error) {
      setToastSeverity("error");
      setToastMessage(error.message);
      toggle();
    }
  };

  const handleField = (event) => {
    const { name, value } = event.target;
    let error = "";

    if (name === "email") {
      if (value === "") error = "Email is required";
      else if (!/^\S+@\S+$/.test(value)) error = "Email is invaid";
    } else if (name === "password") {
      if (value === "") error = "Password is required";
    }

    setloginForm({
      ...loginForm,
      [name]: { value, error },
    });
  };

  return (
    <Layout>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleLoginFormSubmit}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={Boolean(loginForm.email.error)}
              helperText={loginForm.email.error}
              onChange={handleField}
              onBlur={handleField}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={Boolean(loginForm.password.error)}
              helperText={loginForm.password.error}
              onChange={handleField}
              onBlur={handleField}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={Boolean(
                !loginForm.email.value ||
                  !loginForm.password.value ||
                  loginForm.email.error ||
                  loginForm.password.error
              )}
            >
              Log In
            </Button>
          </form>
        </div>
      </Container>

      {/* Toast */}
      {isShowing && (
        <Toast
          severity={toastSeverity}
          message={toastMessage}
          isShowing={isShowing}
          toggle={toggle}
        />
      )}
    </Layout>
  );
}
