import React, { useEffect, useState, useRef } from "react";
import "../styles/NFTCard.css";
import { FaEthereum } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Card from "./base/Card";
import Button from "./base/Button";
import  Colors from "../constants/Colors.json";


import { useARStatus } from "../hooks/isARStatus"
    
interface NFTCardProps {
  username: string,
  nftName: string,
  price: number,
  nftSrc: string,
  likeCount: number,
  gradient: number,
  onClick: () => void,
}

const NFTCard = ({ username, nftName, price, nftSrc, likeCount, gradient, onClick }: NFTCardProps): JSX.Element => {
  const [isLike, setIsLike] = useState(false);
  const [colors, setColors] = useState<any>([]);
  const nftCardRef = useRef<HTMLDivElement>(null);

  const isARSupport = useARStatus(nftSrc);

  useEffect(() => {
    console.log(isARSupport);
  }, [])

  const like = () => setIsLike(!isLike);

  const getColors = (colors: any) => {
    setColors([...colors]);
  }

  return (
    <Card
      blurColor={colors[0]}

      child={<>
        {
          <img className="nft-image" src={nftSrc} alt="" />
        }
        <div className="wrapper">
          <div className="info-container">
            <p className="owner"> LEJOURN.DARK.NFT</p>
            <p className="name">Alien Cry</p>
          </div>

          <div className="price-container">
            <p className="price-label">Price</p>
            <p className="price">
              {" "}
              <FaEthereum /> 4.555
            </p>
          </div>
        </div>
        <div className="buttons">
          {/* <button className="buy-now">Buy Now</button> */}
          <Button color={Colors.buttons.primary} textContent="Buy Now" onClick={onClick} />
          <div className="like-container">
            <button className="like" onClick={like}>
              {!isLike ? (
                <AiOutlineHeart size="30" color="white" />
              ) : (
                <AiFillHeart size="30" style={{
                  stroke: `-webkit-linear-gradient(
                    to bottom,
                    #38ef7d,
                    #11998e
                  );`
                }} color='#00f5c966' />
              )}
            </button>
            <p className="like-count">123</p>
          </div>
        </div>
      </>}
      ref= {nftCardRef}
      />
  );
};

export default NFTCard;
