import React from "react";
import "./Uplines.css";
import { AiFillBell } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import Table from "./Table";
import Tree from "../Tree/Tree";
function Uplines() {
  return (
    <div className="Uplines">
      <div>
        <p className="header">Uplines</p>
      </div>

      <div className="Table">
      <Table />

      </div>

     
    </div>
  );
}
export default Uplines;
