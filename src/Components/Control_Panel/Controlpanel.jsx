import React, { useEffect, useState } from "react";
import "./Controlpanel.css";
import Chart from "./Chart";
import Slidecontent from "./Slidecontent";
import Chart2 from "./chart2";
import { AiFillBell, AiFillFileExclamation } from "react-icons/ai";
import ScrollToTop from "../../Tools/ScrollToTop";
import useWindowDimensions from "../../Tools/WindowDimensions";
import Utils from "../../Utils/index";
import { Hex_to_base58 } from "../../Utils/Converter";
import TronWeb from "tronweb";
import CountUp from "react-countup";
import moment from "moment";
import "./Levels.css";


const TEMP_ADDRESS = "TJrQX9SeYDPKVy9eKEViWGqDL2wFGUBaNJ";

function Controlpanel() {
  const { height, width } = useWindowDimensions();

  const [partnersList, setpartnersList] = useState(0);
  const [coinsCount, setcoinsCount] = useState(0);
  const [coinPrice, setcoinPrice] = useState(0);
  const [chartData, setchartData] = useState({ labels: [], data: [] });
  const [currentLevel, setcurrentLevel] = useState(0);
  const [FOUNDATION_ADDRESS,setFOUNDATION_ADDRESS] = useState(TEMP_ADDRESS)

  let Total = 0;

  let partners = [];
  let id = window.tronLink.tronWeb.defaultAddress.base58;

  const [tronWeb, settronWeb] = useState({ installed: false, loggedIn: false });

  useEffect(() => {
    CONNECT_WALLET();
    FetchCoinCurrecy();
  }, []);

  const FetchCoinCurrecy = async () => {
    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=usd&include_market_cap=true`
    )
      .then((res) => res.json())
      .then((data) => {
        setcoinPrice(data.tron.usd);
      });
  };

  const ProccessRefralGraphData = async (data) => {
    let labels = [];
    let graphData = [];
    let Temp = "";

    for await (const address of data) {
      const joinedData = await Utils.contract.users(address).call();
      let joined = await Promise.resolve(joinedData[3].toNumber());
      joined = moment.unix(joined).format("DD/MM/YYYY");
      if (Temp == joined) {
        graphData[labels.length - 1] += 1;
      } else {
        labels.push(joined);
        graphData[labels.length - 1] = 1;
        Temp = joined;
      }
    }

    let resData = {
      labels: labels,
      data: graphData,
    };

    // console.log(labels, graphData);

    return resData;
  };

  const FetchData = async () => {
    try {
      return await FetchPartners(
        window.tronLink.tronWeb.defaultAddress.base58,
        []
      ).then(async (e) => {
        setpartnersList(e);
        await getcurrentLevel(window.tronLink.tronWeb.defaultAddress.base58);
        // console.log(e);
        return await FetchEarning(
          window.tronLink.tronWeb.defaultAddress.base58,
          e.length
        ).then(async () => {
          await ProccessRefralGraphData(e).then(async(res) => {
            setchartData(res);
            await FetchLevels(window.tronLink.tronWeb.defaultAddress.base58).then((data) => {
              setLevelsData(data);
            });
            // console.log(res);
          });
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  const FetchPartners = async (id, partners) => {
    // console.log(id);
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

  const getcurrentLevel = async (address) => {
    let currentLevel = 0;
    for await (const level of Array.from({ length: 10 }, (_, i) => i + 1)) {
      const checkLevel = await Utils.contract
        .viewUserLevelExpired(address, level)
        .call();
      const currentTimestamp = await Promise.resolve(checkLevel);
      if (
        currentTimestamp.toNumber() < Date.now() &&
        currentTimestamp.toNumber() != 0
      ) {
        ++currentLevel;
      }
    }
    setcurrentLevel(currentLevel);
    return currentLevel;
  };

  // const FetchEarning = async (id, partners, coins) => {
  //   return await Utils.contract
  //     .viewUserReferral(id)
  //     .call()
  //     .then(async (items) => {
  //       ++LEVEL;

  //       if (LEVEL == MAX_LEVEL) {
  //         setcoinsCount(coins);
  //         setpartnersList(partners);
  //         // console.log(coins, partners);
  //         return coins;
  //       }

  //       let tempCoin = coins;
  // for await (const item of items) {
  //   let e = await Hex_to_base58(item);
  //   if (e == undefined || !e) return;
  //         if (LEVEL == 1) {
  //           for await (const level of Array.from(
  //             { length: 10 },
  //             (_, i) => i + 1
  //           )) {
  //             if (level == 1 || level == 6) {
  //               let expiration = (
  //                 await Utils.contract.viewUserLevelExpired(e, level).call()
  //               ).toNumber();

  //               if (expiration != 0) {
  //                 tempCoin +=
  //                   (
  //                     await Utils.contract.LEVEL_PRICE(level).call()
  //                   ).toNumber() / 1000000;
  //               }
  //             }
  //           }
  //         } else if (LEVEL == 2) {
  //           for await (const level of Array.from(
  //             { length: 10 },
  //             (_, i) => i + 1
  //           )) {
  //             if (level == 2 || level == 7) {
  //               let expiration = (
  //                 await Utils.contract.viewUserLevelExpired(e, level).call()
  //               ).toNumber();

  //               if (expiration != 0) {
  //                 tempCoin +=
  //                   (
  //                     await Utils.contract.LEVEL_PRICE(level).call()
  //                   ).toNumber() / 1000000;
  //               }
  //             }
  //           }
  //         } else if (LEVEL == 3) {
  //           for await (const level of Array.from(
  //             { length: 10 },
  //             (_, i) => i + 1
  //           )) {
  //             if (level == 3 || level == 8) {
  //               let expiration = (
  //                 await Utils.contract.viewUserLevelExpired(e, level).call()
  //               ).toNumber();

  //               if (expiration != 0) {
  //                 tempCoin +=
  //                   (
  //                     await Utils.contract.LEVEL_PRICE(level).call()
  //                   ).toNumber() / 1000000;
  //               }
  //             }
  //           }
  //         } else if (LEVEL == 4) {
  // for await (const level of Array.from(
  //   { length: 10 },
  //   (_, i) => i + 1
  // )) {
  //   if (level == 4 || level == 9) {
  //     let expiration = (
  //       await Utils.contract.viewUserLevelExpired(e, level).call()
  //     ).toNumber();

  //     if (expiration != 0) {
  //       tempCoin +=
  //         (
  //           await Utils.contract.LEVEL_PRICE(level).call()
  //         ).toNumber() / 1000000;
  //     }
  //   }
  // }
  //         } else if (LEVEL == 5) {
  //           for await (const level of Array.from(
  //             { length: 10 },
  //             (_, i) => i + 1
  //           )) {
  //             if (level == 5 || level == 10) {
  // let expiration = (
  //   await Utils.contract.viewUserLevelExpired(e, level).call()
  // ).toNumber();

  // if (expiration != 0) {
  //   tempCoin +=
  //     (
  //       await Utils.contract.LEVEL_PRICE(level).call()
  //     ).toNumber() / 1000000;
  // }
  //             }
  //           }
  //         }

  //         ++countLoading;
  //         setpartnersList(
  //           Array.from({ length: countLoading }, (_, i) => i + 1)
  //         );
  //         setcoinsCount(tempCoin);

  //         partners.push(e);
  //         await FetchEarning(e, partners, coins + tempCoin);
  //       }
  //     });
  // };

  let PartnersArray = [];
  let LevelJSON = {};

  let MAX_LEVEL = 5;
  var LEVEL = 0;

  let countLoading = 0;

  const FetchEarning = async (id, count) => {
    ++LEVEL;

    if (count == PartnersArray.length) {
      // console.log(count, PartnersArray.length);
      // console.log(LevelJSON);
      // console.log(LEVEL);
      return await calculate_CoinsFromLevels(LevelJSON).then((res) => {
        setcoinsCount(res);
      });
      // return;
    } else {
      Utils.contract
        .viewUserReferral(id)
        .call()
        .then(async (items) => {
          PartnersArray = [...PartnersArray, ...items];

          if (LEVEL == 1) {
            LevelJSON[`${LEVEL}`] = await ConverttoHexArray(items);
          } else if (LEVEL == 2) {
            LevelJSON[`${LEVEL}`] = await ConverttoHexArray(items);
          } else if (LEVEL == 3) {
            LevelJSON[`${LEVEL}`] = await ConverttoHexArray(items);
          } else if (LEVEL == 4) {
            LevelJSON[`${LEVEL}`] = await ConverttoHexArray(items);
          } else if (LEVEL == 5) {
            LevelJSON[`${LEVEL}`] = await ConverttoHexArray(items);
          }

          if (items.length > 0) {
            for await (const item of items) {
              let e = await Hex_to_base58(item);
              if (e == undefined || !e) return;

              await FetchEarning(e, count);
            }
          }
        });
    }
  };

  const calculate_CoinsFromLevels = async (data) => {
    let Totalcoins = 0;

    let LEVEL1 = data["1"];
    let LEVEL2 = data["2"];
    let LEVEL3 = data["3"];
    let LEVEL4 = data["4"];
    let LEVEL5 = data["5"];

    if (LEVEL1 != undefined) {
      for await (const id of LEVEL1) {
        // LEVEL 1

        let expiration0 = (
          await Utils.contract.viewUserLevelExpired(id, 1).call()
        ).toNumber();

        if (expiration0 != 0) {
          Totalcoins +=
            (await Utils.contract.LEVEL_PRICE(1).call()).toNumber() / 1000000;
        }

        // LEVEL 6
        let expiration01 = (
          await Utils.contract.viewUserLevelExpired(id, 6).call()
        ).toNumber();

        if (expiration01 != 0) {
          Totalcoins +=
            (await Utils.contract.LEVEL_PRICE(6).call()).toNumber() / 1000000;
        }
      }
    }

    if (LEVEL2 != undefined) {
      for await (const id of LEVEL2) {
        let expiration1 = (
          await Utils.contract.viewUserLevelExpired(id, 2).call()
        ).toNumber();

        if (expiration1 != 0) {
          Totalcoins +=
            (await Utils.contract.LEVEL_PRICE(2).call()).toNumber() / 1000000;
        }

        // LEVEL 6
        let expiration2 = (
          await Utils.contract.viewUserLevelExpired(id, 7).call()
        ).toNumber();

        if (expiration2 != 0) {
          Totalcoins +=
            (await Utils.contract.LEVEL_PRICE(7).call()).toNumber() / 1000000;
        }
      }
    }

    if (LEVEL3 != undefined) {
      for await (const id of LEVEL3) {
        // LEVEL 2

        let expiration3 = (
          await Utils.contract.viewUserLevelExpired(id, 3).call()
        ).toNumber();

        if (expiration3 != 0) {
          Totalcoins +=
            (await Utils.contract.LEVEL_PRICE(3).call()).toNumber() / 1000000;
        }

        // LEVEL 7
        let expiration4 = (
          await Utils.contract.viewUserLevelExpired(id, 8).call()
        ).toNumber();

        if (expiration4 != 0) {
          Totalcoins +=
            (await Utils.contract.LEVEL_PRICE(8).call()).toNumber() / 1000000;
        }
      }
    }

    if (LEVEL4 != undefined) {
      for await (const id of LEVEL4) {
        // LEVEL 3

        let expiration5 = (
          await Utils.contract.viewUserLevelExpired(id, 4).call()
        ).toNumber();

        if (expiration5 != 0) {
          Totalcoins +=
            (await Utils.contract.LEVEL_PRICE(4).call()).toNumber() / 1000000;
        }

        // LEVEL 8

        let expiration6 = (
          await Utils.contract.viewUserLevelExpired(id, 9).call()
        ).toNumber();

        if (expiration6 != 0) {
          Totalcoins +=
            (await Utils.contract.LEVEL_PRICE(9).call()).toNumber() / 1000000;
        }
      }

      if (LEVEL5 != undefined) {
        for await (const id of LEVEL5) {
          // LEVEL 5
          let expiration9 = (
            await Utils.contract.viewUserLevelExpired(id, 5).call()
          ).toNumber();

          if (expiration9 != 0) {
            Totalcoins +=
              (await Utils.contract.LEVEL_PRICE(5).call()).toNumber() / 1000000;
          }

          // LEVEL 10
          let expiration10 = (
            await Utils.contract.viewUserLevelExpired(id, 10).call()
          ).toNumber();

          if (expiration10 != 0) {
            Totalcoins +=
              (await Utils.contract.LEVEL_PRICE(10).call()).toNumber() /
              1000000;
          }
        }
      }

      // setcoinsCount(Totalcoins);
    }
    return Totalcoins;
  };

  const ConverttoHexArray = async (items) => {
    let temp = [];
    for await (const i of items) {
      let t = await Hex_to_base58(i);
      temp.push(t);
    }
    return temp;
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
              TRONGRID_API,
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
      

      window.tronWeb.defaultAddress = {
        hex:  window.tronLink.tronWeb.defaultAddress.hex,
        base58:  window.tronLink.tronWeb.defaultAddress.base58,
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

      await Utils.setTronWeb(window.tronWeb).then(async () => {
        try {
          await FetchData();
        } catch (error) {
          console.log(error);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };




  const [LevelsData, setLevelsData] = useState({});
  

  const Buy = async (value) => {
    return await Utils.contract
      .buyLevel(1)
      .send({
        feeLimit: 100_000_000,
        callValue: 1000000*value,
        shouldPollResponse: true,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const FetchLevels = async (address) => {
    let Temp = {};

    for await (const level of Array.from({ length: 10 }, (_, i) => i + 1)) {
      Temp[`${level}`] = null;

      const checkLevel = await Utils.contract
        .viewUserLevelExpired(address, level)
        .call();
      const currentTimestamp = await Promise.resolve(checkLevel);
      if (
        currentTimestamp.toNumber() > Date.now() &&
        currentTimestamp.toNumber() != 0
      ) {
        Temp[`${level}`] = {
          expired: true,
          exipredAgo:
            (new Date(currentTimestamp.toNumber()).getTime() -
              new Date(Date.now()).getTime()) /
            (1000 * 60 * 60 * 24),
          active: false,
          disabled:level == 1 ? false:true
        };
      } else if (
        currentTimestamp.toNumber() < Date.now() &&
        currentTimestamp.toNumber() != 0
      ) {
        Temp[`${level}`] = {
          expired: false,
          exipredAgo:
            (new Date(currentTimestamp.toNumber()).getTime() -
              new Date(Date.now()).getTime()) /
            (1000 * 60 * 60 * 24),
          active: true,
          disabled:false

        };
      } else {
        Temp[`${level}`] = {
          expired: false,
          exipredAgo:
            (new Date(currentTimestamp.toNumber()).getTime() -
              new Date(Date.now()).getTime()) /
            (1000 * 60 * 60 * 24),
          active: false,
          disabled:true
        };
      }
    }

    let TempActive = 0;
    for await (const i of Array.from({ length: 10 }, (_, i) => i + 1)) {
      if (Temp[`${i}`].active == true) {
        TempActive = i+1;
        if(Temp[`${TempActive}`] != undefined){
          Temp[`${TempActive}`]["disabled"] = false;

        }

      }

    }
    Temp[`${1}`]["disabled"] = false;

console.log(Temp);

    return Temp;
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
                  <strong class="bold-text-2">
                    <CountUp
                      duration={1}
                      className="bold-text-2"
                      end={coinsCount}
                    />{" "}
                    TRX
                  </strong>
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
                  <strong class="bold-text-2">
                    {"$ "}
                    <CountUp
                      decimals={6}
                      duration={1}
                      className="bold-text-2"
                      end={coinPrice * coinsCount}
                    />
                  </strong>
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
                  <strong class="bold-text-2">
                    {" "}
                    <CountUp
                      duration={1}
                      className="bold-text-2"
                      end={partnersList?.length}
                    />
                  </strong>
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
                  <strong class="bold-text-2">{currentLevel}</strong>
                </div>
              </div>
              <div class="contentcard_tabs_label">Current Level</div>
            </div>
          </div>
        </div>

        <div className="ChartDiv">
          <Chart data={chartData} />
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

      <div className="level">
      <div className="row1">
        <div className={LevelsData["1"]?.expired ? "card-expired":"card"}>
          <center>
            <div className="lvl">Level 1</div>

            <div className="days">{LevelsData["1"]?.active ? "Active":"Expired"+`-${LevelsData["2"]?.expiredAgo} days ago` }</div>

            <hr className="line" />

            <div class="levelval">300 TRX</div>

            <button
              style={{ opacity: LevelsData["1"]?.disabled ? 0.5 : 1 }}
              onClick={() => Buy(300)}
              className="btn"
            >
              <p>{LevelsData["1"]?.active ? "Extend":LevelsData["1"]?.expired ? "Restore":"Buy"}</p>
            </button>
          </center>
        </div>
        <div className={LevelsData["2"]?.expired ? "card-expired":"card"}>
          <center>
            <div className="lvl">Level 2</div>

            <div className="days">{LevelsData["2"]?.active ? "Active": LevelsData["2"]?.expired == false ? "Inactive":"Expired"+`-${LevelsData["2"]?.expiredAgo} days ago` }</div>

            <hr className="line" />

            <div class="levelval">600 TRX</div>

            <button
              style={{ opacity: LevelsData["2"]?.disabled ? 0.5 : 1 }}
              onClick={() => Buy(600)}
              className="btn"
            >
              <p>{LevelsData["2"]?.active ? "Extend":LevelsData["2"]?.expired ? "Restore":"Buy"}</p>
            </button>
          </center>
        </div>
        <div className={LevelsData["3"]?.expired ? "card-expired":"card"}>
          <center>
            <div className="lvl">Level 3</div>

            <div className="days">{LevelsData["3"]?.active ? "Active": LevelsData["3"]?.expired == false ? "Inactive":"Expired"+`-${LevelsData["3"]?.expiredAgo} days ago` }</div>

            <hr className="line" />

            <div class="levelval">1250 TRX</div>

            <button
              style={{ opacity: LevelsData["3"]?.disabled ? 0.5 : 1 }}
              onClick={() => Buy(1250)}
              className="btn"
            >
              <p>{LevelsData["3"]?.active ? "Extend":LevelsData["3"]?.expired ? "Restore":"Buy"}</p>
            </button>
          </center>
        </div>
        <div className={LevelsData["4"]?.expired ? "card-expired":"card"}>
          <center>
            <div className="lvl">Level 4</div>

            <div className="days">{LevelsData["4"]?.active ? "Active": LevelsData["4"]?.expired == false ? "Inactive":"Expired"+`-${LevelsData["4"]?.expiredAgo} days ago` }</div>

            <hr className="line" />

            <div class="levelval">2500 TRX</div>

            <button
              style={{ opacity: LevelsData["4"]?.disabled ? 0.5 : 1 }}
              onClick={() => Buy(2500)}
              className="btn"
            >
              <p>{LevelsData["4"]?.active ? "Extend":LevelsData["4"]?.expired ? "Restore":"Buy"}</p>
            </button>
          </center>
        </div>

        <div className={LevelsData["5"]?.expired ? "card-expired":"card"}>
          <center>
            <div className="lvl">Level 5</div>

            <div className="days">{LevelsData["5"]?.active ? "Active": LevelsData["5"]?.expired == false ? "Inactive":"Expired"+`-${LevelsData["5"]?.expiredAgo} days ago` }</div>

            <hr className="line" />

            <div class="levelval">5000 TRX</div>

            <button
              style={{ opacity: LevelsData["5"]?.disabled ? 0.5 : 1 }}
              onClick={() => Buy(5000)}
              className="btn"
            >
              <p>{LevelsData["5"]?.active ? "Extend":LevelsData["5"]?.expired ? "Restore":"Buy"}</p>
            </button>
          </center>
        </div>

        <div className={LevelsData["6"]?.expired ? "card-expired":"card"}>
          <center>
            <div className="lvl">Level 6</div>

            <div className="days">{LevelsData["6"]?.active ? "Active": LevelsData["6"]?.expired == false ? "Inactive":"Expired"+`-${LevelsData["6"]?.expiredAgo} days ago` }</div>

            <hr className="line" />

            <div class="levelval">10000 TRX</div>

            <button
              style={{ opacity: LevelsData["6"]?.disabled ? 0.5 : 1 }}
              onClick={() => Buy(10000)}
              className="btn"
            >
              <p>{LevelsData["6"]?.active ? "Extend":LevelsData["6"]?.expired ? "Restore":"Buy"}</p>
            </button>
          </center>
        </div>
        <div className={LevelsData["7"]?.expired ? "card-expired":"card"}>
          <center>
            <div className="lvl">Level 7</div>

            <div className="days">{LevelsData["7"]?.active ? "Active": LevelsData["7"]?.expired == false ? "Inactive":"Expired"+`-${LevelsData["7"]?.expiredAgo} days ago` }</div>

            <hr className="line" />

            <div class="levelval">25000 TRX</div>

            <button
              style={{ opacity: LevelsData["7"]?.disabled ? 0.5 : 1 }}
              onClick={() => Buy(25000)}
              className="btn"
            >
              <p>{LevelsData["7"]?.active ? "Extend":LevelsData["7"]?.expired ? "Restore":"Buy"}</p>
            </button>
          </center>
        </div>
        <div className={LevelsData["8"]?.expired ? "card-expired":"card"}>
          <center>
            <div className="lvl">Level 8</div>

            <div className="days">{LevelsData["8"]?.active ? "Active": LevelsData["8"]?.expired == false ? "Inactive":"Expired"+`-${LevelsData["8"]?.expiredAgo} days ago` }</div>

            <hr className="line" />

            <div class="levelval">50000 TRX</div>

            <button
              style={{ opacity: LevelsData["8"]?.disabled ? 0.5 : 1 }}
              onClick={() => Buy(50000)}
              className="btn"
            >
              <p>{LevelsData["8"]?.active ? "Extend":LevelsData["8"]?.expired ? "Restore":"Buy"}</p>
            </button>
          </center>
        </div>
        <div className={LevelsData["9"]?.expired ? "card-expired":"card"}>
          <center>
            <div className="lvl">Level 9</div>

            <div className="days">{LevelsData["9"]?.active ? "Active": LevelsData["9"]?.expired == false ? "Inactive":"Expired"+`-${LevelsData["9"]?.expiredAgo} days ago` }</div>

            <hr className="line" />

            <div class="levelval">100000 TRX</div>

            <button
              style={{ opacity: LevelsData["9"]?.disabled ? 0.5 : 1 }}
              onClick={() => Buy(100000)}
              className="btn"
            >
              <p>{LevelsData["9"]?.active ? "Extend":LevelsData["9"]?.expired ? "Restore":"Buy"}</p>
            </button>
          </center>
        </div>
        <div className={LevelsData["10"]?.expired ? "card-expired":"card"}>
          <center>
            <div className="lvl">Level 10</div>

            <div className="days">{LevelsData["10"]?.active ? "Active": LevelsData["10"]?.expired == false ? "Inactive":"Expired"+`-${LevelsData["10"]?.expiredAgo} days ago` }</div>

            <hr className="line" />

            <div class="levelval">200000 TRX</div>

            <button
              style={{ opacity: LevelsData["10"]?.disabled ? 0.5 : 1 }}
              onClick={() => Buy(200000)}
              className="btn"
            >
              <p>{LevelsData["10"]?.active ? "Extend":LevelsData["10"]?.expired ? "Restore":"Buy"}</p>
            </button>
          </center>
        </div>
      </div>
    </div>      

    </div>
  );
}
export default Controlpanel;
