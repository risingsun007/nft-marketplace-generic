import React from "react";
import Hero from "../components/Hero";
import "../styles/Home.css";
import CardList from "../components/CardList";
import hotDropsData from "../constants/HotDropData.json";
import Header from "../components/Header";


const Home = () => {
  return (
    <div id="home">
      <Header />
      <Hero />
      <p id="card-list-header-text"> Hot Drops </p>
      <div id="list-container">
        <CardList list={hotDropsData}  />
      </div>
    </div>
  );
};

export default Home;
