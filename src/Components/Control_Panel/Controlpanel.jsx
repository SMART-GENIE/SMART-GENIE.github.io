import React, { useEffect, useState } from "react";
import "./Controlpanel.css";
import Chart from "./Chart";
import Slidecontent from "./Slidecontent";
import Levels from "./Levels";
import Chart2 from "./chart2";
import { AiFillBell, AiFillFileExclamation } from "react-icons/ai";
import ScrollToTop from "../../Tools/ScrollToTop";
import useWindowDimensions from "../../Tools/WindowDimensions";
import Utils from "../../Utils/index";
import { Hex_to_base58 } from "../../Utils/Converter";
import TronWeb from "tronweb";
const FOUNDATION_ADDRESS = "TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg";

function Controlpanel() {
  const { height, width } = useWindowDimensions();

  const [partnerCount, setpartnerCount] = useState(0);
  let Total = 0;

  let partners = [];
  let id = window.tronLink.tronWeb.defaultAddress.base58;

  const [tronWeb, settronWeb] = useState({ installed: false, loggedIn: false });

  useEffect(() => {
    CONNECT_WALLET();
  }, []);

  const FetchData = async () => {
    try {
      await FetchPartners(
        window.tronLink.tronWeb.defaultAddress.base58,
        []
      ).then((e) => {
        setpartnerCount(e.length);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const FetchPartners = async (id, partners) => {
    return await Utils.contract
      .viewUserReferral(id)
      .call()
      .then(async (items) => {
        for await (const item of items) {
          let e = await Hex_to_base58(item);
          if (e == undefined || !e) return;
          partners.push(e);
          await FetchPartners(e, partners);
        }
        return partners;
      });
  };

  const CONNECT_WALLET = async () => {
    try {
      new Promise((resolve) => {
        const tronWebState = {
          installed: !!window.tronWeb,
          loggedIn: window.tronWeb && window.tronWeb.ready,
        };

        if (tronWebState.installed) {
          settronWeb(tronWebState);

          return resolve();
        }

        let tries = 0;

        const timer = setInterval(() => {
          if (tries >= 10) {
            const TRONGRID_API = "https://api.trongrid.io";

            window.tronWeb = new TronWeb(
              TRONGRID_API,
              TRONGRID_API,
              TRONGRID_API
            );

            settronWeb({
              installed: false,
              loggedIn: false,
            });

            clearInterval(timer);
            return resolve();
          }

          tronWebState.installed = !!window.tronWeb;
          tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;

          if (!tronWebState.installed) return tries++;

          settronWeb(tronWebState);

          resolve();
        }, 100);
      });

      if (!tronWeb.loggedIn) {
        // Set default address (foundation address) used for contract calls
        // Directly overwrites the address object as TronLink disabled the
        // function call
        window.tronWeb.defaultAddress = {
          hex: window.tronWeb?.address?.toHex(FOUNDATION_ADDRESS),
          base58: FOUNDATION_ADDRESS,
        };

        window.tronWeb.on("addressChanged", (e) => {
          if (tronWeb.loggedIn) return;

          settronWeb({
            tronWeb: {
              installed: true,
              loggedIn: true,
            },
          });
        });
      }
      await Utils.setTronWeb(window.tronWeb).then(() => {
        FetchData();
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="panel">
      <div className="con">
        <h1 className="header">Office</h1>
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
                  <strong class="bold-text-2">3492,02 TRX</strong>
                </div>
              </div>
              <div class="contentcard_tabs_label">Earned TRX</div>
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
                  <strong class="bold-text-2">$ 3492.02</strong>
                </div>
              </div>
              <div class="contentcard_tabs_label">Earned Dollar</div>
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
                  <strong class="bold-text-2">{partnerCount}</strong>
                </div>
              </div>
              <div class="contentcard_tabs_label">Total Partners</div>
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
                  <strong class="bold-text-2">1</strong>
                </div>
              </div>
              <div class="contentcard_tabs_label">Current Level</div>
            </div>
          </div>
        </div>

        <div className="ChartDiv">
          <Chart />
        </div>

        {/* <Slidecontent /> */}

        {/* <div className="charts">
          <div className="graph1">
            <Chart />
          </div>
          <br />
          <div className="graph1">
            <Chart2 />
          </div>
        </div> */}
      </div>
      <br />
      <Levels />
    </div>
  );
}
export default Controlpanel;
