import * as React from "react";
import jwtDecode from "jwt-decode";
import { useHistory } from "react-router-dom";
const initialState = {
  user: null,
};
if (localStorage.getItem("JWTTOKEN")) {
  const decoded = jwtDecode(localStorage.getItem("JWTTOKEN"));
  if (decoded.exp * 1000 < Date.now()) {
    localStorage.removeItem("JWTTOKEN");
  } else {
    initialState.user = decoded;
  }
}
const AuthContext = React.createContext({
  authenticated: false,
  user: null,
  logout: () => {},
  login: (data) => {},
});

function authReducer(state, action) {
  switch (action.type) {
    default:
      return state;
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        authenticated: false,
      };
  }
}

function AuthProvider(props) {
const history = useHistory();

  const [state, dispatch] = React.useReducer(authReducer, initialState);
  function login(userData) {
    localStorage.setItem("JWTTOKEN", userData.token);
    dispatch({ type: "LOGIN", payload: userData });
  }
  function logout() {
    localStorage.removeItem("JWTTOKEN");
    dispatch({ type: "LOGOUT" });
  }
  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}
export { AuthContext, AuthProvider };
