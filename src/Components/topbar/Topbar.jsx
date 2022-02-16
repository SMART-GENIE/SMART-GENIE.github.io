import React from "react";
import "./Topbar.css";
import logo from "./logo.png";
import { RiProfileLine } from "react-icons/ri";
import { BsFillSuitDiamondFill } from "react-icons/bs";
import britain from "./britain.png";
function Topbar() {
  var val = 1234;
  return (
    <div className="topbar">
      <div className="topbarcontainer">
        {/* <div className="leftcontent">
                        <img src={logo} alt="logo" className="logo"></img>
                </div> */}
        <div className="div1">
          <div className="contentDiv">
            <span className="address">Id : 58889</span>
          </div>
        </div>

        <div className="div2">
          <div className="contentDiv">
            <span className="address">Address :</span>
            <span style={{ float: "right", position: "absolute", right: 10 }}>
              <div
                style={{ overflow: "hidden", width: 30, height: 30 }}
                className="LanguageDiv"
              >
                <img
                  alt=""
                  width="25"
                  height="25"
                  src="https://avatars.githubusercontent.com/u/64833303?v=4"
                />
              </div>
            </span>
          </div>
        </div>

        <div className="div3">
          <div className="LanguageDiv">
            <img
              className="image"
              style={{ width: "100%", height: "100%" }}
              src={britain}
              alt="aa"
              width="40px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Topbar;
