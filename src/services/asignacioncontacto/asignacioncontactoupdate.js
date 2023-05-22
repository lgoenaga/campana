import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import Swal from "sweetalert2";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import {
	updateAsignarContacto,
	getAsignarContacto,
} from "../../routes/asignacioncontacto";

import { AuthHeaders } from "../../components/authheader";
import { MostrarRol } from "../../components/decodec";

export const UpdateAsignarContacto = () => {
	const navigate = useNavigate();

	let { id } = useParams();

	const [valoresForm, setValoresForm] = useState({});

	const [lugar, setLugar] = useState({});
	const [validated, setValidated] = useState(false);

	const [errors, setErrors] = useState({});

	let userToken = MostrarRol();

	let userRol = userToken.rol;

	const {
		identification = "",
		pollingStation = "",
		address = "",
		department = "",
		township = "",
		numberPollingStation = "",
	} = valoresForm;

	useEffect(() => {
		if (userRol === "Administrador" || userRol === "Operador") {
			const mostrarlugar = async () => {
				try {
					const { data } = await getAsignarContacto(id);
					setLugar(data);
				} catch (error) {
					console.log("Lugar no existe");
				}
			};

			Swal.fire({
				icon: "info",
				title: "Actualizar Lugar",
				showConfirmButton: false,
				timer: 2000,
				didOpen: () => {
					Swal.showLoading();
					mostrarlugar();
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
	}, [id, navigate, userRol]);

	useEffect(() => {
		setValoresForm({
			identification: lugar.identification,
			pollingStation: lugar.pollingStation,
			address: lugar.address,
			department: lugar.department,
			township: lugar.township,
			numberPollingStation: lugar.numberPollingStation,
		});
	}, [lugar]);

	const findFormErrors = () => {
		const { identification, pollingStation, address, department, township } =
			valoresForm;
		const newErrors = {};

		if (!identification || identification === "")
			newErrors.identification = "cannot be blank!";

		if (!pollingStation || pollingStation === "")
			newErrors.pollingStation = "cannot be blank!";

		if (!address || address === "")
			newErrors.pollingStation = "cannot be blank!";

		if (!department || department === "") {
			newErrors.department = "cannot be blank!";
		}

		if (!township || township === "") {
			newErrors.township = "cannot be blank!";
		}

		return newErrors;
	};

	const handleOnChange = ({ target }) => {
		const { name, value } = target;
		setValoresForm({ ...valoresForm, [name]: value });
	};

	const handleOnSubmit = async (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		const lugar = {
			identification,
			pollingStation,
			address,
			department,
			township,
			numberPollingStation,
		};

		if (form.checkValidity() === false) {
			event.stopPropagation();
		}

		if (lugar.unavailablePollingStation > numberPollingStation) {
			console.log("Error: No hay mesas disponibles");
		}

		const newErrors = findFormErrors();
		setErrors(newErrors);
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
			setValidated(true);
		} else {
			let timerInterval;
			Swal.fire({
				title: "Desea Actualizar el Lugar de Votación? ",
				timer: 20000,
				timerProgressBar: true,
				showDenyButton: true,
				showConfirmButton: true,
				confirmButtonText: "Update",
				denyButtonText: "Not update",
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

						data = await updateAsignarContacto(id, lugar, authheader);
						Swal.fire({
							icon: "success",
							title: "Lugar Actualizado",
							showConfirmButton: false,
							timer: 2000,
							didOpen: () => {
								Swal.showLoading();
							},
						});
						setTimeout(() => {
							Swal.close();
							navigate("/lugares");
						}, 2000);
					} else {
						if (result.isDenied) {
							Swal.fire({
								icon: "info",
								title: "Lugar no ha sido actualizado",
								showConfirmButton: false,
								timer: 2000,
								didOpen: () => {
									Swal.showLoading();
								},
							});
							setTimeout(() => {
								Swal.close();
								navigate("/lugares");
							}, 2000);
						}
					}
					if (result.dismiss === Swal.DismissReason.timer) {
						Swal.fire({
							icon: "error",
							title: "Se ha superado el tiempo sin una respuesta",
							showConfirmButton: false,
							timer: 2000,
							didOpen: () => {
								Swal.showLoading();
							},
						});
						setTimeout(() => {
							Swal.close();
							navigate("/lugares");
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

	return (
		<>
			<Container className="contenedor-datosPersonales">
				<Form className="formDatosPersonales" noValidate validated={validated}>
					<Form.Label>Datos Personales</Form.Label>
					<Row className="mb-3">
						<Form.Group as={Col} controlId="formGrididentification">
							<Form.Label>Lugar de Votación</Form.Label>
							<Form.Control
								type="text"
								placeholder="Identificación Ciudadano"
								name="identification"
								value={identification}
								onChange={(e) => handleOnChange(e)}
								required
							/>
							<Form.Control.Feedback type="invalid">
								{errors.identification}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group as={Col} controlId="formGridPollingStation">
							<Form.Label>Lugar de Votación</Form.Label>
							<Form.Control
								type="text"
								placeholder="Lugar de Votación"
								name="pollingStation"
								value={pollingStation}
								onChange={(e) => handleOnChange(e)}
								required
							/>
							<Form.Control.Feedback type="invalid">
								{errors.pollingStation}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group as={Col} controlId="formGridNumberPollingStation">
							<Form.Label>Numero de Mesas</Form.Label>
							<Form.Control
								type="text"
								placeholder="Numero de mesas"
								name="numberPollingStation"
								value={numberPollingStation}
								onChange={(e) => handleOnChange(e)}
							/>
						</Form.Group>
					</Row>
					<Row className="mb-3">
						<Form.Group as={Col} controlId="formGridDepartment">
							<Form.Label>Departamento</Form.Label>
							<Form.Control
								type="text"
								placeholder="Departamento"
								name="department"
								value={department}
								onChange={(e) => handleOnChange(e)}
								required
							/>
							<Form.Control.Feedback type="invalid">
								{errors.department}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group as={Col} controlId="formGridTownship">
							<Form.Label>Municipio</Form.Label>
							<Form.Control
								type="text"
								placeholder="Municipio"
								name="township"
								value={township}
								onChange={(e) => handleOnChange(e)}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.township}
							</Form.Control.Feedback>
						</Form.Group>
												<Form.Group as={Col} controlId="formGridAddress">
							<Form.Label>Dirección de Votación</Form.Label>
							<Form.Control
								type="text"
								placeholder="Dirección"
								name="address"
								value={address}
								onChange={(e) => handleOnChange(e)}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.address}
							</Form.Control.Feedback>
						</Form.Group>
					</Row>
				</Form>
			</Container>
			<Container className="button-contactos">
				<Button variant="info" onClick={handleOnSubmit}>
					actualizar
				</Button>
				<Button variant="info" onClick={pageHome}>
					INICIO
				</Button>
			</Container>
		</>
	);
};
