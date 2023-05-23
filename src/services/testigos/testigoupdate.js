import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import Swal from "sweetalert2";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { updateTestigo, getTestigo } from "../../routes/testigos";

import { AuthHeaders } from "../../components/authheader";
import { MostrarRol } from "../../components/decodec";

export const UpdateTestigo = () => {
	const navigate = useNavigate();
	const { documentoId } = useParams();

	const [valoresForm, setValoresForm] = useState({});

	const [testigo, setTestigo] = useState({});
	const [validated, setValidated] = useState(false);

	const [errors, setErrors] = useState({});
	let userToken = MostrarRol();

	let userRol = userToken.rol;
	const {
		identification = "",
		firstName = "",
		secondName = "",
		firstSurname = "",
		secondSurname = "",
		dateBirth = "",
		cellPhone = "",
		phone = "",
		email = "",
		address = "",
	} = valoresForm;

	useEffect(() => {
		if (userRol === "Administrador" || userRol === "Operador") {
			const mostrartestigo = async () => {
				try {
					const { data } = await getTestigo(documentoId);
					setTestigo(data);
				} catch (error) {
					console.log("Testigo no existe");
				}
			};

			Swal.fire({
				icon: "info",
				title: "Actualizar Testigo",
				showConfirmButton: false,
				timer: 2000,
				didOpen: () => {
					Swal.showLoading();
					mostrartestigo();
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
	}, [documentoId, navigate, userRol]);

	useEffect(() => {
		setValoresForm({
			identification: testigo.identification,
			firstName: testigo.firstName,
			secondName: testigo.secondName,
			firstSurname: testigo.firstSurname,
			secondSurname: testigo.secondSurname,
			dateBirth: testigo.dateBirth,
			cellPhone: testigo.cellPhone,
			phone: testigo.phone,
			email: testigo.email,
			address: testigo.address,
		});
	}, [testigo]);

	const findFormErrors = () => {
		const { identification, firstName, firstSurname, cellPhone, email } =
			valoresForm;
		const newErrors = {};

		if (!identification || identification === "")
			newErrors.identification = "cannot be blank!";

		if (!firstName || firstName === "") {
			newErrors.firstName = "cannot be blank!";
		}

		if (!firstSurname || firstSurname === "") {
			newErrors.firstSurname = "cannot be blank!";
		}

		if (!cellPhone || cellPhone === "") {
			newErrors.cellPhone = "cannot be blank!";
		} else {
			if (cellPhone.length < 10)
				newErrors.cellPhone = "CellPhone too short! Minimum 10 numeros";
		}

		if (!email || email === "") {
			newErrors.email = "cannot be blank!";
		} else {
			if (email.length < 6) newErrors.email = "wrong mail format!";
		}

		return newErrors;
	};

	const handleOnChange = ({ target }) => {
		const { name, value } = target;
		setValoresForm({ ...valoresForm, [name]: value });
	};

	const handleOnSubmit = async (event) => {
		const form = event.currentTarget;
		const testigo = {
			identification,
			firstName,
			secondName,
			firstSurname,
			secondSurname,
			dateBirth,
			cellPhone,
			phone,
			email,
			address,
		};

		if (form.checkValidity() === false) {
			event.preventDefault();
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
			Swal.fire({
				title: "Desea Actualizar el Testigo? ",
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
						data = await updateTestigo(documentoId, testigo, authheader);
						Swal.fire({
							icon: "success",
							title: "Testigo Actualizado",
							showConfirmButton: false,
							didOpen: () => {
								Swal.showLoading();
							},
						});
						setTimeout(() => {
							Swal.close();
							navigate("/testigos");
						}, 2000);
					} else {
						if (result.isDenied) {
							Swal.fire({
								icon: "info",
								title: "Testigo no ha sido actualizado",
								showConfirmButton: false,
								didOpen: () => {
									Swal.showLoading();
								},
							});
							setTimeout(() => {
								Swal.close();
								navigate("/testigos");
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
							navigate("/testigos");
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
						<Form.Group as={Col} controlId="formGridCedula">
							<Form.Label>Cédula</Form.Label>
							<Form.Control
								type="text"
								placeholder="Entrar Cédula"
								name="identification"
								value={identification}
								onChange={(e) => handleOnChange(e)}
								required
							/>
							<Form.Control.Feedback type="invalid">
								{errors.identification}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group as={Col} controlId="formGridBirthDate">
							<Form.Label>Fecha de Nacimiento</Form.Label>
							<Form.Control
								type="date"
								placeholder="Fecha de Nacimiento"
								name="dateBirth"
								value={dateBirth}
								onChange={(e) => handleOnChange(e)}
							/>
						</Form.Group>
					</Row>
					<Row className="mb-3">
						<Form.Group as={Col} controlId="formGridFirstName">
							<Form.Label>Primer Nombre</Form.Label>
							<Form.Control
								type="text"
								placeholder="Primer Nombre"
								name="firstName"
								value={firstName}
								onChange={(e) => handleOnChange(e)}
								required
							/>
							<Form.Control.Feedback type="invalid">
								{errors.firstName}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group as={Col} controlId="formGridSecondName">
							<Form.Label>Segundo Nombre</Form.Label>
							<Form.Control
								type="text"
								placeholder="Segundo Nombre"
								name="secondName"
								value={secondName}
								onChange={(e) => handleOnChange(e)}
							/>
						</Form.Group>
					</Row>
					<Row className="mb-3">
						<Form.Group as={Col} controlId="formGridFisrtSurname">
							<Form.Label>Primer Apellido</Form.Label>
							<Form.Control
								type="text"
								placeholder="Primer Apellido"
								name="firstSurname"
								value={firstSurname}
								onChange={(e) => handleOnChange(e)}
								required
							/>
							<Form.Control.Feedback type="invalid">
								{errors.firstSurname}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group as={Col} controlId="formGridSecondSurname">
							<Form.Label>Segundo Apellido</Form.Label>
							<Form.Control
								type="text"
								placeholder="Segundo Apellido"
								name="secondSurname"
								value={secondSurname}
								onChange={(e) => handleOnChange(e)}
							/>
						</Form.Group>
					</Row>
				</Form>
			</Container>
			<Container className="contenedorContactoUbicacion">
				<Form className="formDatosContacto" noValidate validated={validated}>
					<Form.Label>Datos de Contacto</Form.Label>
					<Row className="mb-3">
						<Form.Group as={Col} controlId="formGridCelular">
							<Form.Label>Teléfono celular</Form.Label>
							<Form.Control
								type="text"
								placeholder="Teléfono Celular"
								name="cellPhone"
								value={cellPhone}
								onChange={(e) => handleOnChange(e)}
								minLength="10"
								maxLength="10"
								required
							/>
						</Form.Group>
						<Form.Group as={Col} controlId="formGridTelefono">
							<Form.Label>Teléfono fijo</Form.Label>
							<Form.Control
								type="text"
								placeholder="Teléfono fijo"
								name="phone"
								value={phone}
								onChange={(e) => handleOnChange(e)}
							/>
						</Form.Group>
					</Row>
				</Form>
				<Form className="formDatosUbicacion" noValidate validated={validated}>
					<Form.Label>Datos de Ubicacion</Form.Label>
					<Row className="mb-3">
						<Form.Group as={Col} controlId="formGridEmail">
							<Form.Label>Correo electrónico</Form.Label>
							<Form.Control
								type="email"
								placeholder="Correo electrónico"
								name="email"
								value={email}
								onChange={(e) => handleOnChange(e)}
								required
							/>
							<Form.Control.Feedback type="invalid">
								{errors.email}
							</Form.Control.Feedback>
						</Form.Group>
					</Row>
					<Row className="mb-3">
						<Form.Group as={Col} controlId="formGridCelular">
							<Form.Label>Dirección</Form.Label>
							<Form.Control
								type="text"
								placeholder="Dirección"
								name="address"
								value={address}
								onChange={(e) => handleOnChange(e)}
							/>
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
