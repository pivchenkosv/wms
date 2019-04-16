import axios from "axios";
import {headers} from "./headers";

export const loadCellInfo = (cellId) => {
    return axios.get("/api/cellInfo", {
        params: {
            cellId: cellId,
        },
        headers: headers
    })
}

export const loadAvailableCells = () => {
    return axios.get("/api/fromCell", {
        headers: headers
    })
}

export const loadCells = () => {
    return axios.get('/api/cells',{
        headers: headers
    })
}

export const handleEditCell = (cell) => {
    const params = new URLSearchParams();
    if (cell.id !== 0)
        params.append('id', cell.id);
    params.append('volume', cell.volume);
    params.append('status', cell.status);
    params.append('stock_id', cell.stock_id)
    return axios.put('/api/editCell', params,{
        headers: headers
    })
}

export const handleDeleteCell = (id) => {
    return axios.delete(`/api/delCell/${id}`, {
        headers: headers
    })
}