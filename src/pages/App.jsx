import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import GuestList from "../components/GuestList";
import VendorList from "../components/VendorList";
import HomePage from "./HomePage";
import IsPrivate from "../components/IsPrivate";
import IsAnon from "../components/IsAnon";
import "./index.css";

function App() {
  return (
    <>
      <Header />
      <NavBar />
      <Routes>
        <Route path="/login" element={<IsAnon><Login /></IsAnon>} />
        <Route path="/signup" element={<IsAnon><Signup /></IsAnon>} />
        <Route path="/" element={<IsPrivate><HomePage /></IsPrivate>} />
        <Route path="/GuestList" element={<IsPrivate><GuestList /></IsPrivate>} />
        <Route path="/VendorList" element={<IsPrivate><VendorList /></IsPrivate>} />
      </Routes>
    </>
  );
}

export default App;
