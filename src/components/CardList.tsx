import React from "react";
import NFTCard from "./NFTCard";
import "../styles/CardList.css";
import { useNavigate } from "react-router-dom";

interface CardListProps {
  list: any,
  type?: string
}

const CardList: React.FC<CardListProps> = ({ list, type = "horizontal" }) => {
  let navigate = useNavigate();
  console.log(`type: ${type}`)

  return (
    <div id="card-list" style={{ flexDirection: type === "horizontal" ? "row" : "column" }}>
      {list.map((item: any, index: number) => (
        <NFTCard username="todoUserName" nftSrc={item.src} nftName = "todoNftName" price = {-99}
          likeCount = {0} gradient = {0}
          key={index} onClick={() => navigate('/detail', { state: { item: item } })} />
      ))}
    </div>
  );
};

export default CardList;
