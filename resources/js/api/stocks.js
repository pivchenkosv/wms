import axios from "axios";
import {headers} from "./headers";

export const loadStocks = () => {
    return axios.get('/api/stocks', {
        headers: headers
    })
}

export const handleEditStock = (stock) => {
    const params = new URLSearchParams();
    if (stock.id !== 0)
        params.append('id', stock.id);
    params.append('location', stock.location);
    return axios.put('/api/editStock', params, {
        headers: headers
    })
}

export const handleDeleteStock = (id) => {
    return axios.delete(`/api/delStock/${id}`, {
        headers: headers
    })
}