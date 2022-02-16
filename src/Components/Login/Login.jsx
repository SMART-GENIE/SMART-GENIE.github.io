import "./Login.css"
import logimg from './logimg.jpg';
import logm from './logm.jpg';
import { GrSend } from 'react-icons/gr'
import { FiTwitter } from 'react-icons/fi';
import { BsInstagram } from 'react-icons/bs';
import { BsFacebook } from 'react-icons/bs'
import { BsBoxArrowUpRight} from 'react-icons/bs';
function Login(){
    return(
        <div className="Login">
            <div className="login1">
                <center>
                    <h1 className="logh1">Login</h1>
                    <center><h5 className="logh5">Automatic login if you have one of the following wallets:</h5></center>
                    <img src={logimg} alt="logimage" height="80px" width="250px" />
                    <center><h5 className="logh5">Or you can enter manually, enter the number of your ETH purse</h5></center>
                    <input className="loginp" placeholder="Enter ETH address or system ID"/><br/><br/>
                    <button className="logbtn">Enter manually (preview mode)</button>
                    
                </center>
            </div>
            <div className="login2">
                <center>
                    <img src={logm} height="80px" width="90px" alt="login_m" />
                </center>
                <h2 className="log2h2">SMART  GENIE</h2>
                <center><p className="social">Follow us on social networks</p></center>
                <div className="icdiv">
                <div className="iccircle">
                    <GrSend/>
                </div>
                <div className="iccircle">
                <FiTwitter color="black"/>
                </div>
                <div className="iccircle">
                    <BsInstagram color="black"/>
                </div>
                <div className="iccircle">
                    <BsFacebook color="black" size="20px"/>
                </div>

                </div>
                <br/>
                
                <p className="social">Any question you can get in our chat:</p>
               
            <button className="log2btn"><GrSend className="send" size="15px"/>Chat in Telegram EN</button>

            <p className="log2con">SMART GENIE smart-contract:</p>

            <div className="open">
                <div className="open1">
                <p className="log2con1">
            (Contract Address to be Updated)
            </p>
                </div>

                <div className="open2">
                <BsBoxArrowUpRight size="12px"/>
                </div>
            </div>
            </div>


        </div>
    )
}
export default Login;