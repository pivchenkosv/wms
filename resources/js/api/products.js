import axios from "axios";
import {headers} from "./headers";

export function loadProductsReport() {
    return axios.get("/api/products/report", {
        headers: headers
    })
}


export const loadProducts = () => {
    return axios.get("/api/products", {
        headers: headers
    })
}

export const loadProductInfo = (productId) => {
    return axios.get(`/api/products/${productId}`, {
        headers: headers
    })
}

export const handleEditProduct = (product) => {
    const params = new URLSearchParams();
    if (product.id !== 0)
        params.append('id', product.id);
    params.append('name', product.name);
    params.append('description', product.description);
    params.append('volume', product.volume)
    return axios.put('/api/editProduct', params, {
        headers: headers
    })
}

export const handleDeleteProduct = (product) => {
    const params = new URLSearchParams();
    params.append('id', product.id);
    return axios.delete(`/api/delProduct/${product.id}`, {
        headers: headers
    })
}