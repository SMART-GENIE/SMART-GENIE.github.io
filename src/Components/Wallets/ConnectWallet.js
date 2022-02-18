import React from "react"
const ConnectWallet = ()=>{
    return(
        <div className="Wallet-Div">
                  <div className="Wallet-Circle">
                    <img
                      width={30}
                      src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                    />
                  </div>
                  <div className="Wallet-Circle">
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
                  </div>
                  {/* <div className="Wallet-Circle">
                    <img
                      width={25}
                      src="https://storage.opensea.io/static/wallets/walletconnect/walletconnect-alternative.png"
                    />
                  </div> */}
                  {/* <div className="Wallet-Circle">
                    <img
                      width={25}
                      src="https://static.opensea.io/logos/fortmatic-alternative.png"
                    />
                  </div> */}
                </div>
    )
}

export default ConnectWallet