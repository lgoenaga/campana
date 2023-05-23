import React from "react";
import Button from "react-bootstrap/Button";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { BsFillTrashFill } from "react-icons/bs";
import { deleteAsignarTestigo } from "../../routes/asignaciontestigo";

import { AuthHeaders } from "../../components/authheader";
import { MostrarRol } from "../../components/decodec";
let userToken = MostrarRol();

let userRol = userToken.rol;

const TableAsignarTestigo = (props) => {
	const {
		noReg,
		_id,
		polling,
		witness,
		numberPolling,

	} = props.obj;

	const navigate = useNavigate();

	const borrarAsignarTestigo = async () => {
		if (userRol === "Administrador") {
			Swal.fire({
				title: "Desea eliminar la asignación? ",
				html: "Deleting will be canceled in 10 <strong></strong> seconds.",
				timer: 10000,
				timerProgressBar: true,
				showDenyButton: true,
				showConfirmButton: true,
				confirmButtonText: "Delete",
				denyButtonText: "Not delete",
			}).then(async (result) => {
				try {
					if (result.isConfirmed) {
						const authheader = AuthHeaders();
						await deleteAsignarTestigo(_id, authheader);

						Swal.fire({
							icon: "success",
							title: "Asignación Eliminada",
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
								title: "Asignación no ha sido Eliminada",
								showConfirmButton: false,
								timer: 2000,
								didOpen: () => {
									Swal.showLoading();
								},
							});
							setTimeout(() => {
								Swal.close();
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
			<tr className="fila-testigoxlugar">
				<td className="dato-contacto">{noReg}</td>
				<td className="dato-contacto">{polling.pollingStation}</td>
				<td className="dato-contacto">{witness.firstName}</td>
				<td className="dato-contacto">{witness.firstSurname}</td>
				<td className="dato-contacto">{numberPolling}</td>
				<td className="dato-contacto">
					<Button
						variant="btn btn-outline-danger"
						onClick={borrarAsignarTestigo}
						className="botones-mod"
					>
						<BsFillTrashFill />
					</Button>
				</td>
			</tr>
		</>
	);
};

export default TableAsignarTestigo;
