import React from "react";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const Administracion = () => {
  const navigate = useNavigate();
  const vacio = localStorage.getItem("Authorization");

  useEffect(() => {
    if (vacio == null) {
      Swal.fire({
        icon: "error",
        title: "Usuario sin permisos",
        showConfirmButton: false,
        timer: 1000,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      setTimeout(() => {
        Swal.close();
        navigate("/");
      }, 1000);
    }
  }, [navigate, vacio]);

  const Salir = () => {
    navigate("/");
  };

  return (
    <>
      <Button className="btnSalir" variant="primary" onClick={Salir}>
        SALIR
      </Button>
    </>
  );
};

export default Administracion;
