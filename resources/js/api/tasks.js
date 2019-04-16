import axios from "axios";
import {headers} from "./headers";

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