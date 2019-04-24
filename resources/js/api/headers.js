const user = JSON.parse(localStorage.getItem('user'));
const authToken = user ? user.auth_token : null;
export const headers = {'Authorization': 'Bearer' + authToken}

