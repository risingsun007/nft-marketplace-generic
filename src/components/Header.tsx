import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { injectedConnector } from '../constants'
import { wallet } from '../api/EvmConnector'


const Header = (): JSX.Element => {
  let reactWeb3 = useWeb3React<Web3Provider>()

  const handleWallet = () => {
    wallet.connect(reactWeb3)
  }
  // TODO: change links
  return (
    <div id="header">
      <Link to='/' id='logo'>NFT Room</Link>

      <div id="link-containers">
        <a href="/Home">Start Hunting</a>
        <a href="/Home">Dark NFTs</a>
        <a href="/Home">Community</a>
        <a href="/Home">Craft NFT</a>

        <button id="connect-wallet" onClick={handleWallet} >{!reactWeb3.account ? 'Connect Wallet' : reactWeb3.account}</button>
      </div>
    </div>
  );
}

export default Header;