import {
    SET_MESSAGE,
} from './../types/message';


const MessageReducer =  (state = {}, action) => {
    switch (action.type) {
        case SET_MESSAGE: {
            return {
                message: action.payload
            };
        }
        default:
            return state;
    }
}

export default MessageReducer;
