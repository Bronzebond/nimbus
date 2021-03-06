import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PublicNavbar from "./components/PublicNavbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import AlertMsg from "./components/AlertMsg";
import QuestionPage from "./pages/QuestionPage";
import QuestionListPage from "./pages/QuestionListPage";

function App() {
  return (
    <Router>
      <PublicNavbar />
      <AlertMsg />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/question" component={QuestionPage} />
        <Route exact path="/question-list" component={QuestionListPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;
