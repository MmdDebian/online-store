import axios from "axios";
import url from '../utils/url';
const token = localStorage.getItem('token');

// set default axios header 
axios.defaults.headers.common = {'x-auth-token' : token};

export function getUser(){
    return axios.get(url.profile);
}

export function getAllUsers(){
    return axios.get(url.users)
}