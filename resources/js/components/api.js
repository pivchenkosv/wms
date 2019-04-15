import axios from "axios";

const user = JSON.parse(localStorage.getItem('user'));
const authToken = user ? user.auth_token : null;
const headers = {'Authorization': 'Bearer' + authToken}


//Cells
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

//Stocks
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

//Products
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

//Reports
export const loadReports = (page) => {
    return axios.get(`/api/reports?page=${page}`, {
        headers: headers
    })
}

//Tasks
export const loadTasks = (action) => {
    return axios.get(`/api/tasks?page=${action.page}`, {
        headers: headers
    })
}

export const getSubtasks = (id) => {
    return axios.get("/api/taskInfo", {
        params: {
            taskId: id,
        },
        headers: headers
    })
}

export const handleDeleteTask = (id) => {
    return axios.delete(`/api/delTask/${id}`, {
        headers: headers
    })
}

export const handleCompleteTask = (id) => {
    const params = new URLSearchParams();
    params.append('id', id)
    return axios.post('/api/completeTask', params, {
        headers: headers
    })
}

export const handleCreateTask = (task, subtasks) => {
    const params = new URLSearchParams();
    if (task.id !== 0) {
        params.append('id', task.id);
    }
    params.append('assigned_user', task.assigned_user);
    params.append('description', task.description);

    let d = new Date(task.at);
    d.setHours(d.getHours() + 3);

    params.append('at', d.toISOString().slice(0, 19).replace('T', ' '));
    params.append('subtasks', JSON.stringify(subtasks))

    return axios.put('api/editTask', params, {
        headers: headers
    })
}

export const handleCreateTasks = (task, products) => {
    const params = new URLSearchParams();

    params.append('userIds', JSON.stringify(task.assigned_user));
    params.append('description', task.description);
    params.append('taskType', task.action);

    let d = new Date(task.at);
    d.setHours(d.getHours() + 3);

    params.append('at', d.toISOString().slice(0, 19).replace('T', ' '));
    params.append('products', JSON.stringify(products))

    return axios.post('api/createTasks', params, {
        headers: headers
    })
}

export const loginApi = (authParams) => {
    const params = new URLSearchParams();
    params.append('email', authParams.email);
    params.append('password', authParams.password);
    // params.append('_token', $('meta[name="csrf-token"]').attr('content'));
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

//Users
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
