import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import RegIcon from "@mui/icons-material/HowToReg";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Stack } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { DatePicker } from "@mui/lab";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const theme = createTheme();

export default function Register() {
  const history = useHistory();
  const [value, setvalue] = React.useState({
    username: "",
    email: "",
    password: "",
    name: "",
    dOB: "",
  });
  const [error, seterror] = React.useState(undefined);
  const [success, setsuccess] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const context = React.useContext(AuthContext);

  const [addUser, { loading }] = useMutation(REGISTER, {
    update(_, { data: { register: useData } }) {
      context.login(useData);
      console.log(useData);
      setsuccess(true);
      history.push("/");
    },
    onError(err) {
      seterror(err.graphQLErrors[0].message);
      setOpen(true);
    },
    variables: value,
  });
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    addUser();
  };

  const handleChange = (event) => {
    setvalue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  value={value.name}
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  value={value.username}
                  fullWidth
                  onChange={handleChange}
                  id="username"
                  label="Username"
                />
              </Grid>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DatePicker
                  label="Basic example"
                  value={value.dOB}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="age"
                  value={value.age}
                  required
                  type="number"
                  fullWidth
                  id="age"
                  onChange={handleChange}
                  label="Age"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  value={value.email}
                  fullWidth
                  id="email"
                  onChange={handleChange}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  value={value.password}
                  onChange={handleChange}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              disabled={!loading && open}
              endIcon={<RegIcon />}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>{" "}
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
        <Snackbar open={success} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Registered Successfully
          </Alert>
        </Snackbar>
      </Stack>
    </ThemeProvider>
  );
}

const REGISTER = gql`
  mutation Register(
    $name: String!
    $age: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    register(
      name: $name
      age: $age
      username: $username
      email: $email
      password: $password
    ) {
      name
      id
      username
      email
      age
      password
      createdAt
      token
    }
  }
`;
