import axios from "axios";
import url from "../utils/url";


export function allProducts(){
    return axios.get(url.product);
}