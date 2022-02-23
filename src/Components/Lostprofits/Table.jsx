import React, { useEffect, useState } from "react";

const Table = ({ data, coinprice }) => {
  const [tableData, settableData] = useState(data);
  const [coinPrice, setcoinPrice] = useState(coinprice);

  useEffect(() => {
    settableData(data);
    setcoinPrice(coinprice);
  }, [data, coinPrice]);

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
              <th>Date</th>
              <th>From whom</th>
              <th>ID</th>
              <th>The amount of ETH</th>
              <th>USD</th>
            </tr>

            {tableData.map((item, index) => (
              <tr>
                <td className="tbval">{index + 1}</td>
                <td className="tbval">
                  <a href="#">{item.address}</a>
                </td>
                <td className="tbval">{item.id}</td>
                <td className="tbval">{item.coins}</td>
                <td className="tbval">{item.coins * coinPrice.toFixed(4)}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
