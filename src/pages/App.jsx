import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import GuestList from "../components/GuestList";
import VendorList from "../components/VendorList";
import GuestDetails from "../components/GuestDetails";
import GuestEdit from "../components/GuestEdit";
import "./index.css";

import HomePage from "./HomePage";

function App() {
  return (
    <>
      <Header />
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/GuestList" element={<GuestList />} />
        <Route path="/GuestDetails/:guestId" element={<GuestDetails />} />
        <Route path="/GuestEdit/:guestId" element={<GuestEdit />} />
        <Route path="/VendorList" element={<VendorList />} />
      </Routes>
    </>
  );
}

export default App;
