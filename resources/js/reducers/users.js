import {
    SET_USER,
    UNSET_USER
} from './../types/users';


const UserReducer =  (state = {}, action) => {
    switch (action.type) {
        case SET_USER: {
            return {
                user: action.data
            };
        }
        case UNSET_USER: {
            return {
                user: null
            }
        }
        case 'UPDATE_PROFILE':
            return {
                user: action.payload
            }
        default:
            return state;
    }
}

export default UserReducer;
