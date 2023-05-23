import React from "react";
import { UpdateCiudadano } from "../../services/contactos/contactoupdate";
import Footer from "../../components/footer";

const ViewUpdateCiudadano = () => {
  return (
    <>
      <h1>ACTUALIZAR CIUDADANO</h1>
      <UpdateCiudadano />
      <Footer />
    </>
  );
};

export default ViewUpdateCiudadano;
