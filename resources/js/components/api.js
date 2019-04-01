import axios from "axios";

//Cells
export const loadCellInfo = (cellId) => {
    return axios.get("/api/cellInfo", {
        params: {
            cellId: cellId,
        }
    })
}

export const loadAvailableCells = () => {
    return axios.get("/api/fromCell")
}

export const loadCells = () => {
    return axios.get('/api/cells')
}

export const handleEditCell = (cell) => {
    const params = new URLSearchParams();
    if (cell.id !== 0)
        params.append('id', cell.id);
    params.append('volume', cell.volume);
    params.append('status', cell.status);
    params.append('stock_id', cell.stock_id)
    return axios.put('/api/editCell', params)
}

export const handleDeleteCell = (id) => {
    return axios.delete(`/api/delCell/${id}`)
}

//Stocks
export const loadStocks = () => {
    return axios.get('/api/stocks')
}

export const handleEditStock = (stock) => {
    const params = new URLSearchParams();
    if (stock.id !== 0)
        params.append('id', stock.id);
    params.append('location', stock.location);
    return axios.put('/api/editStock', params)
}

export const handleDeleteStock = (id) => {
    return axios.delete(`/api/delStock/${id}`)
}

//Products
export const loadProducts = () => {
    return axios.get("/api/products")
}

export const handleEditProduct = (product) => {
    const params = new URLSearchParams();
    if (product.id !== 0)
        params.append('id', product.id);
    params.append('name', product.name);
    params.append('description', product.description);
    params.append('volume', product.volume)
    return axios.put('/api/editProduct', params)
}

export const handleDeleteProduct = (product) => {
    const params = new URLSearchParams();
    params.append('id', product.id);
    return axios.delete(`/api/delProduct/${product.id}`)
}

//Reports
export const loadReports = (page) => {
    return axios.get(`/api/reports?page=${page}`)
}

//Tasks
export const loadTasks = () => {
    return axios.get('/api/tasks')
}

export const getSubtasks = (id) => {
    return axios.get("/api/taskInfo", {
        params: {
            taskId: id,
        }
    })
}

export const handleDeleteTask = (id) => {
    return axios.delete(`/api/delTask/${id}`)
}

export const handleCompleteTask = (id) => {
    const params = new URLSearchParams();
    params.append('id', id)
    return axios.post('/api/completeTask', params)
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

    return axios.put('api/editTask', params)
}

export const loginApi = (authParams) => {
    const params = new URLSearchParams();
    params.append('email', authParams.email);
    params.append('password', authParams.password);
    params.append('_token', $('meta[name="csrf-token"]').attr('content'));
    return axios.post('api/login', params, {
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}
    });
}

export const logoutApi = (token) => {
    const params = new URLSearchParams();
    params.append('_token', $('meta[name="csrf-token"]').attr('content'));
    return axios.post('/api/logout', params)
}

export const resetPasswordApi = (email) => {
    const params = new URLSearchParams();
    params.append('email', email);
    return axios.post('/api/password/email', params)
}

export const submitPasswordReset = (data) => {
    const params = new URLSearchParams();
    params.append('token', data.token);
    params.append('email', data.email);
    params.append('password', data.password);
    params.append('password_confirmation', data.passwordConfirmation);
    return axios.post('/api/password/reset', params)
}

export const usersApi = () => {
    return axios.get('/api/admin/users')
}
