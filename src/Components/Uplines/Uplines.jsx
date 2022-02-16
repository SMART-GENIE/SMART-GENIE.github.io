import React from 'react'
import "./Uplines.css"
import { AiFillBell } from 'react-icons/ai'
function Uplines(){
    return(
        <div className="upline">
            <div className="upline-head">
                <div className="uh1">
                    <br/>
                    DARK MODE
                </div>
                <div className="uh2">
                    <br/>
                    <span className="unoti">NOTIFICATION TELEGRAM</span>
                    < AiFillBell/>
                </div>
            </div>
            <div>
                <p className="uheading">Uplines</p>
            </div>
            <div className="uplinecontent">
                <center>
                    <br/>
                    <p className="ucon">
                        No have Upline
                    </p>
                </center>
            </div>
        </div>
                
        
    )
}
export default Uplines;