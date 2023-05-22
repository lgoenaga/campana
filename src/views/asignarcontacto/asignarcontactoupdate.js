import React from "react";
import { UpdateAsignarContacto } from "../../services/asignacioncontacto/asignacioncontactoupdate";
import BarraNavegacion from "../../components/header";
import Footer from "../../components/footer";

const ViewUpdateAsignarContacto = () => {
	return (
		<>
			<BarraNavegacion />
			<h1>ACTUALIZAR ASIGNACIÓN DE CONTACTO</h1>
			<UpdateAsignarContacto />
			<Footer />
		</>
	);
};

export default ViewUpdateAsignarContacto;
