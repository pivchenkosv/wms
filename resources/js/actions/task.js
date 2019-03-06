import {
    SET_TASK,
    UNSET_TASK
} from './../types/task';

export const setTask = (task) => dispatch => {
    console.log('actions/task');
    dispatch({ type: SET_TASK, data: task });
}

export const unsetTask = (task) => dispatch => {
    dispatch({ type: UNSET_TASK, data: task });
}
