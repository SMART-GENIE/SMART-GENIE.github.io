import React from "react";
import "./Lostprofits.css";
import { AiFillBell } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import Table from "./Table";
import Tree from "../Tree/Tree";
function Lostprofits() {
  return (
    <div className="Lostprofits">
      <div>
        <p className="header">Lostprofits</p>
      </div>

      <Table />


     
    </div>
  );
}
export default Lostprofits;
