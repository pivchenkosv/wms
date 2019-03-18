import {
    SET_TASK,
    UNSET_TASK
} from './../types/task';


const TaskReducer =  (state = {}, action) => {
    switch (action.type) {
        case SET_TASK: {
            return {
                task: action.data,
            };
        }
        case UNSET_TASK: {
            return {
                task: null
            }
        }
        default:
            return state;
    }
}

export default TaskReducer;
