import React, { useEffect, useState } from "react";
import "./Partners.css";
import { AiFillBell } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import Table from "../Table/Table";
import Tree from "../Tree/Tree";
import Utils from "../../Utils/index";
import useWindowDimensions from "../../Tools/WindowDimensions";
import { Hex_to_base58 } from "../../Utils/Converter";
import TronWeb from "tronweb";

const FOUNDATION_ADDRESS = "TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg";

function Partners() {
  const { height, width } = useWindowDimensions();

  const [coinsCount, setcoinsCount] = useState(0);

  const [tronWeb, settronWeb] = useState({ installed: false, loggedIn: false });

  useEffect(() => {
    CONNECT_WALLET();
  }, []);

  let PartnersArray = [];

  var LEVEL = 0;

  const FetchTree = async (id, TREEDATA) => {
    await Utils.contract
      .viewUserReferral(id)
      .call()
      .then(async (items) => {
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
    temp = {
      name: id,
    };
    if (id in data) {
      const fetch = data[id].map(async (i) => {
        return ProccessTreeData(data, i, temp);
      });
      const response = await Promise.all(fetch);
      temp["children"] = response
    } else {
      temp["name"] = id

    }

    console.log(temp);

    return temp;
    // if(data[0]?.children){
    //   ProccessTreeData(data[0]?.children)
    // }
    // return ans
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
            );
            // console.log(e);
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
          <Tree />
        </div>

        <Table />
      </div>
    </div>
  );
}
export default Partners;
