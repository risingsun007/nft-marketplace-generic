import React from "react";
import NFTCard from "./NFTCard";
import "../styles/CardList.css";
import { useNavigate } from "react-router-dom";
import  useNft  from "../hooks/useNft"
interface CardListProps {
  list: any,
  type?: string
}


const CardList: React.FC<CardListProps> = ({ list, type = "horizontal" }) => {
  let navigate = useNavigate();
  const nftContext = useNft();

  return (
    <div id="card-list" style={{ flexDirection: type === "horizontal" ? "row" : "column" }}>
      {list.map((item: any, index: number) => (
        <NFTCard username="todoUserName" nftSrc={item.src} nftName = "todoNftName" price = {nftContext?.nftCost || -99}
          likeCount = {0} gradient = {0}
          key={index} onClick={() => navigate('/detail', { state: { item, index } })} />
      ))}
    </div>
  );
};

export default CardList;
