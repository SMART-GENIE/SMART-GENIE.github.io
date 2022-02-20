import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import "../App.css";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";

function Auth() {
  return (
    <div>
      <Route component={Login} exact path="/" />
      <Route component={Register} path="/register" />

    </div>
  );
}

export default Auth;
