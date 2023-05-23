import { AuthHeaders } from "./authheader";
import jwt_decode from "jwt-decode";

export const MostrarRol = () => {

    const authheader= AuthHeaders();
    let decoded ={};


    try {
        if (authheader){
            let token = localStorage.getItem(
                "Authorization"
              );
            decoded = jwt_decode(token);

        }
    } catch (error) {
        decoded = {};
    } finally{
        return decoded;
    }    

}