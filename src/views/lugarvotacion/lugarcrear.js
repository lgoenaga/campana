import React from "react";
import { CreateLugar } from "../../services/lugarvotacion/lugarcrear";
import BarraNavegacion from "../../components/header";
import Footer from "../../components/footer";
//import "./css/style.css";

const ViewCrearLugar = () => {
	return (
		<>
			<BarraNavegacion />
			<h1>CREAR LUGAR DE VOTACIÓN</h1>
			<CreateLugar />
			<Footer />
		</>
	);
};

export default ViewCrearLugar;
