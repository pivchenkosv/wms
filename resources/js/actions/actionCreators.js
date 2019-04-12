import {SET_TASK, UNSET_TASK} from "../types/task";

export const loginWatcher = (authParams) => {
    return {
        type: 'LOGIN_WATCHER',
        payload: authParams,
    };
}
export const logoutWatcher = (token) => {
    return {
        type: 'LOGOUT_WATCHER',
        payload: token,
    };
}
export const updateProfile = (profile) => {
    return {type: 'UPDATE_PROFILE', payload: profile};
}
export const setErrorMessage = (message) => {
    return {type: 'SET_MESSAGE', payload: message}
}
export const loadUsers = (users) => {
    return {type: 'LOAD_USERS', payload: users};
}
export const loadUsersWatcher = (resolve, reject) => {
    return {
        type: 'USERS_WATCHER',
        resolve: resolve,
        reject: reject
    }
}
export const loadTasksWatcher = (resolve, reject, page) => {
    return {
        type: 'TASKS_WATCHER',
        resolve: resolve,
        reject: reject,
        page: page
    }
}
export const loadTasks = (tasks, page) => {
    return {type: 'LOAD_TASKS', payload: tasks, page: page}
}
export const setTask = (task) => {
    console.log('actions/task');
    return {type: SET_TASK, payload: task};
}

export const unsetTask = () => {
    return {type: UNSET_TASK};
}