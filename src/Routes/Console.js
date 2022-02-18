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
import useWindowDimensions from "../Tools/WindowDimensions";
import Sidenavbarmobile from "../Components/Sidenavbar/Sidenavbarmobile";

function Console() {
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    document.title = "Console";
  }, []);

  return (
    <div className="App">
      <ScrollMemory$1 />

      {width >= 850 ? <Sidenavbar /> : <Sidenavbarmobile />}

      <div
        className={width >= 850 ? "ControlPanel" : "ControlPanel-SmallScreen "}
      >
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
