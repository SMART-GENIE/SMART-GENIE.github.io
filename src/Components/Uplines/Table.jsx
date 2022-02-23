import React, { useEffect, useState } from "react";

const Table = ({ data }) => {
  const [tableData, settableData] = useState(data);
  useEffect(() => {
    settableData(data);
  }, [data]);
  return (
    <div className="TableDivWrap">
      <div className="rec">
        <div className="search">
          <div className="inp">
            <input className="searchinp" placeholder="Search" />
            <button className="copybtn">Search</button>
          </div>
        </div>
        <div className="recdiv">
          <table>
            <tr>
              <th>Line</th>
              <th>ID</th>
              <th>Wallet</th>
              <th>Level</th>
            </tr>
            {tableData.map((item, index) => (
              <tr>
                <td className="tbval">{index + 1}</td>
                <td className="tbval">{item.id}</td>
                <td className="tbval">
                  <a href="#">{item.address}</a>
                </td>
                <td className="tbval">{item.currentLevel}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
