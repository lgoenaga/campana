import React from "react";
import { ListLugares } from "../../services/lugarvotacion/lugarlistar";
import BarraNavegacion from "../../components/header";
import Footer from "../../components/footer";

const ViewLugares = () => {
  return (
		<>
			<BarraNavegacion />
			<h1>LUGARES DE VOTACIÓN</h1>
			<ListLugares />
			<Footer />
		</>
	);
};

export default ViewLugares;
