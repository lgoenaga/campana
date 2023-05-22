import React from "react";
import { UpdateAsignarTestigo } from "../../services/asignaciontestigo/asignaciontestigoupdate";
import BarraNavegacion from "../../components/header";
import Footer from "../../components/footer";

const ViewUpdateAsignarTestigo = () => {
	return (
		<>
			<BarraNavegacion />
			<h1>ACTUALIZAR ASIGNACIÓN DE TESTIGO</h1>
			<UpdateAsignarTestigo />
			<Footer />
		</>
	);
};

export default ViewUpdateAsignarTestigo;
