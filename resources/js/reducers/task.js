import {
    SET_TASK,
    UNSET_TASK
} from './../types/task';


const TaskReducer =  (state = {}, action) => {
    console.log('something should happen')
    switch (action.type) {
        case SET_TASK: {
            //const task = action.data || null;
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
