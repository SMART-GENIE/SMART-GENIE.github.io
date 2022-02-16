import React from "react";
import "./Partners.css";
import { AiFillBell } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import Table from "../Table/Table";
function Partners() {
  return (
    <div className="panel">
      <div>
        <p className="header">Partners</p>
      </div>

      <div className="linkbox">
        <div className="linkInside">
          <div className="content">
            <p className="linkname1">Your Affilate Link</p>
            <br />

            <input
              className="link1"
              readOnly={true}
              value={"https://lk.million.money/a/95623/"}
            />
            <br />
            <button className="copybtn">Copy Link</button>
          </div>
        </div>

        <div style={{ marginLeft: "30px" }} className="linkInside">
          <div className="content">
            <p className="linkname1">Data about partner</p>
            <br />
            <div className="Inline">
              <input className="link2" />
              <span>
                <button className="copybtn">Search</button>
              </span>
            </div>
            <br />
            <div className="PartnerList">
              {/* <span>Id:45845</span><span style={{marginLeft:"25px"}} >Level:1</span><span style={{marginLeft:"25px"}} >Address:0xfewfwfwfwfefewfwe<span><i class="fa fa-external-link-alt"></i></span></span> */}
              <div class="partner__info">
                ID: <b>99132</b> &nbsp;&nbsp;&nbsp; Level: <b>1</b>{" "}
                &nbsp;&nbsp;&nbsp; Address:
                0xa7d7043df066a9fd0fc277a1d48bc07d43714557{" "}
                <a
                  href="https://etherscan.io/address/0xa7d7043df066a9fd0fc277a1d48bc07d43714557 "
                  target="_blank"
                >
                  <i class="fa fa-external-link-alt"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="structure">
        <p className="linkname1">Your structure</p>
        <a href="#">To expand\collapse all</a>
        <div className="TreeDiv"></div>

<Table/>
        {/* <div className="TableDivWrap">
          <div className="rec">
            <p className="linkname1">Received</p>
            <div className="search">
              <div className="inp">
                <input className="searchinp" placeholder="Search" />
                <button className="copybtn">Search</button>
              </div>
            </div>
            <div className="recdiv">
              <table>
                <tr>
                  <th>Date</th>
                  <th>From whom</th>
                  <th>ID</th>
                  <th>The amount of ETH</th>T<th>USD</th>
                </tr>
                <tr>
                  <td className="tbval">27.08 17:21</td>
                  <td className="tbval">
                    <a href="#">0x9f4f1d2fa3b11e64f21dc121603f31be022e0ae9</a>
                  </td>
                  <td className="tbval">1368</td>
                  <td className="tbval">0.05</td>
                  <td className="tbval">193.42</td>
                </tr>
                <tr>
                  <td className="tbval">27.08 17:08</td>
                  <td className="tbval">
                    <a href="#">0x13c549a61f4aa9065e52858baa2c223fb9d0126e</a>
                  </td>
                  <td className="tbval">1367</td>
                  <td className="tbval">0.03</td>
                  <td className="tbval">116.05</td>
                </tr>
                <tr>
                  <td className="tbval">27.08 19:40</td>
                  <td className="tbval">
                    <a href="#">0xb10bb6ee3247ba91067ae0bb1308e82f687c67e3</a>
                  </td>
                  <td className="tbval">1401</td>
                  <td className="tbval">0.03</td>
                  <td className="tbval">116.05</td>
                </tr>
              </table>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
export default Partners;
