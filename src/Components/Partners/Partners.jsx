import React from 'react'
import "./Partners.css"
import { AiFillBell } from 'react-icons/ai'
import { FaSearch } from 'react-icons/fa'
function Partners(){
    return(
        <div className="Part">
            <div className="Part-head">
                <div className="ph1">
                    <br/>
                    DARK MODE
                </div>
                <div className="ph2">
                    <br/>
                    <span className="pnoti">NOTIFICATION TELEGRAM</span>
                    < AiFillBell/>
                </div>
            </div>
            <div>
                <p className="pheading">Partners</p>
            </div>
            <div className="linkbox1">
                <p className="linkname">Your affiliate link </p>
                <div className="linkbox">
                <div className="linkleft">
                    <p className="links">
                    https://lk.million.money/a/6262/
                    </p>
                    <button className="copybtn">Copy</button>
                </div>
                <div className="linkright">
                    <p className="links">
                    https://link.trustwallet.com/open_url?coin_id=60&url=https://lk.million.money/a/6262/
                    </p>
                    <button className="copybtn2">Copy</button></div>
                </div>
                <br/>
                <br/></div>
                <div className="about">
                    <p className="linkname1">Data about partner</p>
                    <input className="link1"/><br/>
                    <button className="copybtn">Show</button>
                </div>
                <div className="structure">
                <p className="linkname1">Your structure</p>
                    <a href="#">To expand\collapse all</a>
                    <div className="search">
                        <FaSearch className="ic"/>
                        <div className="inp">
                            <input className="searchinp" placeholder="Search"/>
                        </div>
                    </div>
                        <div className="rec">
                    <p className="linkname1">Received</p>
                            <div className="recdiv">
                                <table>
                                    <tr>
                                        <th>Date</th>
                                        <th>From whom</th>
                                        <th>ID</th>
                                        <th>The amount of ETH</th>T
                                        <th>USD</th>
                                    </tr>
                                    <tr>
                                        <td className="tbval">27.08 17:21</td>
                                        <td className="tbval"><a href="#">0x9f4f1d2fa3b11e64f21dc121603f31be022e0ae9</a></td>
                                        <td className="tbval">1368</td>
                                        <td className="tbval">0.05</td>
                                        <td className="tbval">193.42</td>
                                    </tr>
                                    <tr>
                                        <td className="tbval">27.08 17:08</td>
                                        <td className="tbval"><a href="#">0x13c549a61f4aa9065e52858baa2c223fb9d0126e</a></td>
                                        <td className="tbval">1367</td>
                                        <td className="tbval">0.03</td>
                                        <td className="tbval">116.05</td>
                                    </tr>
                                    <tr>
                                        <td className="tbval">27.08 19:40</td>
                                        <td className="tbval"><a href="#">0xb10bb6ee3247ba91067ae0bb1308e82f687c67e3</a></td>
                                        <td className="tbval">1401</td>
                                        <td className="tbval">0.03</td>
                                        <td className="tbval">116.05</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
        
    )
}
export default Partners;