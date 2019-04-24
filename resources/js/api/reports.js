import axios from "axios";
import {headers} from "./headers";

export const loadReports = (page) => {
    return axios.get(`/api/reports?page=${page}`, {
        headers: headers
    })
}