import React, { useState, useEffect, createRef } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useLocation, Navigate } from "react-router";
import Card from "../components/base/Card";
import "../styles/NFTDetail.css";
import Button from "../components/base/Button";
import { FaEthereum } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart, AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useMobile } from "../hooks/isMobile";
import { useARStatus } from "../hooks/isARStatus";
import useNft from "../hooks/useNft";
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { wallet } from '../api/EvmConnector'
import Modal from '../components/base/modal'
import { inspect } from 'util'
import styled from "styled-components";
import { setDefaultResultOrder } from "dns";

const Spinner = styled.div`
  border: 16px solid white;
  border-top: 16px blue solid;
  border-radius: 50%;
  height: 60px;
  width: 60px;
  animation: spin 2s linear infinite;
  /* 
  border: 16px solid #f3f3f3; 
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite; */

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;


const NFTDetail = () => {
  let { account, library } = useWeb3React<Web3Provider>()
  const web3ReactHook = useWeb3React<Web3Provider>();
  const active = web3ReactHook.active;
  const isMobile = useMobile();

  const [colors, setColors] = useState<string[]>([]);
  const [isLike, setIsLike] = useState(false);
  const [showModal, doShowModal] = useState<boolean>(false);
  const [mintSuccess, setMintSuccess] = useState<boolean>(false);
  const [waitingForMint, setWaitingForMint] = useState<boolean>(false);
  const [hash, setHash] = useState<string>(""); 

  interface WindowEthereum {
    ethereum: any;
  };

  const windowEthereum = window as unknown as WindowEthereum;

  const like = () => setIsLike(!isLike);

  const getColors = (colors: string[]) => {
    setColors((c: string[]) => [...c, ...colors]);
  };

  const resetValues = () => {
    setMintSuccess(false)
    setWaitingForMint(false)
  }

  const navigate = useNavigate();

  // TODO figure out how to deal with unknow type is safe way
  const { state } = useLocation() as any;

  useEffect(() => {
    setColors([]);
  }, [state]);

  const isARSupport = useARStatus(state.item.src);
  const nftInfo = useNft();

  function getLink(hash: string){
    return(<a href={`https://goerli.etherscan.io/tx/${hash}`}>Link to transaction</a>)
  }

  const doMint = async () => {
    try {
      if (nftInfo && nftInfo.doMint) {
        setWaitingForMint(true);
        let result = await (nftInfo.doMint(state.index, web3ReactHook));
        if(result && result.hash){
          setHash(result.hash)
        }
        setMintSuccess(true)
        setWaitingForMint(false)
      }
      else {
        console.log("NFT context not set up yet");

      }
    } catch (e) {
      setMintSuccess(false);
      setWaitingForMint(false);
    }
  }

  const connect = async () => {
    await wallet.connect(web3ReactHook)
  }

  const modalCloseHandler = () => {
    doShowModal(false);
    resetValues();
  }

 

  return (
    <div>
      <Header />

      <div id="nft-detail-card-wrapper">
        <Modal show={showModal} doShow={modalCloseHandler}>
       
          {mintSuccess ? <div  className="blue-style"> Mint Success!!!!!{getLink(hash)} </div>
            :
            waitingForMint ?
              <div> <Spinner /> </div>
              :
              <Button
                width={isMobile ? "70%" : "70%"}
                height="50px"
                onClick={() => active ? doMint() : connect()}
                child={
                  <div id="button-child">
                    <FaEthereum size="28px" />
                    <p id="price">{active ? "Buy for " + nftInfo?.nftCost || -99 : "Connect"}</p>
                  </div>
                }></Button>
          }
        </Modal>
        <Card
          width={isMobile ? "100%" : "65vw"}
          height={isMobile ? "700px" : "60vh"}
          blurColor={colors[0]}
          child={
            //Detail Content

            <div id="detail-content">
              <img id="detail-image" src={state.item.src} />
              <div id="detail-info" style={{}}>
                <div id='detail-info-container'>
                  <p id="collection"> {state.item.name} </p>
                  <p id="name"> {state.item.name} </p>
                  <p id="description" > {state.item.description} </p>

                </div>


                <div id="detail-controls">
                  <Button
                    width={isMobile ? "70%" : "70%"}
                    height="50px"
                    onClick={() => { active ? doShowModal(true) : connect() }}
                    child={
                      <div id="button-child">
                        <FaEthereum size="28px" />
                        <p id="price">{active ? nftInfo?.nftCost || -99 : "Connect"}</p>
                      </div>
                    }
                  ></Button>
                  <div className="like-container">
                    <button className="like" onClick={like}>
                      {!isLike ? (
                        <AiOutlineHeart size="45" color="white" />
                      ) : (
                        <AiFillHeart
                          size="45"
                          style={{
                            stroke: `-webkit-linear-gradient(
                    to bottom,
                    #38ef7d,
                    #11998e
                  );`,
                          }}
                          color="#00f5c966"
                        />
                      )}
                    </button>
                    <p className="like-count">123</p>
                  </div>
                </div>
              </div>

            </div>
          }
        />

      </div>

    </div>
  );
};

export default NFTDetail;
