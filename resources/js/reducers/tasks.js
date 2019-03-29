import {LOAD_TASKS} from "../types/tasks";

const TasksReducer = (state = {}, action ) => {
    switch (action.type) {
        case LOAD_TASKS:
            return {
                tasks: action.payload
            }
        default:
            return state;
    }
}

export default TasksReducer;
