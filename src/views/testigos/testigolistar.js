import React from "react";
import { ListTestigos } from "../../services/testigos/testigoslistar";
import BarraNavegacion from "../../components/header";
import Footer from "../../components/footer";

const ViewTestigos = () => {
  return (
		<>
			<BarraNavegacion />
			<h1>TESTIGOS</h1>
			<ListTestigos />
			<Footer />
		</>
	);
};

export default ViewTestigos;
