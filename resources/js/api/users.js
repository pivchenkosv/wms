import axios from "axios";
import {headers} from "./headers";

export function loadUsersRating() {
    return axios.get('/api/users/rating', {
        headers: headers
    })
}


export const usersApi = () => {
    return axios.get('/api/admin/users', {
        headers: headers
    })
}

export const getUser = () => {
    return axios.get('/api/user', {
        headers: headers
    })
}

export const handleCreateUser = (userInfo) => {
    const params = new URLSearchParams();
    if (userInfo.id !== null)
        params.append('id', userInfo.id);
    params.append('name', userInfo.name);
    params.append('email', userInfo.email);
    params.append('role', userInfo.role);
    params.append('password', '12345678');
    params.append('password_confirmation', '12345678');
    return axios.post('/api/register', params, {
        headers: headers
    })
}

export const handleDeleteUser = (id) => {

    return axios.delete(`/api/deleteUser/${id}`, {
        headers: headers
    })

}