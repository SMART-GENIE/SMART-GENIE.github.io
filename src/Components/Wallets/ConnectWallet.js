import React from "react";
import logo from '../../Assets/tronlink.png';

const ConnectWallet = ({Connect}) => {
  return (
    <div className="Wallet-Div">
      <div onClick={()=>Connect()} className="Wallet-Circle">
        <img
          width={30}
          src={logo}
        />
      </div>
      {/* <div className="Wallet-Circle">
        <img
          width={28}
          src="https://trustwallet.com/assets/images/media/assets/TWT.png"
        />
      </div>
      <div className="Wallet-Circle">
        <img
          width={28}
          src="https://app.compound.finance/compound-components/assets/icn-coinbase-wallet.svg"
        />
      </div> */}
      {/* <div onClick={()=>CONNECT_WALLET()} className="Wallet-Circle">
                    <img
                      width={25}
                      src="https://storage.opensea.io/static/wallets/walletconnect/walletconnect-alternative.png"
                    />
                  </div> */}
      {/* <div onClick={()=>CONNECT_WALLET()} className="Wallet-Circle">
                    <img
                      width={25}
                      src="https://static.opensea.io/logos/fortmatic-alternative.png"
                    />
                  </div> */}
    </div>
  );
};

export default ConnectWallet;
