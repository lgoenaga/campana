import React from "react";
import { CrearTestigo} from "../../services/testigos/testigocrear";
import Footer from "../../components/footer";
import "../../css/registrociudadano.css"


const ViewTestigoCrear = () => {
  return (
    <>
      <h1>CREAR TESTIGO</h1>
      <CrearTestigo />
      <Footer />
    </>
  );
};

export default ViewTestigoCrear;
