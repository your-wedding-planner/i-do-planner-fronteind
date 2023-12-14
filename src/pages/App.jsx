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
import GuestDetails from "../components/GuestDetails";
import GuestEdit from "../components/GuestEdit";
import VendorDetails from "../components/VendorDetails";
import VendorEdit from "../components/VendorEdit";
import SeatingPlanner from "../components/SeatingPlanner";
import TableEdit from "../components/TableEdit";
import Footer from "../components/Footer";
import BudgetCalculator from "../components/BudgetCalculator";
import CostItemEdit from "../components/CostItemEdit";
import AboutUs from "../components/AboutUs";
import Contact from "../components/Contact";
import WeddingOrganization from "../components/WeddingOrganization";
import "./index.css";
import { Toaster } from "react-hot-toast";
import LandingPage from "./LandingPage";

function App() {
  return (
    <>
      <Toaster />
      <Header />
      <NavBar />
      <Routes>
        <Route path="/landingPage" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            <IsAnon>
              <Login />
            </IsAnon>
          }
        />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <Signup />
            </IsAnon>
          }
        />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/WeddingOrganization" element={<WeddingOrganization />} />
        <Route
          path="/"
          element={
            <IsPrivate>
              <HomePage />
            </IsPrivate>
          }
        />
        <Route
          path="/GuestList"
          element={
            <IsPrivate>
              <GuestList />
            </IsPrivate>
          }
        />
        <Route
          path="/VendorList"
          element={
            <IsPrivate>
              <VendorList />
            </IsPrivate>
          }
        />
        <Route
          path="/GuestDetails/:guestId"
          element={
            <IsPrivate>
              <GuestDetails />
            </IsPrivate>
          }
        />
        <Route
          path="/VendorDetails/:vendorId"
          element={
            <IsPrivate>
              <VendorDetails />
            </IsPrivate>
          }
        />
        <Route
          path="/GuestEdit/:guestId"
          element={
            <IsPrivate>
              <GuestEdit />
            </IsPrivate>
          }
        />
        <Route
          path="/VendorEdit/:vendorId"
          element={
            <IsPrivate>
              <VendorEdit />
            </IsPrivate>
          }
        />
        <Route
          path="/BudgetCalculator"
          element={
            <IsPrivate>
              <BudgetCalculator />
            </IsPrivate>
          }
        />
        <Route
          path="/SeatingPlanner"
          element={
            <IsPrivate>
              <SeatingPlanner />
            </IsPrivate>
          }
        />
        <Route
          path="/TableEdit"
          element={
            <IsPrivate>
              <TableEdit />
            </IsPrivate>
          }
        />
        <Route
          path="/CostItemEdit/:costItemId"
          element={
            <IsPrivate>
              <CostItemEdit />
            </IsPrivate>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
