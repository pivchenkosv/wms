import axios from "axios/index";

const user = JSON.parse(localStorage.getItem('user'));
const authToken = user ? user.auth_token : null;
const headers = {'Authorization': 'Bearer' + authToken}

export const loginApi = (authParams) => {
    const params = new URLSearchParams();
    params.append('email', authParams.email);
    params.append('password', authParams.password);
    return axios.post('api/login', params);
}

export const logoutApi = (token) => {
    const params = new URLSearchParams();
    params.append('token', authToken);
    return axios.post('/api/logout', params)
}

export const resetPasswordApi = (email) => {
    const params = new URLSearchParams();
    params.append('email', email);
    return axios.post('/api/password/email', params, {
        headers: headers
    })
}

export const submitPasswordReset = (data) => {
    const params = new URLSearchParams();
    params.append('token', data.token);
    params.append('email', data.email);
    params.append('password', data.password);
    params.append('password_confirmation', data.passwordConfirmation);
    return axios.post('/api/password/reset', params, {
        headers: headers
    })
}

