import React from "react";
import Topbar from "./Components/topbar/Topbar";
import Sidenavbar from "./Components/Sidenavbar/Sidenavbar";
import "./App.css";
import Controlpanel from "./Components/Control_Panel/Controlpanel";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Message from "./Components/Message/Message";
import Partners from "./Components/Partners/Partners";
import Uplines from "./Components/Uplines/Uplines";
import Lostprofits from "./Components/Lostprofits/Lostprofits";
import Login from "./Components/Login/Login";
const App = () => {
  return (
    
    <BrowserRouter>
      <div className="App">
        <Sidenavbar />

        <div className="ControlPanel">
          <Topbar />

          <div className="MainDiv">

            <Route component={Controlpanel} exact path="/" />
            <Route component={Message} path="/Message" />
            <Route component={Partners} path="/Partners" />
            <Route component={Uplines} path="/Uplines" />
            <Route component={Lostprofits} path="/Lostprofits" />

            <Route component={Login} path="/auth" />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;

// <div className="container1">
// <Switch>
//   <Route exact path="/">
//     <div className="con2">
//       {/* <Topbar /> */}
//       <div className="con3">
//         <Sidenavbar />
//         <Controlpanel />
//       </div>
//     </div>
//   </Route>
//   <Route path="/Message">
//     <div className="con2">
//       <Topbar />
//       <div className="con3">
//         <Sidenavbar />
//         <Message />
//       </div>
//     </div>
//   </Route>
//   <Route path="/Partners">
//     <div className="con2">
//       <Topbar />
//       <div className="con3">
//         <Sidenavbar />
//         <Partners />
//       </div>
//     </div>
//   </Route>
//   <Route path="/Uplines">
//     <div className="con2">
//       <Topbar />
//       <div className="con3">
//         <Sidenavbar />
//         <Uplines />
//       </div>
//     </div>
//   </Route>
//   <Route path="/Lostprofits">
//     <div className="con2">
//       <Topbar />
//       <div className="con3">
//         <Sidenavbar />
//         <Lostprofits />
//       </div>
//     </div>
//   </Route>

//   <Route path="/auth">
//     <Login />
//   </Route>
// </Switch>
// </div>
