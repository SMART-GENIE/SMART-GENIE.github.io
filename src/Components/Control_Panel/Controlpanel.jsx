import React from 'react'
import "./Controlpanel.css"
import Chart from './Chart';
import Slidecontent from './Slidecontent';
import Levels from './Levels';
import Chart2 from './chart2';
import { AiFillBell } from 'react-icons/ai'

function Controlpanel(){
    return(
        <div className="controlpanel">
            <div className="top">
                <div className="top1">
                    <br/>
                    DARK MODE
                </div>
                <div className="top2">
                    <br/>
                    <span className="noti">NOTIFICATION TELEGRAM</span>
                    < AiFillBell/>
                </div>
            </div>
            <div className="con">
                <h1 className="office">Office</h1>
                <div className="control">
                <div className="details">
                <div className="details-1">
                    <div className="item_detail col1">
                        <div className="start">
                            <div className="left">Earned<br/> Ethereum</div>
                            <div className="right">hi</div>
                        </div>
                        <span className="val">0.56 ETH</span>
                    </div>
                    <div className="item_detail col2">
                        <div className="start">
                            <div className="left">Earned<br/> dollars</div>
                            <div className="right">hi</div>
                        </div>
                        <span className="val">2006.73 USD</span>
                    </div>
                </div>
                <div className="details-1">
                    <div className="item_detail col3">
                        <div className="start">
                            <div className="left">Partners<br/> Toatl/Last 24h</div>
                            <div className="right">hi</div>
                        </div>
                        <span className="val">112/0</span>
                    </div>
                    <div className="item_detail col4">
                        <div className="start">
                            <div className="left">The current<br/> level</div>
                            <div className="right">hi</div>
                        </div>
                        <span className="val">0 Level</span>
                    </div>
                </div>

                    <Slidecontent/>
                </div>

                <div className="charts">
                    <div className="graph1">
                        <Chart/>
                    </div>
                    <br/>
                    <div className="graph1">
                        <Chart2/>    
                    </div>
                </div>
                
            </div>
            </div>
            <br/><br/>
            
            <Levels/>
        </div>
    )
}
export default Controlpanel;