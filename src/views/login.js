import React from "react";
import Login from "../services/login";
import Footer from "../components/footer";
import "../css/login.css";


const ViewLogin = () => {
  return (
    <>
      <Login />
      <Footer />
    </>
  );
};

export default ViewLogin;
