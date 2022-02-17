import React from "react"

const Table = ()=>{
    return(
        <div className="TableDivWrap">
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
                  <th>The amount of ETH</th>
                  <th>USD</th>
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
        </div>
    )
}

export default Table