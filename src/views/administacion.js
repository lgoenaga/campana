import React from "react";
import logo from "../img/logo.png";

import BarraNavegacion from "../components/header";
import Footer from "../components/footer";
import Administracion from "../services/administracion";
import "../css/administracion.css";

const ViewAdministracion = () => {

  return (
    <>
      <BarraNavegacion />
      <div className="contenedor-admin">
        <img className="BrandLogo " src={logo} alt="Logo" height="150" />
      </div>
      <Administracion />
      <Footer/>
    </>
  );
};

export default ViewAdministracion;
