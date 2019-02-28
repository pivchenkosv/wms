import {
    SET_USER,
    UNSET_USER
} from './../types/users';

export const setUser = (user) => dispatch => {
    dispatch({ type: SET_USER, data: user });
}

export const unsetUser = (user) => dispatch => {
    dispatch({ type: UNSET_USER, data: user });
}
