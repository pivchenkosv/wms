export const loginWatcher = (authParams, resolve, reject) => {
    return {
        type: 'LOGIN_WATCHER',
        payload: authParams,
        resolve: resolve,
        reject: reject,
    };
}
export const logoutWatcher = (token, resolve, reject) => {
    return {
        type: 'LOGOUT_WATCHER',
        payload: token,
        resolve: resolve,
        reject: reject,
    };
}
export const updateProfile = (profile) => {
    return { type: 'UPDATE_PROFILE', payload: profile };
}
export const loadUsers = (users) => {
    return { type: 'LOAD_USERS', payload: users };
}
export const loadUsersWatcher = (resolve, reject) => {
    return {
        type: 'USERS_WATCHER',
        resolve: resolve,
        reject: reject,
    }
}
