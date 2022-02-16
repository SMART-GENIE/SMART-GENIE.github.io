import React from "react";
import "./Sidenavbar.css";
import { FaUserCircle } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { FaNetworkWired } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaSearchDollar } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { BsBoxArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
function Sidenavbar() {
  return (
    <div className="sidenav">
      <div className="sidebarcontainer">
        <div className="menu">
          <div className="logodiv">Smart Genie</div>
          <div className="hlinediv">
            <div className="hline"></div>
          </div>
          <ul className="sidebarlist">
            <li className="sidebaritems">
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "black",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <span className="icon">
                  <img
                    src="https://uploads-ssl.webflow.com/5c30d30a32c1877cbb03e545/5c56c4a24ed7964135f087b1_Account%20dark.svg"
                    width="24"
                    alt=""
                    class="sidemenu_button_icon"
                  />
                </span>
                Control Panel
              </Link>
            </li>

            <li className="sidebaritems">
              <Link
                to="/Partners"
                style={{
                  textDecoration: "none",
                  color: "black",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <span className="icon">
                  <FaNetworkWired size={24} />
                </span>
                Partners
              </Link>
            </li>
            <li className="sidebaritems">
              <Link
                to="/Uplines"
                style={{
                  textDecoration: "none",
                  color: "black",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <span className="icon">
                  <FaUsers  size={24} />
                </span>
                Uplines
              </Link>
            </li>
            <li className="sidebaritems">
              <Link
                to="/Lostprofits"
                style={{
                  textDecoration: "none",
                  color: "black",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <span className="icon">
                  <FaSearchDollar  size={24} />
                </span>
                Lost profits
              </Link>
            </li>
            <li className="sidebaritems">
              <span className="icon">
                <IoIosSend  size={24} />
              </span>
              promo
            </li>

            <li className="sidebaritems">
              <Link
                to="/auth"
                style={{
                  textDecoration: "none",
                  color: "black",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <span className="icon">
                  <BsBoxArrowRight  size={24} />
                </span>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Sidenavbar;
