import React, { useEffect, useState } from "react";
import "./Partners.css";
import { AiFillBell } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import Table from "../Table/Table";
import Tree from "../Tree/Tree";
import Utils from "../../Utils/index";
import useWindowDimensions from "../../Tools/WindowDimensions";
import { Hex_to_base58 } from "../../Utils/Converter";
import { getPartnersLevelJson } from "../Redux/Reducer/PartnersLevelJson";

import TronWeb from "tronweb";
import { useSelector } from "react-redux";

const FOUNDATION_ADDRESS = "TG31Eya5GywMYV2rwq3rwGbep4eoykWREP";

function Partners() {
  const { height, width } = useWindowDimensions();

  const [coinsCount, setcoinsCount] = useState(0);
  const [coinPrice, setcoinPrice] = useState(0);


  const [tronWeb, settronWeb] = useState({ installed: false, loggedIn: false });
  const [treeData, settreeData] = useState([]);
  const [TableData, setTableData] = useState([]);


  // const levelJson = useSelector(getPartnersLevelJson);

  useEffect(() => {
    CONNECT_WALLET();
    FetchCoinCurrecy()
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


  let TotalPartnersCount = 0;

  const FetchTree = async (id, TREEDATA) => {
    await Utils.contract
      .viewUserReferral(id)
      .call()
      .then(async (items) => {
        TotalPartnersCount += items.length;

        var item = {};

        if (items.length > 0) {
          var temp = [];
          for await (const item of items) {
            let e = await Hex_to_base58(item);
            temp.push(e);
          }

          item = {
            name: id,
            children: temp,
          };
          TREEDATA[`${id}`] = temp;
        } else {
          return;
        }

        for await (const item of items) {
          let e = await Hex_to_base58(item);
          if (e == undefined || !e) return;
          await FetchTree(e, TREEDATA);
        }
      });

    return TREEDATA;
  };

  const ProccessTreeData = async (data, id, temp) => {
    const id_to_num = await Utils.contract.users(id).call();
    const resId = await Promise.resolve(id_to_num[1].toNumber());
    temp = {
      name: resId,
    };
    if (id in data) {
      const fetch = data[id].map(async (i) => {
        return ProccessTreeData(data, i, temp);
      });
      const response = await Promise.all(fetch);
      temp["children"] = response;
    } else {
      temp["name"] = resId;
    }

    console.log(temp);

    return temp;
    // if(data[0]?.children){
    //   ProccessTreeData(data[0]?.children)
    // }
    // return ans
  };

  let PartnersArray = [];
  let LevelJSON = {};

  var LEVEL = 0;

  const ConverttoHexArray = async (items) => {
    let temp = [];
    for await (const i of items) {
      let t = await Hex_to_base58(i);
      temp.push(t);
    }
    return temp;
  };

  const calculate_CoinsFromLevels = async (data) => {
    let TempData = [];

    let LEVEL1 = data["1"];
    let LEVEL2 = data["2"];
    let LEVEL3 = data["3"];
    let LEVEL4 = data["4"];
    let LEVEL5 = data["5"];


    if (LEVEL1 != undefined) {
      let Totalcoins = 0;
      let tempArray = [];

      for await (const id of LEVEL1) {
        // LEVEL 1
        // temp["address"] = id;

        let expiration0 = (
          await Utils.contract.viewUserLevelExpired(id, 1).call()
        ).toNumber();

        if (expiration0 != 0) {
          Totalcoins +=
            (await Utils.contract.LEVEL_PRICE(1).call()).toNumber() / 1000000;

          tempArray.push({ address: id, coins: Totalcoins });
          Totalcoins = 0;
        }

        // LEVEL 6
        let expiration01 = (
          await Utils.contract.viewUserLevelExpired(id, 6).call()
        ).toNumber();

        if (expiration01 != 0) {
          Totalcoins +=
            (await Utils.contract.LEVEL_PRICE(6).call()).toNumber() / 1000000;
          tempArray.push({ address: id, coins: Totalcoins });
          Totalcoins = 0;
        }
      }

      TempData = [...TempData, ...tempArray];
    }

    if (LEVEL2 != undefined) {
      let Totalcoins = 0;
      let tempArray = [];

      for await (const id of LEVEL2) {
        let expiration1 = (
          await Utils.contract.viewUserLevelExpired(id, 2).call()
        ).toNumber();

        if (expiration1 != 0) {
          Totalcoins +=
            (await Utils.contract.LEVEL_PRICE(2).call()).toNumber() / 1000000;
          tempArray.push({ address: id, coins: Totalcoins });
          Totalcoins = 0;
        }

        // LEVEL 6
        let expiration2 = (
          await Utils.contract.viewUserLevelExpired(id, 7).call()
        ).toNumber();

        if (expiration2 != 0) {
          Totalcoins +=
            (await Utils.contract.LEVEL_PRICE(7).call()).toNumber() / 1000000;
          tempArray.push({ address: id, coins: Totalcoins });
          Totalcoins = 0;
        }
      }
      TempData = [...TempData, ...tempArray];
    }

    if (LEVEL3 != undefined) {
      let Totalcoins = 0;
      let tempArray = [];

      for await (const id of LEVEL3) {
        // LEVEL 2

        let expiration3 = (
          await Utils.contract.viewUserLevelExpired(id, 3).call()
        ).toNumber();

        if (expiration3 != 0) {
          Totalcoins +=
            (await Utils.contract.LEVEL_PRICE(3).call()).toNumber() / 1000000;
          tempArray.push({ address: id, coins: Totalcoins });
          Totalcoins = 0;
        }

        // LEVEL 7
        let expiration4 = (
          await Utils.contract.viewUserLevelExpired(id, 8).call()
        ).toNumber();

        if (expiration4 != 0) {
          Totalcoins +=
            (await Utils.contract.LEVEL_PRICE(8).call()).toNumber() / 1000000;
          tempArray.push({ address: id, coins: Totalcoins });
          Totalcoins = 0;
        }
      }
      TempData = [...TempData, ...tempArray];
    }

    if (LEVEL4 != undefined) {
      let Totalcoins = 0;
      let tempArray = [];

      for await (const id of LEVEL4) {
        // LEVEL 3

        let expiration5 = (
          await Utils.contract.viewUserLevelExpired(id, 4).call()
        ).toNumber();

        if (expiration5 != 0) {
          Totalcoins +=
            (await Utils.contract.LEVEL_PRICE(4).call()).toNumber() / 1000000;
          tempArray.push({ address: id, coins: Totalcoins });
          Totalcoins = 0;
        }

        // LEVEL 8

        let expiration6 = (
          await Utils.contract.viewUserLevelExpired(id, 9).call()
        ).toNumber();

        if (expiration6 != 0) {
          Totalcoins +=
            (await Utils.contract.LEVEL_PRICE(9).call()).toNumber() / 1000000;
          tempArray.push({ address: id, coins: Totalcoins });
          Totalcoins = 0;
        }
      }
      TempData = [...TempData, ...tempArray];

      if (LEVEL5 != undefined) {
        let Totalcoins = 0;
        let tempArray = [];

        for await (const id of LEVEL5) {
          // LEVEL 4
          let expiration7 = (
            await Utils.contract.viewUserLevelExpired(id, 5).call()
          ).toNumber();

          if (expiration7 != 0) {
            Totalcoins +=
              (await Utils.contract.LEVEL_PRICE(5).call()).toNumber() / 1000000;
            tempArray.push({ address: id, coins: Totalcoins });
            Totalcoins = 0;
          }

          // LEVEL 9
          let expiration8 = (
            await Utils.contract.viewUserLevelExpired(id, 10).call()
          ).toNumber();

          if (expiration8 != 0) {
            Totalcoins +=
              (await Utils.contract.LEVEL_PRICE(10).call()).toNumber() /
              1000000;
            tempArray.push({ address: id, coins: Totalcoins });
            Totalcoins = 0;
          }
        }
        TempData = [...TempData, ...tempArray];
      }

      // setcoinsCount(Totalcoins);
    }
    return TempData;
  };

  const PreProcessData = async(data)=>{
    let temp = [];
    for await (const item of data) {

      const id_to_num = await Utils.contract.users(item.address).call();
      const data = await Promise.resolve(id_to_num);
  
      const id = data[1].toNumber()
      temp.push({address:item.address,id:id,coins:item.coins})
    
    }
    return temp;
  }

  const FetchPayments = async (id, count) => {
    ++LEVEL;

    if (count == PartnersArray.length) {
      // console.log(count, PartnersArray.length);
      // console.log(LevelJSON);
      // console.log(LEVEL);
      return await calculate_CoinsFromLevels(LevelJSON).then(async(res) => {
        await PreProcessData(res).then((result)=>{
          setTableData(result)
        })
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

              await FetchPayments(e, count);
            }
          }
        });
    }
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
      await Utils.setTronWeb(window.tronWeb).then(async () => {
        await FetchTree(window.tronLink.tronWeb.defaultAddress.base58, {}).then(
          async (e) => {
            await ProccessTreeData(
              e,
              window.tronLink.tronWeb.defaultAddress.base58,
              {}
            ).then(async (res) => {
              settreeData([res]);
              await FetchPayments(
                window.tronLink.tronWeb.defaultAddress.base58,
                TotalPartnersCount
              );
              // console.log(res);
            });
          }
        );
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="panel">
      <div>
        <p className="header">Partners</p>
      </div>

      <div className="linkbox">
        <div className="linkInside">
          <div className="content">
            <p className="linkname1">Your Affilate Link</p>
            <br />

            <input
              className="link1"
              readOnly={true}
              value={"https://lk.million.money/a/95623/"}
            />
            <br />
            <button className="copybtn">Copy Link</button>
          </div>
        </div>

        <div
          style={{
            marginLeft: width >= 1100 ? "30px" : "0",
            marginTop: width >= 1100 ? "0" : "20px",
          }}
          className="linkInside"
        >
          <div className="content">
            {width >= 1100 ? (
              <>
                <p className="linkname1">Data about partner</p>
                <br />
                <div className="Inline">
                  <input className={"link2"} />
                  <span>
                    <button className="copybtn">Search</button>
                  </span>
                </div>
              </>
            ) : (
              <div style={{ width: "100%" }}>
                <p className="linkname1">Data about partner</p>
                <br />
                <input style={{ width: "100%" }} className={"link1"} />
                <span>
                  <button style={{ marginTop: "10px" }} className="copybtn">
                    Search
                  </button>
                </span>
              </div>
            )}

            <br />
            <div className="PartnerList">
              {/* <span>Id:45845</span><span style={{marginLeft:"25px"}} >Level:1</span><span style={{marginLeft:"25px"}} >Address:0xfewfwfwfwfefewfwe<span><i class="fa fa-external-link-alt"></i></span></span> */}
              <div class="partner__info">
                ID: <b>99132</b> &nbsp;&nbsp;&nbsp; Level: <b>1</b>{" "}
                &nbsp;&nbsp;&nbsp; Address:
                0xa7d7043df066a9fd0fc277a1d48bc07d43714557{" "}
                <a
                  href="https://etherscan.io/address/0xa7d7043df066a9fd0fc277a1d48bc07d43714557 "
                  target="_blank"
                >
                  <i class="fa fa-external-link-alt"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="structure">
        <p className="linkname1">Your structure</p>
        {/* <a href="#">To expand\collapse all</a> */}
        <div className="TreeDiv">
          <Tree data={treeData} />
        </div>

        <Table data={TableData}  coinprice={coinPrice} />
      </div>
    </div>
  );
}
export default Partners;
