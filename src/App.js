import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from "./Routes/Auth";
import Console from "./Routes/Console";
const App = () => {
  return (
    <BrowserRouter>
     <BrowserRouter>
      {/* {access ? <Redirect to={"/"} /> : <Redirect to={"/login"} />} */}
      <Route to={"/"} render={() => (true ? <Console /> : <Auth />)} />
    </BrowserRouter>
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
