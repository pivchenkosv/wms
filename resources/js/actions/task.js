import {
    SET_TASK,
    UNSET_TASK
} from './../types/task';

export const setTask = (task) => {
    return { type: SET_TASK, payload: task };
}

export const unsetTask = () => {
    return { type: UNSET_TASK };
}
