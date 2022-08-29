import axios from "axios";
import url from "../utils/url";

export function allOrders(){
    return axios.get(url.order);
}