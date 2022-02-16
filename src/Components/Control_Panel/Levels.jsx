import React from "react";
import "./Levels.css";
function Levels() {
  return (
    <div className="level">
      <div className="row1">
        <div className="card">
          <center>
            <div className="lvl">Level 1</div>
            
            
            <div className="days">Inactive</div>
            
            <hr className="line"/>
            
            <div class="levelval">0.03 ETH</div>
            
            <button className="btn"><p>Buy</p></button>
          </center>
        </div>
        <div className="card">
          <center>
            <div className="lvl">Level 2</div>
            
            
            <div className="days">Inactive</div>
            
            <hr className="line"/>
            
            <div class="levelval">0.05 ETH</div>
            
            <button className="btn"><p>Buy</p></button>
          </center>
        </div>
        <div className="card">
          <center>
            <div className="lvl">Level 3</div>
            
            
            <div className="days">Inactive</div>
            
            <hr className="line"/>
            
            <div class="levelval">0.1 ETH</div>
            
            <button className="btn"><p>Buy</p></button>
          </center>
        </div>
        <div className="card">
          <center>
            <div className="lvl">Level 4</div>
            
            <div className="days">Inactive</div>
            
            
            <hr className="line"/>
            
            <div class="levelval">0.4 ETH</div>
            
            <button className="btn"><p>Buy</p></button>
          </center>
        </div>

        <div className="card-expired">
          <center>
            <div className="lvl">Level 5</div>
            
            
            <div className="days">Expired 660 days ago</div>
            
            <hr className="line"/>
            
            <div class="levelval">0.03 ETH</div>
            
            <button className="btn"><p>Restore</p></button>
          </center>
        </div>
      </div>
      <div className="row2">
        <div className="card-expired">
          <center>
            <div className="lvl">Level 6</div>
            
            <div className="days">Expired 660 days ago</div>
            
            
            <hr className="line"/>
            
            <div class="levelval">2.5 ETH</div>
            
            <button className="btn"><p>Restore</p></button>
          </center>
        </div>
        <div className="card-expired">
          <center>
            <div className="lvl">Level 7</div>
            
            <div className="days">Expired 660 days ago</div>
            
            
            <hr className="line"/>
            
            <div class="levelval">5 ETH</div>
            
            <button className="btn"><p>Restore</p></button>
          </center>
        </div>
        <div className="card-expired">
          <center>
            <div className="lvl">Level 8</div>
            
            <div className="days">Expired 660 days ago</div>
            
            
            <hr className="line"/>
            
            <div class="levelval">10 ETH</div>
            
            <button className="btn"><p>Restore</p></button>
          </center>
        </div>
        <div className="card-expired">
          <center>
            <div className="lvl">Level 9</div>
            
            <div className="days">Expired 660 days ago</div>
            
            
            <hr className="line"/>
            
            <div class="levelval">20 ETH</div>
            
            <button className="btn"><p>Restore</p></button>
          </center>
        </div>
        <div className="card-expired">
          <center>
            <div className="lvl">Level 10</div>
            
            <div className="days">Expired 660 days ago</div>
            
            
            <hr className="line"/>
            
            <div class="levelval">40 ETH</div>
            
            <button className="btn"><p>Restore</p></button>
          </center>
        </div>
      </div>
    </div>
  );
}
export default Levels;
