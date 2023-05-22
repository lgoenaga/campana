import { Axios } from "../helpers/axios.config";

/*
export const listUsuarios= () => {
  return Axios.get("usuarios");
};

export const getUsuario = (user) => {
  return Axios.get(`usuarios/${user}`);
};*/

export const valiteUser = (data) =>{
  return Axios.post("login", data);
}