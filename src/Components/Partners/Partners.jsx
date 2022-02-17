import React from "react";
import "./Partners.css";
import { AiFillBell } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import Table from "../Table/Table";
import Tree from "../Tree/Tree";
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
        {/* <a href="#">To expand\collapse all</a> */}
        <div className="TreeDiv">
            <Tree/>
        </div>

        <Table />
      </div>
    </div>
  );
}
export default Partners;
