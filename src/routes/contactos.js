import { Axios } from "../helpers/axios.config";

export const listCiudadanos = (authheader) => {
  return Axios.get("contactos", authheader);
};

export const createCiudadano = (data, authheader) => {
  return Axios.post("contactos/crear", data, authheader);
};

export const deleteCiudadano = (identification, authheader) => {
  return Axios.delete(`contactos/${identification}`, authheader);
};

export const updateCiudadano = (identification, data, authheader) => {
  return Axios.put(`contactos/${identification}`, data, authheader);
};

export const getCiudadano = (documentoId) => {
  return Axios.get(`contactos/${documentoId}`);
};
