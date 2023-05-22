import React from "react";
import logo from "../img/logo.png";
import { VscSettingsGear } from "react-icons/vsc";
import { FaRegAddressCard } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { MdOutlineHowToVote, MdSupervisorAccount } from "react-icons/md";

function BarraNavegacion() {
	return (
		<header className="header-navbar">
			<div className="row-one">
				<div className="col-one-img">
					<a title="Administracion" href="/">
						<img
							className="BrandLogo"
							src={logo}
							alt="Logo"
							width="80"
							height="40"
						/>
					</a>
				</div>
				<div className="col-two-navbar">
					<Navbar
						collapseOnSelect
						expand="lg"
						bg="light"
						variant="light"
						className="menuNavbar"
					>
						<Navbar.Toggle aria-controls="responsive-navbar-nav" />
						<Navbar.Collapse id="responsive-navbar-nav">
							<Nav className="me-auto">
								<NavDropdown
									title=<span>
										<VscSettingsGear /> Administracion
									</span>
									id="collasible-nav-dropdown"
								>
									<NavDropdown.Divider />
									<NavDropdown
										title=<span>
											<MdSupervisorAccount /> Usuarios
										</span>
										id="collasible-nav-dropdown"
									>
										<NavDropdown.Divider />
										<NavDropdown.Item href="/usuarios/crear">
											<FaRegAddressCard /> Crear Usuario
										</NavDropdown.Item>
										<NavDropdown.Item href="/usuarios">
											<MdOutlineHowToVote /> Listar Usuario
										</NavDropdown.Item>

										<NavDropdown.Divider />
									</NavDropdown>

									<NavDropdown
										title=<span>
											<MdSupervisorAccount /> Ciudadanos
										</span>
										id="collasible-nav-dropdown2"
									>
										<NavDropdown.Divider />
										<NavDropdown.Item href="/contactos/crear">
											<FaRegAddressCard /> Crear Ciudadano
										</NavDropdown.Item>
										<NavDropdown.Item href="/contactos">
											<MdOutlineHowToVote /> Listar Ciudadano
										</NavDropdown.Item>
										<NavDropdown.Divider />
									</NavDropdown>

									<NavDropdown
										title=<span>
											<MdSupervisorAccount /> Testigos
										</span>
										id="collasible-nav-dropdown2"
									>
										<NavDropdown.Divider />
										<NavDropdown.Item href="/testigos/crear">
											<FaRegAddressCard /> Crear testigos
										</NavDropdown.Item>
										<NavDropdown.Item href="/testigos">
											<MdOutlineHowToVote /> Listar testigos
										</NavDropdown.Item>
										<NavDropdown.Divider />
									</NavDropdown>

									<NavDropdown
										title=<span>
											<MdSupervisorAccount /> Lugar de Votación
										</span>
										id="collasible-nav-dropdown2"
									>
										<NavDropdown.Divider />
										<NavDropdown.Item href="/lugares/crear">
											<FaRegAddressCard /> Crear lugar
										</NavDropdown.Item>
										<NavDropdown.Item href="/lugares">
											<MdOutlineHowToVote /> Listar lugares
										</NavDropdown.Item>
										<NavDropdown.Divider />
									</NavDropdown>

									<NavDropdown.Divider />
								</NavDropdown>

								<Nav.Link href="/contactos/crear">
									<FaRegAddressCard /> Registro Ciudadano
								</Nav.Link>

								<NavDropdown
									title=<span>
										<MdLocationOn /> Lugar Votación
									</span>
									id="collasible-nav-dropdown2"
								>
									<NavDropdown.Divider />
									<NavDropdown.Item href="/asignartestigo/crear">
										<MdOutlineHowToVote /> Asignar Testigo
									</NavDropdown.Item>
									<NavDropdown.Item href="/asignartestigo">
										<MdOutlineHowToVote /> Testigos Asignados
									</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Divider />
									<NavDropdown.Item href="/asignarcontacto/crear">
										<MdOutlineHowToVote /> Asignar Contacto
									</NavDropdown.Item>
									<NavDropdown.Item href="/asignarcontacto">
										<MdOutlineHowToVote /> Contactos Asignados
									</NavDropdown.Item>
									<NavDropdown.Divider />
								</NavDropdown>
							</Nav>
						</Navbar.Collapse>
					</Navbar>
				</div>
			</div>
			<div>
				<div className="separatorNavbar"></div>
			</div>
		</header>
	);
}

export default BarraNavegacion;
