import React from "react";
import { CreateAsignarTestigo } from "../../services/asignaciontestigo/asignaciontestigocrear";
import BarraNavegacion from "../../components/header";
import Footer from "../../components/footer";
import "../../css/registrociudadano.css";

const ViewCrearAsignarTestigo = () => {
	return (
		<>
			<BarraNavegacion />
			<h1>ASIGNACIÓN DE TESTIGO LUGAR Y MESA DE VOTACIÓN</h1>
			<CreateAsignarTestigo />
			<Footer />
		</>
	);
};

export default ViewCrearAsignarTestigo;
