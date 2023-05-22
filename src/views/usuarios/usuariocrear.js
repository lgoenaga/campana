import React from "react";

import { CrearRegistroUsuario } from "../../services/usuarios/usuariocrear";
import BarraNavegacion from "../../components/header";
import Footer from "../../components/footer";


const ViewCrearUsuario = () => {
  return (
    <>
      <BarraNavegacion />
      <CrearRegistroUsuario />
      <Footer />
    </>
  );
};

export default ViewCrearUsuario;
