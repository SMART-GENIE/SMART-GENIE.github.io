import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import "./Register.css";
import { GrSend } from "react-icons/gr";
import { FiTwitter } from "react-icons/fi";
import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsBoxArrowUpRight } from "react-icons/bs";

// import Logo from "../../Assets/Logos/Classfresh(logo).png";
import { Form, Button } from "react-bootstrap";
import ConnectWallet from "../Wallets/ConnectWallet";
import useWindowDimensions from "../../Tools/WindowDimensions";
import { FaBullseye } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import TronWeb from "tronweb";
import Utils from "../../Utils/index";
import { getAuth, toogleAuth } from "../Redux/Reducer/AuthReducer";
import { toogleuserId } from "../Redux/Reducer/UserId";

const Register = () => {
  const { height, width } = useWindowDimensions();

  const [Register, setRegister] = useState(FaBullseye);

  const [loginId, setloginId] = useState("");
  const [refId, setrefId] = useState(null);
  const [alertdata, setalertdata] = useState(null);
  const [Loader, setLoader] = useState(false);

  const FOUNDATION_ADDRESS = "TG31Eya5GywMYV2rwq3rwGbep4eoykWREP";

  const authStatus = useSelector(getAuth);
  const dispatch = useDispatch();

  const [tronWeb, settronWeb] = useState({ installed: false, loggedIn: false });

  let TOKEN = localStorage.getItem("access_token");

  // const Login =()=>{
  //   window.location = "http://console.localhost:3000/"
  // }

  useEffect(() => {
    document.title = "Classfresh:Log in";
  }, []);

  const HandleSubmit = async (e) => {
    e.preventDefault();
  };

  const CONNECT_WALLET = async () => {
    try {
      if (!window.tronWeb.ready) {
        window.location.href = "/";
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
        if (refId != null) {
          await Buy(refId);
        } else {
          const CurrentIdLoad = await Utils.contract.currUserID().call();
          const CurrentId = await Promise.resolve(CurrentIdLoad);
          await Buy(JSON.parse(CurrentId.toString()));
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const Buy = async (refID) => {
    window.tronWeb.defaultAddress = {
      hex: window.tronLink.tronWeb.defaultAddress.hex,
      base58: window.tronLink.tronWeb.defaultAddress.base58,
    };

    return await Utils.setTronWeb(window.tronWeb).then(async () => {
      const toastId = toast.loading("Waiting for transction confirmation");
      setLoader(true);
      try {
        await Utils.contract
          .regUser(refID)
          .send({
            feeLimit: 100_000_000,
            callValue: 1000000 * 300,
            shouldPollResponse: true,
          })
          .then(async(res) => {
            toast.remove(toastId);
            toast.success("Transaction done successfully");
            await FetchUserId(window.tronLink.tronWeb.defaultAddress.base58);
            dispatch(toogleAuth("LOGGEDIN"));

            return res;
          })
          .catch(async (err) => {
            await checkUser(toastId);
            console.log(err);
          });
      } catch (error) {
        console.log(error);
        await checkUser(toastId);
      }
    });
  };

  const checkUser = async (toastId) => {
    console.log(window.tronWeb);
    await Utils.setTronWeb(window.tronWeb).then(async () => {
      const LoadUserExist = await Utils.contract
        .users(window.tronLink.tronWeb.defaultAddress.base58)
        .call();
      const userexist = await Promise.resolve(LoadUserExist);
      if (userexist[0] == true) {
        toast.remove(toastId);
        toast.success("Transaction done successfully");
        setLoader(false);
        await FetchUserId(window.tronLink.tronWeb.defaultAddress.base58);
        dispatch(toogleAuth("LOGGEDIN"));
        window.location.href = "/";
      } else {
        window.location.href = "/register";
        dispatch(toogleAuth("LOGGEDOUT"));
        setLoader(false);
        toast.remove(toastId);
        toast.error("Transaction Failed");
      }

      // console.log(userexist[0]);
    });
  };

  const FetchUserId = async (userAddress) => {
    const LoadUserId = await Utils.contract.users(userAddress).call();
    const userId = await Promise.resolve(LoadUserId);
    dispatch(toogleuserId(JSON.parse(userId[1])));
  };

  return (
    <div className="Login-Main">
      <Toaster />

      <div className="Triangle"></div>

      <div className="Vertical-Line" />

      <div className="Cover-Div">
        <div className="Outer-Div">
          <div className="Inner-Div">
            <div className="Double-Div">
              <div className={"Form-Box-Inside"}>
                <div className="Logo-Div">
                  <p>Registration</p>
                  {/* <img style={{ width: "221px", height: "67px" }} src={Logo} /> */}
                </div>

                <ConnectWallet />

                <div style={{ paddingInline: "20px" }} className="Divider">
                  Enter Refereral Id of Upline or leave it empty to get
                  automatically
                </div>
                <div className="Inside-Form-Div">
                  <Form onSubmit={(e) => HandleSubmit(e)}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Control
                        name="email"
                        className="Input"
                        placeholder="Enter Referal Id of Upline"
                        value={refId}
                        onChange={(e) => {
                          setrefId(e.target.value);
                        }}
                        required={false}
                      />
                    </Form.Group>

                    <div className="Button-Div">
                      <button
                        onClick={CONNECT_WALLET}
                        disabled={Loader}
                        style={{ opacity: Loader ? 0.5 : 1 }}
                        className="Button"
                      >
                        {Loader ? (
                          <p>Transction Loading...</p>
                        ) : (
                          <p>Purchase Level 1 to Register</p>
                        )}
                      </button>
                    </div>

                    <div className="Back-Button-Div">
                      <Link to={"/"} style={{ textDecoration: "none" }}>
                        <button className="Back-Button">Back</button>
                      </Link>
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
                      <p className="open">
                        0x03C6FcED478cBbC9a4FAB34eF9f40767739D1Ff7
                        <BsBoxArrowUpRight
                          style={{ marginLeft: 10, marginBottom: 1 }}
                          size="12px"
                        />
                      </p>
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

export default Register;

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
