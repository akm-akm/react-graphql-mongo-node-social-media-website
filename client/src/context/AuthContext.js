import * as React from "react";

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
  const [state, dispatch] = React.useReducer(authReducer, { user: null });
  function login(userData) {
    dispatch({ type: "LOGIN", payload: userData });
  }
  function logout() {
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
