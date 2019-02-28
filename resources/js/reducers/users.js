import {
    SET_USER,
    UNSET_USER
} from './../types/users';


const UserReducer =  (state = {}, action) => {
    switch (action.type) {
        case SET_USER: {
            const user = action.data || null;
            return {
                user: user
            };
        }
        case UNSET_USER: {
            return {
                user: null
            }
        }
        default:
            return state;
    }
}

export default UserReducer;
