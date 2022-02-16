import React from 'react';
import "./Lostprofits.css";
import { AiFillBell } from 'react-icons/ai';
import { FaSearch } from 'react-icons/fa';
function Lostprofits(){
    return(
        <div className="Lp">
            <div className="Lp-head">
                <div className="Lph1">
                    <br/>
                    DARK MODE
                </div>
                <div className="Lph2">
                    <br/>
                    <span className="Lpnoti">NOTIFICATION TELEGRAM</span>
                    < AiFillBell/>
                </div>
            </div>
            <div>
                <p className="Lpheading">Lost Profits</p>
            </div>
            <div className="Lpsearch">
                        <FaSearch className="Lpc"/>
                        <div className="Lpinp">
                            <input className="Lpsearchinp" placeholder="Search"/>
                        </div>
                    </div>
            <br/>
            <br/>
            <div className="Lpcontent">
                
                <center>
                    <br/>
                    <p className="Lpcon">
                        No have Lost profits!
                    </p>
                </center>
            </div>
        </div>
                
        
    )
}
export default Lostprofits;