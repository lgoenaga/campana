import { Axios } from "../helpers/axios.config";

export const listUsuarios = (authheader) => {
  return Axios.get("usuarios", authheader);
};

export const createUsuario = (data, authheader) => {
  return Axios.post("usuarios/crear", data, authheader);
};

export const deleteUsuario = (user, authheader) => {
  return Axios.delete(`usuarios/${user}`, authheader);
};

export const updateUsuario = (userLogin, data, authheader) => {
  return Axios.put(`usuarios/${userLogin}`, data, authheader);
};

export const getUsuario = (user) => {
  return Axios.get(`usuarios/${user}`);
};
