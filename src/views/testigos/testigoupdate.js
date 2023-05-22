import React from "react";
import { UpdateTestigo } from "../../services/testigos/testigoupdate";
import Footer from "../../components/footer";

const ViewUpdateTestigo = () => {
  return (
		<>
			<h1>ACTUALIZAR TESTIGO</h1>
			<UpdateTestigo />
			<Footer />
		</>
	);
};

export default ViewUpdateTestigo;
