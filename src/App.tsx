import React from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Explore from "./pages/Explore";
import AppProvider from "./context/"



//dapp

import NFTDetail from "./pages/NFTDetail";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/detail" element={<NFTDetail />} />
        </Routes>
      </BrowserRouter >
    </AppProvider>
  );
}

export default App;
