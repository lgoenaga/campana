import React from "react";
import { ListUsuarios } from "../../services/usuarios/usuarioslistar";
import BarraNavegacion from "../../components/header";
import Footer from "../../components/footer";

const ViewUsuarios = () => {
  return (
		<>
			<BarraNavegacion />
			<h1>USUARIOS</h1>
			<ListUsuarios />

			<Footer />
		</>
	);
};

export default ViewUsuarios;
