import React from "react";
import Button from "react-bootstrap/Button";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { BsFillPenFill, BsFillTrashFill } from "react-icons/bs";
import { deleteLugar } from "../../routes/lugarvotacion";

import { AuthHeaders } from "../../components/authheader";
import { MostrarRol } from "../../components/decodec";
let userToken = MostrarRol();

let userRol = userToken.rol;

const TableLugares = (props) => {
 
	const {
		noReg,
		_id,
		pollingStation,
		address,
		numberPollingStation,
		availablePollingStation,
		unavailablePollingStation,
	} = props.obj;

	const navigate = useNavigate();

	const borrarLugar = async () => {
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
					if (result.isConfirmed) {
						const authheader = AuthHeaders();
						await deleteLugar(_id, authheader);

						Swal.fire({
							icon: "success",
							title: "Lugar Eliminado",
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
								title: "Lugar no ha sido Eliminado",
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
			<tr className="fila-contactos">
				<td className="dato-contacto">{noReg}</td>
				<td className="dato-contacto">{pollingStation}</td>
				<td className="dato-contacto">{address}</td>
				<td className="dato-contacto">{numberPollingStation}</td>
				<td className="dato-contacto">{availablePollingStation}</td>
				<td className="dato-contacto">{unavailablePollingStation}</td>

				<td className="dato-contacto">
       
					<Button
						className="botones-mod"
						variant="btn btn-outline-info"
						onClick={() => navigate(`/lugares/${_id}`)}
					>
						<BsFillPenFill />
					</Button>
					<Button
						variant="btn btn-outline-danger"
						onClick={borrarLugar}
						className="botones-mod"
					>
						<BsFillTrashFill />
					</Button>
				</td>
			</tr>
		</>
	);
};

export default TableLugares;
