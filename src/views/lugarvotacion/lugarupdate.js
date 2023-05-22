import React from "react";
import { UpdateLugar } from "../../services/lugarvotacion/lugarupdate";
import BarraNavegacion from "../../components/header";
import Footer from "../../components/footer";

const ViewUpdateLugar = () => {
  return (
		<>
			<BarraNavegacion />
			<h1>ACTUALIZAR LUGAR DE VOTACION</h1>
			<UpdateLugar />
			<Footer />
		</>
	);
};

export default ViewUpdateLugar;
