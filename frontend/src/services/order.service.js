import axios from "axios";
import url from "../utils/url";

const token = localStorage.getItem('token');
axios.defaults.headers.common = {'x-auth-token' : token};

export function allOrders(){
    return axios.get(url.order);
}

export function addOrder(productId , quantity){
    return axios.post(url.order + `/${productId}` , {
        quantity : quantity        
    });
}

export function deleteOrder(id){
    return axios.delete(url.order + `/${id}`);
}