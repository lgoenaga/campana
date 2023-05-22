import React from "react";


let correo1 = "luisgoenagap@gmail.com";
let names1 = "Luis Alberto Goenaga Peláez";

let correo2 = "";
let names2 = "Oscar Julio Castrillon";

function Footer() {
  return (
    <>
      <footer className="footer-app">
        <nav className="navbar fixed-bottom">
          <div>
            <p>Pagina Elaborada por</p>
            <p>{names1}</p>
            <p>{names2}</p>
          </div>
          <div>
            <p>Todos los derechos reservados</p>
            <p>Technodeveloper NET</p>
          </div>
          <div>
            <p>correo electronico</p>
            <p>{correo1}</p>
            <p>{correo2}</p>
          </div>
        </nav>
      </footer>
    </>
  );
}

export default Footer;
