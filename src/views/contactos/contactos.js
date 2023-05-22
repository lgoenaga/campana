import React from "react";
import { ListCiudadanos } from "../../services/contactos/contactoslistar";
import BarraNavegacion from "../../components/header";
import Footer from "../../components/footer";

const ViewContactos = () => {
  return (
		<>
			<BarraNavegacion />
			<h1>CIUDADANOS</h1>
			<ListCiudadanos />
			<Footer />
		</>
	);
};

export default ViewContactos;
