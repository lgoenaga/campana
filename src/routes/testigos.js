import { Axios } from "../helpers/axios.config";

export const listTestigos = (authheader) => {
  return Axios.get("testigos", authheader);
};

export const createTestigo = (data, authheader) => {
  return Axios.post("testigos/crear", data, authheader);
};

export const deleteTestigo = (identification, authheader) => {
  return Axios.delete(`testigos/${identification}`, authheader);
};

export const updateTestigo = (identification, data, authheader) => {
  return Axios.put(`testigos/${identification}`, data, authheader);
};

export const getTestigo = (documentoId) => {
  return Axios.get(`testigos/${documentoId}`);
};
