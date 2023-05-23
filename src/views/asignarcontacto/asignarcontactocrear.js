import React from "react";
import { CreateAsignarContacto } from "../../services/asignacioncontacto/asignacioncontactocrear";
import BarraNavegacion from "../../components/header";
import Footer from "../../components/footer";
//import "./css/style.css";

const ViewCrearAsignarContacto = () => {
	return (
		<>
			<BarraNavegacion />
			<h1>ASIGNACIÓN DE CONTACTO LUGAR Y MESA DE VOTACIÓN</h1>
			<CreateAsignarContacto />
			<Footer />
		</>
	);
};

export default ViewCrearAsignarContacto;
