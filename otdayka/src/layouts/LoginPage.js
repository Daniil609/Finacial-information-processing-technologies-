 
// App.js
import LoginBar from "../components/LoginBar";
import Navbar from "../components/Navbar";
import { Routes, Route } from "react-router-dom";


function LoginPage() {
  return (
    <>
       <Navbar/>
       <LoginBar/> 
    </>
  );
}

export default LoginPage;