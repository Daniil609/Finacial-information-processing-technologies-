 
// App.js
import LoginBar from "./components/LoginBar";
import Navbar from "./components/Navbar";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from './layouts/LoginPage'
import RegisterPage from './layouts/RegisterPage'
import HomePage from './layouts/HomePage'
import AdPage from "./layouts/AdPage";
import AccountPage from './layouts/AccountPage'
import PaymentPage from "./layouts/PaymentPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/ad" element={<AdPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/payment" element={<PaymentPage />} />
    </Routes>
  );
}

export default App;