import React, { useState } from "react";
import "./Sidenavbar.css";
import { FaUserCircle } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { FaNetworkWired } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaSearchDollar } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { BsBoxArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
function Sidenavbarmobile() {
    const [openMenu,setopenMenu] = useState(false)

  return (
    <Offcanvas show={openMenu} onHide={() => setopenMenu(!openMenu)}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Smart Genie</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div style={{ width: "100%" }} className="sidenav">
          <div className="sidebarcontainer">
            <div className="menu">
              <ul className="sidebarlist">
                <Link
                  className="Link"
                  to="/"
                  style={{
                    width: "240px !important",
                    textDecoration: "none",
                    color: "black",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <li className="sidebaritems">
                    <span className="icon">
                      <img
                        src="https://uploads-ssl.webflow.com/5c30d30a32c1877cbb03e545/5c56c4a24ed7964135f087b1_Account%20dark.svg"
                        width="24"
                        alt=""
                        class="sidemenu_button_icon"
                      />
                    </span>
                    Control Panel
                  </li>
                </Link>

                <Link
                  className="Link"
                  to="/Partners"
                  style={{
                    width: "240px !important",
                    textDecoration: "none",
                    color: "black",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <li className="sidebaritems">
                    <span className="icon">
                      <FaNetworkWired size={24} />
                    </span>
                    Partners
                  </li>
                </Link>
                <Link
                  className="Link"
                  to="/Uplines"
                  style={{
                    width: "240px !important",
                    textDecoration: "none",
                    color: "black",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <li className="sidebaritems">
                    <span className="icon">
                      <FaUsers size={24} />
                    </span>
                    Uplines
                  </li>
                </Link>
                <Link
                  className="Link"
                  to="/Lostprofits"
                  style={{
                    width: "240px !important",
                    textDecoration: "none",
                    color: "black",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <li className="sidebaritems">
                    <span className="icon">
                      <FaSearchDollar size={24} />
                    </span>
                    Lost profits
                  </li>
                </Link>
                <li className="sidebaritems">
                  <span className="icon">
                    <IoIosSend size={24} />
                  </span>
                  promo
                </li>

                <Link
                  className="Link"
                  to="/auth"
                  style={{
                    width: "240px !important",
                    textDecoration: "none",
                    color: "black",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <li className="sidebaritems">
                    <span className="icon">
                      <BsBoxArrowRight size={24} />
                    </span>
                    Logout
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
export default Sidenavbarmobile;
