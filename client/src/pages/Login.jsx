import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
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
import { Link } from "react-router-dom";
const theme = createTheme();

export default function Login() {
  const context = React.useContext(AuthContext);
  const history = useHistory();
  const [value, setvalue] = React.useState({
    email: "",
    password: "",
  });
  const [error, seterror] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [loginuser, { loading }] = useMutation(LOGIN, {
    update(_, { data: { login: useData } }) {
      console.log(useData);
      context.login(useData);
      history.push("/");
    },
    onError(err) {
      console.log(err);
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
    console.log(value);
    loginuser();
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
            Log In
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
                  required
                  value={value.email}
                  fullWidth
                  id="email"
                  onChange={handleChange}
                  label="Email Address"
                  name="email"
                  autoFocus
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
              Log In
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/register" variant="body2">
                  Don't have an account? Register
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
      </Stack>
    </ThemeProvider>
  );
}

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      username
      name
      email
      dOB
      createdAt
      token
      friendList {
        username
      }
    }
  }
`;
