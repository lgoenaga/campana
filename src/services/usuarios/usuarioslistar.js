import { useState, useEffect } from "react";
import { listUsuarios } from "../../routes/usuarios";
import { AuthHeaders } from "../../components/authheader";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import TableUsuarios from "./usuariostable";
import Button from "react-bootstrap/Button";

export const ListUsuarios = () => {
	const [usuarios, setUsuarios] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [pageActual, setPageActual] = useState(1);

	const navigate = useNavigate();

	useEffect(() => {
		const authheader = AuthHeaders();
		const vacio = localStorage.getItem("Authorization");
		if (vacio != null) {
			const mostrarUsuarios = async () => {
				try {
					let { data } = await listUsuarios(authheader);
					setUsuarios(data);
				} catch (error) {
					const request = Object.values(error);
					const message = request[2];
					const respuesta = message.data.status.error.httpCode;
					const mensaje = message.data.status.error.messages[0];
					const txt =
						respuesta + ", " + mensaje + ": " + message.data.status.error.code;
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
					}, 1000);
				}
			};

			Swal.fire({
				icon: "info",
				title: "Listando usuarios",
				showConfirmButton: false,
				timer: 1000,
				didOpen: () => {
					Swal.showLoading();
				},
			});
			setTimeout(() => {
				Swal.close();
				mostrarUsuarios();
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
	}, [navigate]);


	const noItem = 12;
	const btnnext = document.getElementById("btn-next");
	const btnpreview = document.getElementById("btn-preview");
	let page = usuarios.length / noItem;

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

		return usuarios
			.map((res, i) => {
				res.noReg = noReg++;

				return <TableUsuarios obj={res} key={i} />;
			})
			.slice(currentPage, currentPage + noItem);
	};

	const pageHome = () => {
		navigate("/inicio");
	};
		const nuevo = () => {
			navigate("/usuarios/crear");
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
			<table className="table border-primary  table-hover">
				<thead className="table-group-divider">
					<tr className="table-usuarios">
						<th scope="col">#</th>
						<th scope="col">Usuario</th>
						<th scope="col">Rol</th>
						<th scope="col">Estado</th>
						<th scope="col">Acción</th>
					</tr>
				</thead>
				<tbody className="table-group-divider">{DataTable()}</tbody>
			</table>
			<div className="btninicio">
				<Button variant="primary" onClick={pageHome}>
					INICIO
				</Button>
				<Button className="Nuevo" variant="primary" onClick={nuevo}>
					NUEVO
				</Button>
			</div>
		</div>
	);
};
