import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

import { Contract } from "@ethersproject/contracts";
import { parseEther } from "@ethersproject/units";
import abi from '../abi/erc1155.json'
import { injectedConnector } from '../constants'
import { Nft } from '../models'

//TODO determine cost of mint
const NFT_COST = ".01";

// TODO: Programmatically get this
const nftCost = .01;

interface WindowEthereum {
  ethereum: any;
};

const NftContext = React.createContext<Nft | null>(null);
const intialMintFunc = () => (async (id: number): Promise<any> => { console.log("do mint initial") });

export function NftProvider<React>({ children }: any) {

  let [doMint, setDoMint] = useState<((id: number) => Promise<any>)>(intialMintFunc);
  let [getTokenBalances, setGetTokenBalances] = useState<((id: number) => Promise<number[]>) | null>(null);
  let { active, account, library, activate } = useWeb3React<Web3Provider>()

  const mintFunc = useCallback(async (id: number, web3ReactHook: any): Promise<any> => { 
    try{
    console.log('enter mintFunc')
    if (!web3ReactHook.active) {
      await web3ReactHook.activate(injectedConnector)
    }
    console.log('enter mintFunc part1')
    const signer = await web3ReactHook.library?.getSigner();
    console.log('enter mintFunc part2')
    const windowEthereum = window as unknown as WindowEthereum;
    const contract = new Contract(process.env.REACT_APP_CONTRACT_ADDRESS as any, abi as any, signer);
    for(let key in  windowEthereum.ethereum){
      if(key !== "_readableState" && key !=="pipes" && key !=="_jsonRpcConnection"){
        console.log(key)
        console.log(`network: ${key} ${JSON.stringify(windowEthereum.ethereum[key])} `)
      }
    }
    if (windowEthereum?.ethereum?.network && windowEthereum.ethereum.chainId !== "0x5"){
      console.log("try to switch wallet");
      await windowEthereum.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ "chainId": "0x5" }]
      });
    }
    console.log(`enter mintFunc part3: ${parseEther(String(nftCost))}`)
    const result1 = await contract.functions.mint(id, 1, { value: parseEther(String(nftCost)) });
    console.log(`mintFunc result1: ${JSON.stringify(result1)}`)
    return result1;
  } catch (e){
    console.log(`mint error: ${e}`)
  }
  }, [])

  useEffect(() => {
    if (process.env.REACT_APP_CONTRACT_ADDRESS) {
      const windowEthereum = window as unknown as WindowEthereum;
      const getTokenBalances = async (numTokens: number): Promise<number[]> => {
        if (!active) {
          setTimeout(() => activate(injectedConnector), 500)
        }
        const contract = new Contract(process.env.REACT_APP_CONTRACT_ADDRESS as any, abi as any, library);
        const keyArr = [];
        for (let i = 0; i < numTokens; ++i) {
          keyArr.push(account)
        }
        const numMints = await contract.functions.balanceOfBatch(keyArr, [...Array(numTokens).keys()]);
        numMints.forEach((x: any) => console.log(`balance: ${x}`))
        return (numMints);
      }

      setGetTokenBalances(() => getTokenBalances);
    } else {
      console.log("you need to define the environmental variable CONTRACT_ADDRESS");
    }

  }, []);

  const value = useMemo(() => ({ doMint: mintFunc, getTokenBalances, nftCost }), [account]);

  return (
    <NftContext.Provider value={value} >{children} </NftContext.Provider>
  );
};

export default NftContext
