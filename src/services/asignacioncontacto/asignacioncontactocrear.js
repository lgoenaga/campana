import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Swal from "sweetalert2";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { listLugares, getLugar } from "../../routes/lugarvotacion";
import { listCiudadanos } from "../../routes/contactos";
import { createAsignarContacto } from "../../routes/asignacioncontacto";

import { AuthHeaders } from "../../components/authheader";
import { MostrarRol } from "../../components/decodec";

export const CreateAsignarContacto = () => {
	const navigate = useNavigate();

	const [valoresForm, setValoresForm] = useState({});

	const [validated, setValidated] = useState(false);

	const [errors, setErrors] = useState({});

	const [lugares, setLugares] = useState([]);
	const [contactos, setContactos] = useState([]);
	const [numMesas, setNumMesas] = useState([]);

	let userToken = MostrarRol();

	let userRol = userToken.rol;
	const { polling = "", voter = "", numberPolling = "" } = valoresForm;

	useEffect(() => {
		if (userRol === "Administrador" || userRol === "Operador") {
			Swal.fire({
				icon: "info",
				title: "Asignar Lugar",
				showConfirmButton: false,
				timer: 2000,
				didOpen: () => {
					Swal.showLoading();
				},
			});
		} else {
			Swal.fire({
				icon: "error",
				title: "Usuario sin permisos",
				showConfirmButton: false,
				didOpen: () => {
					Swal.showLoading();
				},
			});
			setTimeout(() => {
				Swal.close();
				navigate("/");
			}, 1000);
		}
	}, [navigate, userRol]);

	const findFormErrors = () => {
		const { polling, voter, numberPolling } = valoresForm;

		const newErrors = {};

		if (!polling || polling === "") newErrors.polling = "cannot be blank!";

		if (!voter || voter === "") newErrors.voter = "cannot be blank!";

		if (!numberPolling || numberPolling === "") {
			newErrors.numberPolling = "cannot be blank!";
		}
		return newErrors;
	};

	useEffect(() => {
		const CantMesas = async () => {
			let cantMesas = 0;
			let lugar = await getLugar(polling);
			if (lugar)
				cantMesas = lugar.data.numberPollingStation;

			var newArray = [];
			for (var i = 0; i < cantMesas; i++) {
				newArray.push(i);
			}
			setNumMesas(newArray);
			
		};
		if (polling !== "") {
			CantMesas();		
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [polling]);


	const handleOnChange = ({ target }) => {
		const { name, value } = target;
		
		setValoresForm({ ...valoresForm, [name]: value });

	};

	const handleOnSubmit = async (event) => {
		event.preventDefault();
		const form = event.currentTarget;

		if (form.checkValidity() === false) {
			event.stopPropagation();
		}

		const newErrors = findFormErrors();
		setErrors(newErrors);
		setValidated(true);
		console.log("valor polling " + newErrors.polling);
		if (Object.keys(newErrors).length > 0) {
			Swal.fire({
				icon: "error",
				title: "Error en las validaciones",
				showConfirmButton: false,
				didOpen: () => {
					Swal.showLoading();
				},
			});
			setTimeout(() => {
				Swal.close();
			}, 2000);
		} else {

			let timerInterval;
			const asignarLugar = {
				polling,
				voter,
				numberPolling,
			};
			Swal.fire({
				title: "Desea Asiganar el ciudadano al lugar de Votación? ",
				timer: 20000,
				timerProgressBar: true,
				showDenyButton: true,
				showConfirmButton: true,
				confirmButtonText: "Save",
				denyButtonText: "Not save",
				html:
					"<div style='font-size:25px;'><br>Autocerrado en...... " +
					"<div style='color:red;'><br> <b></b>  Segundos <br><br><br></div></div>",
				allowOutsideClick: false,
				allowEscapeKey: false,
				allowEnterKey: false,
				didOpen: (toast) => {
					toast.addEventListener("mouseenter", Swal.stopTimer);

					toast.addEventListener("mouseleave", Swal.resumeTimer);

					const b = Swal.getHtmlContainer().querySelector("b");
					timerInterval = setInterval(() => {
						b.textContent = Math.trunc(Swal.getTimerLeft() / 1000);
					}, 1000);
				},
				willClose: () => {
					clearInterval(timerInterval);
				},
			}).then(async (result) => {
				let data = "";

				try {
					if (result.isConfirmed) {
						const authheader = AuthHeaders();
						data = await createAsignarContacto(asignarLugar, authheader);

						Swal.fire({
							icon: "success",
							title: "Lugar Asignado",
							showConfirmButton: false,
							timer: 2000,
							didOpen: () => {
								Swal.showLoading();
							},
						});
						setTimeout(() => {
							Swal.close();
							navigate("/asignarcontacto");
						}, 2000);
					} else {
						if (result.isDenied) {
							Swal.fire({
								icon: "info",
								title: "No se ha realizado la asignación",
								showConfirmButton: false,
								didOpen: () => {
									Swal.showLoading();
								},
							});
							setTimeout(() => {
								Swal.close();
								navigate("/asignarcontacto");
							}, 2000);
						}
					}
					if (result.dismiss === Swal.DismissReason.timer) {
						Swal.fire({
							icon: "error",
							title: "Se ha superado el tiempo sin una respuesta",
							showConfirmButton: false,
							didOpen: () => {
								Swal.showLoading();
							},
						});
						setTimeout(() => {
							Swal.close();
							navigate("/asignarcontacto");
						}, 2000);
					}
				} catch (error) {
					let mensaje;
					const newErrors = findFormErrors();

					if (Object.keys(newErrors).length > 0) {
						mensaje = "Error en las validaciones";
					} else {
						mensaje = error.response.data;
					}

					Swal.fire({
						icon: "error",
						title: mensaje,
						showConfirmButton: false,
						timer: 2000,
					});
					Swal.showLoading();
				} finally {
					if (data) {
						setTimeout(() => {
							Swal.close();
						}, 2000);
					}
				}
			});
		}
	};

	const pageHome = () => {
		navigate("/inicio");
	};

	useEffect(() => {
		const authheader = AuthHeaders();
		const vacio = localStorage.getItem("Authorization");
		if (vacio != null) {
			const mostrarContactos = async () => {
				const { data } = await listCiudadanos(authheader);
				setContactos(data);
			};
			mostrarContactos();
		}
	}, []);

	useEffect(() => {
		const authheader = AuthHeaders();
		const vacio = localStorage.getItem("Authorization");
		if (vacio != null) {
			const mostrarLugares = async () => {
				const { data } = await listLugares(authheader);
				setLugares(data);
			};
			mostrarLugares();
		}
	}, []);

	return (
		<>
			<Container className="contenedor-datosPersonales">
				<Form className="formDatosPersonales" noValidate validated={validated}>
					<Form.Label>Datos Personales</Form.Label>
					<Row className="mb-3">
						<Form.Group as={Col} controlId="formGridPolling">
							<Form.Label>Lugar de Votación</Form.Label>

							<Form.Select
								value={polling}
								name="polling"
								onChange={(e) => handleOnChange(e)}
								required
								id="polling"
							>
								<option value="" disabled hidden>
									Open this select menu
								</option>
								{lugares.map((dato) => (
									<option key={dato._id} value={dato._id}>
										{dato.pollingStation}
									</option>
								))}
							</Form.Select>
							<Form.Control.Feedback type="invalid">
								{errors.polling}
							</Form.Control.Feedback>
						</Form.Group>
					</Row>
					<Row>
						<Form.Group as={Col} controlId="formGridvoter">
							<Form.Label>Ciudadano Asignado</Form.Label>
							<Form.Select
								value={voter}
								name="voter"
								onChange={(e) => handleOnChange(e)}
								required
							>
								<option value="" disabled hidden>
									Open this select menu
								</option>
								{contactos.map((dato) => (
									<option key={dato._id} value={dato._id}>
										{dato.firstName} {dato.firstSurname}
									</option>
								))}
							</Form.Select>
							<Form.Control.Feedback type="invalid">
								{errors.voter}
							</Form.Control.Feedback>
						</Form.Group>
					</Row>
					<Row className="mb-3">
						<Form.Group as={Col} controlId="formGridnumberPolling">
							<Form.Label>Numero de Mesa</Form.Label>
							<Form.Select
								value={numberPolling}
								name="numberPolling"
								onChange={(e) => handleOnChange(e)}
								required
							>
								<option value="" disabled hidden>
									Open this select menu
								</option>
								{numMesas.map((dato) => (
									<option key={dato}>{dato + 1}</option>
								))}
							</Form.Select>
							<Form.Control.Feedback type="invalid">
								{errors.numberPolling}
							</Form.Control.Feedback>
						</Form.Group>
					</Row>
				</Form>
			</Container>
			<Container className="button-contactos">
				<Button variant="info" onClick={handleOnSubmit}>
					GUARDAR
				</Button>
				<Button variant="info" onClick={pageHome}>
					INICIO
				</Button>
			</Container>
		</>
	);
};
