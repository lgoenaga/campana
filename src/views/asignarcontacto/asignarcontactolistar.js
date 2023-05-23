import React from "react";
import { ListAsignarContacto } from "../../services/asignacioncontacto/asignacioncontactolistar";
import BarraNavegacion from "../../components/header";
import Footer from "../../components/footer";

const ViewAsignarContacto = () => {
	return (
		<>
			<BarraNavegacion />
			<h1>CONTACTOS ASIGNADOS A LUGARES DE VOTACIÓN</h1>
			<ListAsignarContacto />
			<Footer />
		</>
	);
};

export default ViewAsignarContacto;
