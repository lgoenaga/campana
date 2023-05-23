import { useState, useEffect } from "react";
import { listCiudadanos } from "../../routes/contactos";
import TableContactos from "./contactostable";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import { AuthHeaders } from "../../components/authheader";
import Button from "react-bootstrap/Button";

export const ListCiudadanos = () => {
	const [ciudadanos, setCiudadanos] = useState([]);
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(0);
	const [pageActual, setPageActual] = useState(1);

	useEffect(() => {
		try {
			const authheader = AuthHeaders();
			const vacio = localStorage.getItem("Authorization");
			if (vacio != null) {
				const mostrarCiudadanos = async () => {
					try {
						const { data } = await listCiudadanos(authheader);
						setCiudadanos(data);
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
							timer: 2000,
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
				Swal.fire({
					icon: "info",
					title: "Listando contactos",
					showConfirmButton: false,
					timer: 1000,
					didOpen: () => {
						Swal.showLoading();
					},
				});
				setTimeout(() => {
					Swal.close();
					mostrarCiudadanos();
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

	const noItem = 12;
	const btnnext = document.getElementById("btn-next");
	const btnpreview = document.getElementById("btn-preview");
	let page = ciudadanos.length / noItem;
	console.log(page);

	if (page - Math.trunc(page) > 0) {
		page = Math.trunc(page) + 1;
	}

	const nextPage = () => {
		if (page > pageActual) {
			setPageActual(pageActual + 1);
			setCurrentPage(currentPage + noItem);
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
			setCurrentPage(currentPage - noItem);
			btnnext.disabled = false;
			btnpreview.disabled = false;
		} else {
			btnnext.disabled = false;
			btnpreview.disabled = true;
		}
	};

	const DataTable = () => {
		let noReg = 1;

		return ciudadanos
			.map((res, i) => {
				res.noReg = noReg++;
				return <TableContactos obj={res} key={i} />;
			})
			.slice(currentPage, currentPage + noItem);;
	};

	const pageHome = () => {
		navigate("/inicio");
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
					<tr className="table-ciudadanos">
						<th scope="col" className="col-contactos">
							#
						</th>
						<th scope="col" className="col-contactos">
							Identificacion
						</th>
						<th scope="col" className="col-contactos">
							Primer Nombre
						</th>
						<th scope="col" className="col-contactos">
							Primer Apellido
						</th>
						<th scope="col" className="col-contactos">
							Fecha Nacimiento
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
