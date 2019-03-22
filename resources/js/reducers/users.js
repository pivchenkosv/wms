import {LOAD_USERS} from "../types/users";

const UsersReducer = (state = {}, action ) => {
    switch (action.type) {
        case LOAD_USERS:
            return {
                users: action.data
            }
        default:
            return state;
    }
}

export default UsersReducer;
