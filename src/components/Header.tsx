import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useEthers, useEtherBalance } from "@usedapp/core";


const Header = (): JSX.Element => {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  const handleWallet = () => {
    activateBrowserWallet();
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

        <button id="connect-wallet" onClick={handleWallet} >{!account ? 'Connect Wallet' : account}</button>
      </div>
    </div>
  );
}

export default Header ;