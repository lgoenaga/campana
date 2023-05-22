import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Swal from "sweetalert2";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { listLugares, getLugar } from "../../routes/lugarvotacion";
import { listTestigos } from "../../routes/testigos";
import {
	createAsignarTestigo,
	listAsignarTestigo,
} from "../../routes/asignaciontestigo";

import { AuthHeaders } from "../../components/authheader";
import { MostrarRol } from "../../components/decodec";

export const CreateAsignarTestigo = () => {
	const navigate = useNavigate();

	const [valoresForm, setValoresForm] = useState({});

	const [validated, setValidated] = useState(false);

	const [errors, setErrors] = useState({});

	const [lugares, setLugares] = useState([]);
	const [testigos, setTestigos] = useState([]);
	const [numMesas, setNumMesas] = useState([]);
	const [mesasAsignadas, setMesasAsignadas] = useState([]);
	const [mesasDisponibles, setMesasDisponibles] = useState([]);

	let userToken = MostrarRol();

	let userRol = userToken.rol;

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
		const { polling, witness, numberPolling } = valoresForm;
		const newErrors = {};

		if (!polling || polling === "") newErrors.polling = "cannot be blank!";

		if (!witness || witness === "") newErrors.witness = "cannot be blank!";

		if (!numberPolling || numberPolling === "") {
			newErrors.numberPolling = "cannot be blank!";
		}
		return newErrors;
	};

	const {
		polling = "",
		witness = "",
		numberPolling = "",
		status = "Asignada",
	} = valoresForm;

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
			const asignarLugar = {
				polling,
				witness,
				numberPolling,
				status,
			};
			Swal.fire({
				title: "Desea Asiganar el testigo al lugar de Votación? ",
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
						data = await createAsignarTestigo(asignarLugar, authheader);
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
							navigate("/asignartestigo");
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
								navigate("/asignartestigo");
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
							navigate("/asignartestigo");
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
			const mostrarTestigos = async () => {
				const { data } = await listTestigos(authheader);
				setTestigos(data);
			};
			mostrarTestigos();
		}
	}, [testigos]);

	useEffect(() => {
		const authheader = AuthHeaders();
		const vacio = localStorage.getItem("Authorization");
		if (vacio != null) {
			const mostrarAsignacion = async () => {
				const { data } = await listAsignarTestigo(authheader);
				const datosPolling = data.filter(
					(datop) => datop.polling._id === polling
				);
				const datos = datosPolling.filter((dato) => dato.status === "Asignada");
				setMesasAsignadas(datos);
			};
			mostrarAsignacion();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [polling]);

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

	useEffect(() => {
		const CantMesas = async () => {
			let cantMesas = 0;
			let lugar = await getLugar(polling);
			if (lugar) cantMesas = lugar.data.numberPollingStation;

			var newArray = [];
			for (var i = 1; i <= cantMesas; i++) {
				newArray.push(i);
			}
			setNumMesas(newArray);
		};
		if (polling !== "") {
			CantMesas();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [polling]);

	useEffect(() => {
		if (polling !== "") {
			const filtrarMesas = () => {
				let mesas = mesasAsignadas.map((dato) => dato.numberPolling);
				let filtro = numMesas.filter((p) => !mesas.includes(p));
				setMesasDisponibles(filtro);
			};
			filtrarMesas();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [polling]);

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
								id="polling"
							>
								<option>Open this select menu</option>
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
						<Form.Group as={Col} controlId="formGridwitness">
							<Form.Label>Testigo Asignado</Form.Label>
							<Form.Select
								value={witness}
								name="witness"
								onChange={(e) => handleOnChange(e)}
							>
								<option>Open this select menu</option>
								{testigos.map((dato) => (
									<option key={dato._id} value={dato._id}>
										{dato.firstName} {dato.firstSurname}
									</option>
								))}
							</Form.Select>
							<Form.Control.Feedback type="invalid">
								{errors.witness}
							</Form.Control.Feedback>
						</Form.Group>
					</Row>
					<Row className="mb-3">
						<Form.Group as={Col} controlId="formGridAddress">
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
								{mesasDisponibles.map((dato) => (
									<option key={dato} value={dato}>
										{dato}
									</option>
								))}
							</Form.Select>
							<Form.Control.Feedback type="invalid">
								{errors.numberPolling}
							</Form.Control.Feedback>
						</Form.Group>
					</Row>
					<Row className="mb-3">
						<Form.Group
							as={Col}
							controlId="formGridDepartment"
							className="oculto"
						>
							<Form.Label>Estado</Form.Label>
							<Form.Control
								type="text"
								placeholder="Estado"
								name="status"
								value={status}
								disabled
							/>
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
