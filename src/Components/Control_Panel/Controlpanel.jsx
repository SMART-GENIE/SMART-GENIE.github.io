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
import CountUp from "react-countup";

const FOUNDATION_ADDRESS = "TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg";

function Controlpanel() {
  const { height, width } = useWindowDimensions();

  const [partnersList, setpartnersList] = useState(0);
  const [coinsCount, setcoinsCount] = useState(0);
  const [coinPrice, setcoinPrice] = useState(0);
  const [loadingNumbers, setloadingNumbers] = useState(true);

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

  const FetchData = async () => {
    try {
      return await FetchPartners(
        window.tronLink.tronWeb.defaultAddress.base58,
        []
      ).then(async (e) => {
        setpartnersList(e);
        console.log(e);
        return await FetchEarning(
          window.tronLink.tronWeb.defaultAddress.base58,
          e.length
        );
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
       

        return partners;
      });
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

    if (LEVEL2 != undefined) {
      for await (const id of LEVEL2) {
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

    if (LEVEL3 != undefined) {
      for await (const id of LEVEL3) {
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
    }

    if (LEVEL4 != undefined) {
      for await (const id of LEVEL4) {
        // LEVEL 4
        let expiration7 = (
          await Utils.contract.viewUserLevelExpired(id, 5).call()
        ).toNumber();

        if (expiration7 != 0) {
          Totalcoins +=
            (await Utils.contract.LEVEL_PRICE(5).call()).toNumber() / 1000000;
        }

        // LEVEL 9
        let expiration8 = (
          await Utils.contract.viewUserLevelExpired(id, 10).call()
        ).toNumber();

        if (expiration8 != 0) {
          Totalcoins +=
            (await Utils.contract.LEVEL_PRICE(10).call()).toNumber() / 1000000;
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
