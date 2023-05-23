import { Axios } from "../helpers/axios.config";

export const listLugares = (authheader) => {
	return Axios.get("lugares", authheader);
};

export const createLugar = (data, authheader) => {
	return Axios.post("lugares/crear", data, authheader);
};

export const deleteLugar = (id, authheader) => {
	return Axios.delete(`lugares/${id}`, authheader);
};

export const updateLugar = (id, data, authheader) => {
	return Axios.put(`lugares/${id}`, data, authheader);
};

export const getLugar = (id) => {
	return Axios.get(`lugares/${id}`);
};
