import React from "react";
import { CrearRegistroCiudadano } from "../../services/contactos/contactocrear";
//import BarraNavegacion from "../../components/header";
import Footer from "../../components/footer";
import "../../css/registrociudadano.css"


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
