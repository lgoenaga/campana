import React from "react";
import { UpdateRegistroUsuario } from "../../services/usuarios/usuarioupdate";
import BarraNavegacion from "../../components/header";
import Footer from "../../components/footer";

const ViewUpdateUsuario = () => {
  return (
    <>
      <BarraNavegacion />
      <UpdateRegistroUsuario />
      <Footer />
    </>
  );
};

export default ViewUpdateUsuario;
