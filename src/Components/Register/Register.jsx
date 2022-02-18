import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

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

const Register = () => {
  const { height, width } = useWindowDimensions();

  const [Register, setRegister] = useState(FaBullseye);

  const [loginId, setloginId] = useState("");
  const [password, setpassword] = useState("");
  const [alert, setalert] = useState(false);
  const [alertdata, setalertdata] = useState(null);
  const [Loader, setLoader] = useState(false);

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
                  <p>Registration</p>
                  {/* <img style={{ width: "221px", height: "67px" }} src={Logo} /> */}
                </div>
                <div hidden={!alert} className="Form-Alert-Div">
                  <svg
                    aria-hidden="true"
                    height="15"
                    width="15"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.115 1.308l5.635 11.269A2.365 2.365 0 0 1 13.634 16H2.365A2.365 2.365 0 0 1 .25 12.577L5.884 1.308a2.365 2.365 0 0 1 4.231 0zM8 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM8 9c.552 0 1-.32 1-.714V4.714C9 4.32 8.552 4 8 4s-1 .32-1 .714v3.572C7 8.68 7.448 9 8 9z"
                      fill="#ed5f74"
                    ></path>
                  </svg>
                </div>

                <ConnectWallet />

                <div style={{ paddingInline: "20px" }} className="Divider">
                  Enter Address/Referer Id of Upline or leave it empty to get
                  automatically
                </div>
                <div className="Inside-Form-Div">
                  <Form onSubmit={(e) => HandleSubmit(e)}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Control
                        name="email"
                        className="Input"
                        placeholder="Enter Address or Referal Id Upline"
                        value={loginId}
                        onChange={(e) => {
                          setloginId(e.target.value);
                        }}
                        required
                      />
                    </Form.Group>

                    <div className="Button-Div">
                      <button
                        disabled={Loader}
                        style={{ opacity: Loader ? 0.5 : 1 }}
                        className="Button"
                      >
                        {false ? null : ( // /> //   margin={3} //   size={8} //   css={Loadercss} //   loading={true} //   color={"white"} // <PulseLoader
                          <p>Purchase Level 1 to Register</p>
                        )}
                      </button>
                    </div>

                    <div className="Back-Button-Div">
                      <Link to={"/login"} style={{textDecoration:"none"}}>
                      <button className="Back-Button">
                       Back
                      </button>
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
