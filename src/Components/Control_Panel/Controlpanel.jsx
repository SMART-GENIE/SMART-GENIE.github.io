import React from "react";
import "./Controlpanel.css";
import Chart from "./Chart";
import Slidecontent from "./Slidecontent";
import Levels from "./Levels";
import Chart2 from "./chart2";
import { AiFillBell } from "react-icons/ai";

function Controlpanel() {
  return (
    <div className="controlpanel">
      <div className="con">
        <h1 className="office">Office</h1>
        <div className="control">
            
          <div className="CoverDiv">
            <div class="contentcard_tabs_active">
              <div class="contentcard_tabs_info">
                <img
                  src="https://uploads-ssl.webflow.com/5c30d30a32c1877cbb03e545/5c40eb3142d68e3c2b7f8850_ring%20green.png"
                  width="43"
                  alt=""
                  class="contentcard_tabs_active_circle--green"
                />
                <div class="contentcard_tabs_active_text_price">
                  <strong class="bold-text-2">€ 3492,02</strong>
                </div>
              </div>
              <div class="contentcard_tabs_label">Coin Earned</div>
            </div>

            <div class="contentcard_tabs_active">
              <div class="contentcard_tabs_info">
                <img
                  src="https://uploads-ssl.webflow.com/5c30d30a32c1877cbb03e545/5c43381379dc692ebfb3a76c_ring%20purple.png"
                  width="43"
                  alt=""
                  class="contentcard_tabs_active_circle--green"
                />
                <div class="contentcard_tabs_active_text_price">
                  <strong class="bold-text-2">€ 3492,02</strong>
                </div>
              </div>
              <div class="contentcard_tabs_label">Coin Earned</div>
            </div>

            <div class="contentcard_tabs_active">
              <div class="contentcard_tabs_info">
                <img
                  src="https://uploads-ssl.webflow.com/5c30d30a32c1877cbb03e545/5c433812ff0f50fa752c8bb5_ring%20blue.png"
                  width="43"
                  alt=""
                  class="contentcard_tabs_active_circle--green"
                />
                <div class="contentcard_tabs_active_text_price">
                  <strong class="bold-text-2">€ 3492,02</strong>
                </div>
              </div>
              <div class="contentcard_tabs_label">Coin Earned</div>
            </div>

            <div class="contentcard_tabs_active">
              <div class="contentcard_tabs_info">
                <img
                  src="https://uploads-ssl.webflow.com/5c30d30a32c1877cbb03e545/5c40eb3142d68e3c2b7f8850_ring%20green.png"
                  width="43"
                  id="LevelImage"
                  alt=""
                  class="contentcard_tabs_active_circle--green"
                />
                <div class="contentcard_tabs_active_text_price">
                  <strong class="bold-text-2">€ 3492,02</strong>
                </div>
              </div>
              <div class="contentcard_tabs_label">Coin Earned</div>
            </div>

          </div>
        </div>
        {/* <Slidecontent /> */}

        <div className="charts">
          <div className="graph1">
            <Chart />
          </div>
          <br />
          <div className="graph1">
            <Chart2 />
          </div>
        </div>
      </div>
      <br />
      <br />

      <Levels />
    </div>
  );
}
export default Controlpanel;
