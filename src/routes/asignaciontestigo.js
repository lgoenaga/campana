import { Axios } from "../helpers/axios.config";

export const listAsignarTestigo = (authheader) => {
	return Axios.get("asignartestigo", authheader);
};

export const createAsignarTestigo = (data, authheader) => {
	return Axios.post("asignartestigo/crear", data, authheader);
};

export const deleteAsignarTestigo = (id, authheader) => {
	return Axios.delete(`asignartestigo/${id}`, authheader);
};

export const updateAsignarTestigo = (id, data, authheader) => {
	return Axios.put(`asignartestigo/${id}`, data, authheader);
};

export const getAsignarTestigo = (id) => {
	return Axios.get(`asignartestigo/${id}`);
};
