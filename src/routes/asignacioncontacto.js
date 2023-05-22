import { Axios } from "../helpers/axios.config";

export const listAsignarContacto = (authheader) => {
	return Axios.get("asignarcontacto", authheader);
};

export const createAsignarContacto = (data, authheader) => {
	return Axios.post("asignarcontacto/crear", data, authheader);
};

export const deleteAsignarContacto = (id, authheader) => {
	return Axios.delete(`asignarcontacto/${id}`, authheader);
};

export const updateAsignarContacto = (id, data, authheader) => {
	return Axios.put(`asignarcontacto/${id}`, data, authheader);
};

export const getAsignarContacto = (id) => {
	return Axios.get(`asignarcontacto/${id}`);
};
