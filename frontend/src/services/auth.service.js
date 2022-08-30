import axios from "axios";
import url from "../utils/url";

export function register (name , email , password){
    return axios.post(url.auth + '/register' , {
        name :name , 
        email : email , 
        password : password
    });
}


export function login(email , password){
    return axios.post(url.auth + '/login' , {
        email : email , 
        password : password
    })
}
