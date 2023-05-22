import React from "react";
import { ListAsignarTestigo } from "../../services/asignaciontestigo/asignaciontestigolistar";
import BarraNavegacion from "../../components/header";
import Footer from "../../components/footer";

const ViewAsignarTestigo = () => {
	return (
		<>
			<BarraNavegacion />
			<h1>TESTIGOS ASIGNADOS A LUGARES DE VOTACIÓN</h1>
			<ListAsignarTestigo />
			<Footer />
		</>
	);
};

export default ViewAsignarTestigo;
