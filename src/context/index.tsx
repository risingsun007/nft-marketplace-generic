import React from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'
import { NftProvider } from './NftContext'
import { Web3Provider } from '@ethersproject/providers'
//import { DAppProvider } from '@usedapp/core'
//import { Goerli, Mainnet, ContractCall } from "@usedapp/core";


function getLibrary(provider: any): any {
  const library = new Web3Provider(provider)
  library.pollingInterval = 15000
  return library
}

const AppProvider = ({ children }: any) => {
  return (
    <Web3ReactProvider getLibrary = {getLibrary}>
      <NftProvider>
      {children}
      </NftProvider>
    </Web3ReactProvider>
  );
}

export default AppProvider

