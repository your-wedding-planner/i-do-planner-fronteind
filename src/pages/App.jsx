import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import GuestList from "../components/GuestList";
import VendorList from "../components/VendorList";
import "./index.css"

import HomePage from "./HomePage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/GuestList" element={<GuestList />} />
        <Route path="/VendorList" element={<VendorList />} />
      </Routes>
    </>
  );
}

export default App;
