import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import Swal from "sweetalert2";

import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";

import { updateUsuario, getUsuario } from "../../routes/usuarios";
import { AuthHeaders } from "../../components/authheader";
import { MostrarRol } from "../../components/decodec";

export const UpdateRegistroUsuario = () => {
	const navigate = useNavigate();
	const [validated, setValidated] = useState(false);
	const { userLogin } = useParams();

	const [valoresForm, setValoresForm] = useState({});

	const [usuario, setUsuario] = useState({});
	const [errors, setErrors] = useState({});

	const { user = "", password = "", rol = "", estado = "" } = valoresForm;

	let userToken = MostrarRol();

	let userRol = userToken.rol;
	let userUser = userToken.user;

	const findFormErrors = () => {
		const { user, password, rol, estado } = valoresForm;
		const newErrors = {};

		if (!user || user === "") newErrors.name = "cannot be blank!";

		if (!rol || rol === "") newErrors.rol = "select a rol!";

		if (!password || password === "") {
			newErrors.password = "cannot be blank!";
		} else {
			if (password.length <= 4)
				newErrors.password = "Password too short! Minimum 4 characters";
		}

		if (!estado || estado === "") newErrors.estado = "select a state!";

		return newErrors;
	};

	useEffect(() => {
		if (userRol === "Administrador") {
			const mostrarusuario = async () => {
				try {
					const { data } = await getUsuario(userLogin);
					setUsuario(data);
				} catch (error) {
					Swal.fire({
						icon: "warning",
						title: "Usuario no existe",
						showConfirmButton: false,
						timer: 2000,
						didOpen: () => {
							Swal.showLoading();
						},
					});
					setTimeout(() => {
						Swal.close();
						navigate("/usuarios");
					}, 1000);
				}
			};

			Swal.fire({
				icon: "info",
				title: "Actualizar Usuario",
				showConfirmButton: false,
				timer: 1000,
				didOpen: () => {
					Swal.showLoading();
				},
			});
			setTimeout(() => {
				Swal.close();
				mostrarusuario();
			}, 1000);
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
	}, [navigate, userLogin, userRol]);

	useEffect(() => {
		setValoresForm({
			user: usuario.user,
			password: "",
			rol: usuario.rol,
			estado: usuario.estado,
		});
	}, [usuario]);

	const handleOnChange = ({ target }) => {
		const { name, value } = target;
		setValoresForm({ ...valoresForm, [name]: value });
	};

	const handleOnSubmit = async (event) => {
		event.preventDefault();

		const form = event.currentTarget;
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
		}else{
					let timerInterval;

					const usuario = {
						user,
						password,
						rol,
						estado,
					};
					if (user !== "administrador" || userUser === "administrador") {
						Swal.fire({
							title: "Desea Actualizar el usuario? ",

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
									data = await updateUsuario(userLogin, usuario, authheader);
									Swal.fire({
										icon: "success",
										title: "Usuario Actualizado",
										showConfirmButton: false,
										timer: 2000,
										didOpen: () => {
											Swal.showLoading();
										},
									});
									setTimeout(() => {
										Swal.close();
										navigate("/usuarios");
									}, 2000);
								} else {
									if (result.isDenied) {
										Swal.fire({
											icon: "info",
											title: "Usuario no ha sido actualizado",
											showConfirmButton: false,
											timer: 2000,
											didOpen: () => {
												Swal.showLoading();
												navigate("/usuarios");
											},
										});
										setTimeout(() => {
											Swal.close();
											navigate("/usuarios");
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
										navigate("/usuarios");
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
		}
	


	};

	const pageHome = () => {
		navigate("/inicio");
	};

	return (
		<>
			<Container className="contenedor-usuarios container-fluid">
				<Form
					noValidate
					validated={validated}
					onSubmit={(e) => handleOnSubmit(e)}
				>
					<Form.Group className="mb-3" controlId="formBasicText">
						<Form.Label>Usuario</Form.Label>
						<Form.Control
							type="text"
							placeholder="Entrar Usuario"
							name="user"
							value={user}
							onChange={(e) => handleOnChange(e)}
							required
						/>
						<Form.Control.Feedback type="invalid">
							{errors.name}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter new password"
							name="password"
							value={password}
							minLength="6"
							onChange={(e) => handleOnChange(e)}
							required
						/>
						<Form.Control.Feedback type="invalid">
							{errors.password}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Text className="text-muted">
						Never share your password with anyone.
					</Form.Text>
					<Form.Group className="mb-3" controlId="formBasicRol">
						<Form.Label>Rol</Form.Label>
						<select
							className="form-select"
							name="rol"
							required
							value={rol}
							onChange={(e) => handleOnChange(e)}
						>
							<option value=""> Open this select menu</option>
							<option value="Administrador">Administrador</option>
							<option value="Consultor">Consultor</option>
							<option value="Operador">Operador</option>
						</select>
						<Form.Control.Feedback type="invalid">
							{errors.rol}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicEstado">
						<Form.Label>State</Form.Label>
						<select
							className="form-select"
							name="estado"
							required
							value={estado}
							onChange={(e) => handleOnChange(e)}
						>
							<option value=""> Open this select menu</option>
							<option value="Activo">Activo</option>
							<option value="Inactivo">Inactivo</option>
						</select>
						<Form.Control.Feedback type="invalid">
							{errors.estado}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="d-flex">
						<Button variant="primary" onClick={(e) => handleOnSubmit(e)}>
							Actualizar
						</Button>
					</Form.Group>
				</Form>
			</Container>
			<div className="btninicio">
				<Button variant="primary" onClick={pageHome}>
					INICIO
				</Button>
			</div>
		</>
	);
};
