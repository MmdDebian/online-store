import axios from "axios";
import url from "../utils/url";

export function allOrders(){
    return axios.get(url.order);
}

export async function addOrder(productId , quantity){
    const response = await axios.post(url.order + `/${productId}` , {
        quantity : quantity        
    });

    if(!response){
        return null ;
    }

    return response.data
}