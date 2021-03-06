import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./utils/protectedRoute";
import AuthRoute from "./utils/authRoute";
import Profile from "./pages/profile";
import Usersearch from "./pages/Usersearch.jsx";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/search" component={Usersearch} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
