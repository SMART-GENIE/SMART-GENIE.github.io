import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import "./Login.css";
import logimg from "./logimg.jpg";
import logm from "./logm.jpg";
import { GrSend } from "react-icons/gr";
import { FiTwitter } from "react-icons/fi";
import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsBoxArrowUpRight } from "react-icons/bs";

import TronWeb from "tronweb";
import Utils from "../../Utils/index";

// import Logo from "../../Assets/Logos/Classfresh(logo).png";
import { Form, Button, Toast } from "react-bootstrap";
import ConnectWallet from "../Wallets/ConnectWallet";
import useWindowDimensions from "../../Tools/WindowDimensions";

import { useSelector, useDispatch } from "react-redux";
import { toogleAuth, getAuth } from "../Redux/Reducer/AuthReducer";
import { FaBullseye } from "react-icons/fa";
import { Hex_to_base58 } from "../../Utils/Converter";
import { tooglePreviewModeId } from "../Redux/Reducer/PreviewMode";
import UserId, { toogleuserId } from "../Redux/Reducer/UserId";

const FOUNDATION_ADDRESS = "TG31Eya5GywMYV2rwq3rwGbep4eoykWREP";


const Login = () => {
  const { height, width } = useWindowDimensions();

  const authStatus = useSelector(getAuth);
  const dispatch = useDispatch();

  const [loginId, setloginId] = useState("");
  const [previewId, setpreviewId] = useState("");
  const [Loader, setLoader] = useState(false);

  const [tronWeb, settronWeb] = useState({ installed: false, loggedIn: false });

  let TOKEN = localStorage.getItem("access_token");

  console.log(authStatus);

  useEffect(() => {
    document.title = "Login|SmartGenie";


    const checklogin = setInterval(async () => {
      if (window?.tronLink?.tronWeb) {
        clearInterval(checklogin);
        await checkUser();
      }
    }, 1000);
  }, []);

  const PreviewMode = async () => {
    try {


      if (previewId.trim().length == 0) {
        return toast.error("Please enter valid RefId/address");
      }

      setLoader(true);
      // if string is address
      if (/[a-zA-Z]/.test(previewId)) {
        alert("2")

        const LoadUserExist = await Utils.contract.users(previewId).call();

        const userexist = await Promise.resolve(LoadUserExist);
        setLoader(false);
        if (userexist[0] == false) {
          setLoader(false);

          return toast.error("User does not exist");
        }

        dispatch(tooglePreviewModeId(await Hex_to_base58(previewId)));
        await FetchUserId(previewId);
        dispatch(toogleAuth("LOGGEDIN"));

        console.log(userexist[0]);
      } else {

        const LoadUserAddress = await Utils.contract
          .userList(JSON.parse(previewId))
          .call();

          
        let userAddress = await Promise.resolve(LoadUserAddress);

        
        // userAddress = (await Utils.tronWeb.address.fromHex(userAddress))


        const LoadUserExist = await Utils.contract.users(userAddress).call();


        const userexist = await Promise.resolve(LoadUserExist);

        if (userexist.isExist == false) {
          setLoader(false);
          return toast.error("User does not exist");
        }
        dispatch(tooglePreviewModeId(await Hex_to_base58(userAddress)));
        await FetchUserId(await Hex_to_base58(userAddress));
        dispatch(toogleAuth("LOGGEDIN"));

        // setLoader(false);
      }

      // const userexist = await Promise.resolve(LoadUserExist);
      // console.log(userexist);
      // if (userexist[0] == true) {
      //   dispatch(toogleAuth("LOGGEDIN"));
      // } else {
      //   window.location.href = "/register";
      //   dispatch(toogleAuth("LOGGEDOUT"));
      // }
    } catch (e) {
      console.log(e,"yes");
      setLoader(false);
    }
  };

  const FetchUserId = async (userAddress) => {
    const LoadUserId = await Utils.contract.users(userAddress).call();
    const userId = await Promise.resolve(LoadUserId);
    // console.log(userId.id.toNumber(),"HI");
    dispatch(toogleuserId(userId.id.toNumber()));
  };

  // useEffect(() => {
  //   setTimeout(() => {

  //     if (window.tronLink?.tronWeb) {
  //       dispatch(toogleAuth("LOGGEDIN"));
  //     } else {
  //       dispatch(toogleAuth("LOGGEDOUT"));
  //     }

  //     if (authStatus == "LOGGEDOUT") {
  //       if (window.location.pathname != "/") {
  //         window.location.href = "/";
  //       }
  //     }
  //   }, 200);
  // }, [tronWeb]);

  const FetchData = async () => {
    try {
      await FetchPartners(
        window.tronLink.tronWeb.defaultAddress.base58,
        []
      ).then((e) => {
        alert(e.length);
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
      if (!window.tronWeb.ready || window.tronLink.tronWeb == false) {
        window.location.reload();
      }

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

      console.log(window.tronWeb,"CONNECT");

      // Set default address (foundation address) used for contract calls
      // Directly overwrites the address object as TronLink disabled the
      // function call
      window.tronWeb.defaultAddress = {
        hex: window.tronWeb?.address?.toHex(FOUNDATION_ADDRESS),
        base58: FOUNDATION_ADDRESS,
      };

      window.tronWeb.on("addressChanged", (e) => {
        // alert("CHNAGES");
        if (tronWeb.loggedIn) return;
        settronWeb({
          tronWeb: {
            installed: true,
            loggedIn: true,
          },
        });
      });

      await Utils.setTronWeb(window.tronWeb).then(async () => {
        await checkUser2();
        // alert(window.tronLink.tronWeb.defaultAddress.base58);
        // dispatch(toogleAuth("LOGGEDIN"));
      });
    } catch (e) {
      console.log(e);
    }
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
  };

  const checkUser = async () => {
    // console.log(window.tronWeb);
    await Utils.setTronWeb(window.tronWeb).then(async () => {
      const LoadUserExist = await Utils.contract
        .users(window.tronLink.tronWeb.defaultAddress.base58)
        .call();
      const userexist = await Promise.resolve(LoadUserExist);
      if (userexist[0] == true) {
        await FetchUserId(window.tronLink.tronWeb.defaultAddress.base58);
        dispatch(toogleAuth("LOGGEDIN"));
      } else {
        // window.location.href = "/register";
        dispatch(toogleAuth("LOGGEDOUT"));
      }
      // console.log(userexist[0]);
    });
  };

  const checkUser2 = async () => {
    // console.log(window.tronWeb);
    await Utils.setTronWeb(window.tronWeb).then(async () => {
      const LoadUserExist = await Utils.contract
        .users(window.tronLink.tronWeb.defaultAddress.base58)
        .call();
      const userexist = await Promise.resolve(LoadUserExist);
      if (userexist[0] == true) {
        await FetchUserId(window.tronLink.tronWeb.defaultAddress.base58);
        dispatch(toogleAuth("LOGGEDIN"));
      } else {
        window.location.href = "/register";
        dispatch(toogleAuth("LOGGEDOUT"));
      }
      // console.log(userexist[0]);
    });
  };

  return (
    <div className="Login-Main">
      <div className="Triangle"></div>

      <div className="Vertical-Line" />

      <div className="Cover-Div">
        <div className="Outer-Div">
          <div className="Inner-Div">
            <div className="Double-Div">
              <div className={"Form-Box-Inside"}>
                <div className="Logo-Div">
                  <p>Connect To Wallet</p>
                  {/* <img style={{ width: "221px", height: "67px" }} src={Logo} /> */}
                </div>

                <ConnectWallet Connect={CONNECT_WALLET} />

                <div className="Divider">
                  Or you can enter manually, enter the number of your ETH purse
                </div>
                <div className="Inside-Form-Div">
                  <Form onSubmit={(e) => HandleSubmit(e)}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Control
                        name="text"
                        className="Input"
                        placeholder="Enter Address or Referal Id"
                        value={previewId}
                        onChange={(e) => {
                          setpreviewId(e.target.value);
                        }}
                        autoComplete={"false"}
                        autoCorrect={"false"}
                        required
                      />
                    </Form.Group>

                    <div className="Button-Div">
                      <button
                        onClick={PreviewMode}
                        disabled={Loader}
                        style={{ opacity: Loader ? 0.5 : 1 }}
                        className="Button"
                      >
                        {Loader ? (
                          <p>Loading (Please wait)</p>
                        ) : (
                          <p>Enter App (Preview Mode)</p>
                        )}
                      </button>
                    </div>
                  </Form>
                </div>
              </div>

              {width >= 630 && (
                <div className={"Form-Box-Inside"}>
                  <div className="login2">
                    <center>
                      {/* <img src={logm} height="80px" width="90px" alt="login_m" /> */}
                    </center>
                    <h2 className="log2h2">WELCOME TO SMART GENIE</h2>
                    <center>
                      <p className="social">Follow us on social networks</p>
                    </center>
                    <div className="icdiv">
                      <div className="iccircle">
                        <GrSend size={20} />
                      </div>
                      <div className="iccircle">
                        <FiTwitter color="black" size={20} />
                      </div>
                      <div className="iccircle">
                        <BsInstagram color="black" size={20} />
                      </div>
                      <div className="iccircle">
                        <BsFacebook color="black" size="20px" />
                      </div>
                    </div>
                    <br />

                    <p className="social">
                      Any question you can get in our chat:
                    </p>

                    <button className="log2btn">Chat in Telegram EN</button>
                    <button className="log2btn">Join Discord</button>

                    <div className="Bottom">
                      <p className="log2con">SMART GENIE smart-contract:</p>
                      <a target="_blank" href={`https://tronscan.org/#/contract/${Utils?.contractAddress}`} style={{color:"white"}} className="open">
                        {Utils?.contractAddress}
                        {/* 0x03C6FcED478cBbC9a4FAB34eF9f40767739D1Ff7 */}
                        <BsBoxArrowUpRight
                          style={{ marginLeft: 10, marginBottom: 1 }}
                          size="12px"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

// function Login(){
//     return(
//         <div className="Login">
//             <div className="login1">
//                 <center>
//                     <h1 className="logh1">Login</h1>
//                     <center><h5 className="logh5">Automatic login if you have one of the following wallets:</h5></center>
//                     <img src={logimg} alt="logimage" height="80px" width="250px" />
//                     <center><h5 className="logh5">Or you can enter manually, enter the number of your ETH purse</h5></center>
//                     <input className="loginp" placeholder="Enter ETH address or system ID"/><br/><br/>
//                     <button className="logbtn">Enter manually (preview mode)</button>

//                 </center>
//             </div>
// <div className="login2">
//     <center>
//         <img src={logm} height="80px" width="90px" alt="login_m" />
//     </center>
//     <h2 className="log2h2">SMART  GENIE</h2>
//     <center><p className="social">Follow us on social networks</p></center>
//     <div className="icdiv">
//     <div className="iccircle">
//         <GrSend/>
//     </div>
//     <div className="iccircle">
//     <FiTwitter color="black"/>
//     </div>
//     <div className="iccircle">
//         <BsInstagram color="black"/>
//     </div>
//     <div className="iccircle">
//         <BsFacebook color="black" size="20px"/>
//     </div>

//     </div>
//     <br/>

//     <p className="social">Any question you can get in our chat:</p>

// <button className="log2btn"><GrSend className="send" size="15px"/>Chat in Telegram EN</button>

// <p className="log2con">SMART GENIE smart-contract:</p>

// <div className="open">
//     <div className="open1">
//     <p className="log2con1">
// (Contract Address to be Updated)
// </p>
//     </div>

//     <div className="open2">
//     <BsBoxArrowUpRight size="12px"/>
//     </div>
// </div>
// </div>

// </div>
//     )
// }
// export default Login;
