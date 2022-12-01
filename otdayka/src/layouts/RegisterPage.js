 
// App.js
import LoginBar from "../components/LoginBar";
import Navbar from "../components/Navbar";
import { Routes, Route } from "react-router-dom";
import RegisterBar from "../components/RegisterBar";


function RegisterPage() {
  return (
    <>
       <Navbar/>
       <RegisterBar/> 
    </>
  );
}

export default RegisterPage;