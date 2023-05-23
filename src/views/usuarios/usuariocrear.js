import React from "react";
import { CrearRegistroUsuario } from "../../services/usuarios/usuariocrear";
import BarraNavegacion from "../../components/header";
import Footer from "../../components/footer";


const ViewCrearUsuario = () => {
  return (
		<>
			<BarraNavegacion />
			<div className="titulos">
				<h1 className="titulos"> CREAR USUARIO</h1>
			</div>
			<CrearRegistroUsuario />
			<Footer />
		</>
	);
};

export default ViewCrearUsuario;
