import { useState, useEffect } from "react";
import { listAsignarContacto } from "../../routes/asignacioncontacto";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import TableAsignarContacto from "./asignacioncontactotable";
import { AuthHeaders } from "../../components/authheader";
import Button from "react-bootstrap/Button";

export const ListAsignarContacto = () => {
	const [asignarContactos, setAsignarContactos] = useState([]);
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(0);
	const [pageActual, setPageActual] = useState(1);

	useEffect(() => {
		try {
			const authheader = AuthHeaders();
			const vacio = localStorage.getItem("Authorization");
			if (vacio != null) {
				const mostrarAsignarContactos = async () => {
					try {
						const { data } = await listAsignarContacto(authheader);
						setAsignarContactos(data);

					} catch (error) {
						const request = Object.values(error);
						const message = request[2];
						const respuesta = message.data.status.error.httpCode;
						const mensaje = message.data.status.error.messages[0];
						const txt =
							respuesta +
							", " +
							mensaje +
							": " +
							message.data.status.error.code;
						Swal.fire({
							icon: "error",
							title: txt,
							showConfirmButton: false,
							didOpen: () => {
								Swal.showLoading();
							},
						});
						setTimeout(() => {
							Swal.close();
							navigate("/");
						}, 2000);
					}
				};
				Swal.fire({
					icon: "info",
					title: "Listando ciudadanos asignados",
					showConfirmButton: false,
					timer: 1000,
					didOpen: () => {
						Swal.showLoading();
					},
				});
				setTimeout(() => {
					Swal.close();
					mostrarAsignarContactos();
				}, 1000);
			} else {
				Swal.fire({
					icon: "error",
					title: "Usuario sin permisos",
					showConfirmButton: false,
					timer: 1000,
					didOpen: () => {
						Swal.showLoading();
					},
				});
				setTimeout(() => {
					Swal.close();
					navigate("/");
				}, 1000);
			}
		} catch (error) {
			console.log(
				"Error desde el servidor verificar backend  listar usuarios",
				error
			);
		}
	}, [navigate]);

	const btnnext = document.getElementById("btn-next");
	const btnpreview = document.getElementById("btn-preview");
	let page = asignarContactos.length / 12;

	if (page - Math.trunc(page) > 0) {
		page = Math.trunc(page) + 1;
	}

	const nextPage = () => {
		if (page > pageActual) {
			setPageActual(pageActual + 1);
			setCurrentPage(currentPage + 12);
			btnpreview.disabled = false;
			btnnext.disabled = false;
		} else {
			btnnext.disabled = true;
			btnpreview.disabled = false;
		}
	};

	const previewPage = () => {
		if (pageActual > 1) {
			setPageActual(pageActual - 1);
			setCurrentPage(currentPage - 12);
			btnnext.disabled = false;
			btnpreview.disabled = false;
		} else {
			btnnext.disabled = false;
			btnpreview.disabled = true;
		}
	};

	const pageHome = () => {
		navigate("/inicio");
	};

		const DataTable = () => {
			let noReg = 1;
			return asignarContactos.map((res, i) => {
				res.noReg = noReg++;
				return <TableAsignarContacto obj={res} key={i} />;
			});
		};


	return (
		<div>
			<div className="paginacion">
				<button
					className="btn btn-primary btn-preview"
					id="btn-preview"
					onClick={previewPage}
				>
					preview
				</button>
				&nbsp;
				<p>
					Pagina {pageActual} de {page}
				</p>
				&nbsp;
				<button className="btn btn-primary" id="btn-next" onClick={nextPage}>
					next
				</button>
			</div>
			<table className="table border-primary table-hover">
				<thead className="table-group-divider">
					<tr className="table-contactoxlugar ">
						<th scope="col" className="col-contactos">
							#
						</th>
						<th scope="col" className="col-contactos">
							Lugar de Votación
						</th>
						<th scope="col" className="col-contactos">
							Ciudadano Nombre
						</th>
						<th scope="col" className="col-contactos">
							Ciudadano Apellido
						</th>
						<th scope="col" className="col-contactos">
							Mesa Asignada
						</th>
						<th scope="col" className="col-contactos">
							Acción
						</th>
					</tr>
				</thead>
				<tbody className="table-group-divider">{DataTable()}</tbody>
			</table>
			<div className="btninicio">
				<Button variant="primary" onClick={pageHome}>
					INICIO
				</Button>
			</div>
		</div>
	);
};
