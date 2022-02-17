import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import "../App.css";
import Login from "../Components/Login/Login";

function Auth() {
  return (
    <div>
      <Route component={Login} path="/auth" />
    </div>
  );
}

export default Auth;
