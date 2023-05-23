import React from "react";
import { CrearRegistroCiudadano } from "../../services/contactos/contactocrear";
import Footer from "../../components/footer";
//import "./css/style.css";


const ViewRegistroCiudadano = () => {
  return (
    <>
      <h1>REGISTRO CIUDADANO</h1>
      <CrearRegistroCiudadano />
      <Footer />
    </>
  );
};

export default ViewRegistroCiudadano;
