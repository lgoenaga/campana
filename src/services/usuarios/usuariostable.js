import React from "react";
import Button from "react-bootstrap/Button";

import { useNavigate } from "react-router-dom";

import { BsFillPenFill, BsFillTrashFill } from "react-icons/bs";
import { deleteUsuario } from "../../routes/usuarios";
import { AuthHeaders } from "../../components/authheader";

import Swal from "sweetalert2";
import { MostrarRol } from "../../components/decodec";
let userToken = MostrarRol();

let userRol = userToken.rol;
let userUser = userToken.user;

const TableUsuarios = (props) => {
	const { noReg, user, rol, estado } = props.obj;

	const navigate = useNavigate();

	const borrarUsuario = async () => {
		if (userRol === "Administrador") {
			Swal.fire({
				title: "Desea eliminar el usuario? ",
				html: "Deleting will be canceled in 10 <strong></strong> seconds.",
				timer: 10000,
				timerProgressBar: true,
				showDenyButton: true,
				showConfirmButton: true,
				confirmButtonText: "Delete",
				denyButtonText: "Not delete",
			}).then(async (result) => {
				try {
					if (
						result.isConfirmed &&
						user !== "administrador" &&
						user !== userUser
					) {
						const authheader = AuthHeaders();
						await deleteUsuario(user, authheader);

						Swal.fire({
							icon: "success",
							title: "Usuario Eliminado",
							showConfirmButton: false,
							timer: 2000,
							didOpen: () => {
								Swal.showLoading();
							},
						});
						setTimeout(() => {
							Swal.close();
							window.location.reload();
						}, 2000);
					} else {
						if (result.isDenied) {
							Swal.fire({
								icon: "info",
								title: "Usuario no ha sido Eliminado",
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
							Swal.fire({
								icon: "warning",
								title: "Usuario no se puede Eliminar",
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
					mensaje = error.response.data;

					Swal.fire({
						icon: "error",
						title: mensaje,
						showConfirmButton: false,
						timer: 2000,
					});
					Swal.showLoading();
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
	};

	return (
		<>
			<tr className="fila-contactos">
				<td className="dato-contacto">{noReg}</td>
				<td className="dato-contacto">{user}</td>
				<td className="dato-contacto">{rol}</td>
				<td className="dato-contacto">{estado}</td>

				<td className="dato-contacto">
					<Button
						className="botones-mod"
						variant="btn btn-outline-info"
						onClick={() => navigate(`/usuarios/${user}`)}
					>
						<BsFillPenFill />
					</Button>
					<Button
						variant="btn btn-outline-danger"
						onClick={borrarUsuario}
						className="botones-mod"
					>
						<BsFillTrashFill />
					</Button>
				</td>
			</tr>
		</>
	);
};

export default TableUsuarios;
