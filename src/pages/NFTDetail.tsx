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

const NFTDetail = () => {
  let { account, library} = useWeb3React<Web3Provider>()
  const web3ReactHook = useWeb3React<Web3Provider>();
  const active = web3ReactHook.active;
  const isMobile = useMobile();

  const [colors, setColors] = useState<string[]>([]);

  const [isLike, setIsLike] = useState(false);
  
  const like = () => setIsLike(!isLike);

  const getColors = (colors: string[]) => {
    setColors((c: string[]) => [...c, ...colors]);
  };

  const navigate = useNavigate();

  // TODO figure out how to deal with unknow type is safe way
  const { state } = useLocation() as any;

  useEffect(() => {
    setColors([]);
  }, [state]);

  const isARSupport = useARStatus(state.item.src);
  const nftInfo = useNft();

  const doMint = async () =>  {
   if(nftInfo && nftInfo.doMint){
      await nftInfo.doMint(state.index, web3ReactHook);
   } else {
   }
  }

  const connect = async () =>  {
    await wallet.connect(web3ReactHook)
   }

  return (
    <div>
      <Header />
      <div id="nft-detail-card-wrapper">
        <Card
          width={isMobile ? "100%" : "65vw"}
          height={isMobile ? "700px" : "60vh"}
          blurColor={colors[0]}
          child={
            //Detail Content
            <div id="detail-content">
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
                    onClick={active ? doMint : connect}
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
