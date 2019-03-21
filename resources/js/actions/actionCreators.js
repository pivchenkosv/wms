export function loginWatcher(authParams, resolve, reject) {
    return {
        type: 'LOGIN_WATCHER',
        payload: authParams,
        resolve: resolve,
        reject: reject,
    };
}
export function logoutWatcher(token, resolve, reject) {
    return {
        type: 'LOGOUT_WATCHER',
        payload: token,
        resolve: resolve,
        reject: reject,
    };
}
export function updateProfile(profile) {
    return { type: 'UPDATE_PROFILE', payload: profile };
}
