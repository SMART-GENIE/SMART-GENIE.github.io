import React, { useEffect, useState } from "react";
import Topbar from "../Components/topbar/Topbar";
import Sidenavbar from "../Components/Sidenavbar/Sidenavbar";
import "../App.css";
import Controlpanel from "../Components/Control_Panel/Controlpanel";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Message from "../Components/Message/Message";
import Partners from "../Components/Partners/Partners";
import Uplines from "../Components/Uplines/Uplines";
import Lostprofits from "../Components/Lostprofits/Lostprofits";
import Login from "../Components/Login/Login";
import ScrollMemory$1 from "react-router-scroll-memory";

function Console() {
  useEffect(() => {
    document.title = "Console";
  }, []);

  return (
    <div className="App">
      <ScrollMemory$1 />
      <Sidenavbar />

      <div className="ControlPanel">
        <Topbar />

        <div className="MainDiv">
          <Route component={Controlpanel} exact path="/" />
          <Route component={Message} path="/Message" />
          <Route component={Partners} path="/Partners" />
          <Route component={Uplines} path="/Uplines" />
          <Route component={Lostprofits} path="/Lostprofits" />
        </div>
      </div>
    </div>
  );
}

export default Console;
