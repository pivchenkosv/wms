import {LOAD_CELLS} from "../types/cells";

const CellReducer = (state = {}, action ) => {
    switch (action.type) {
        case LOAD_CELLS:
            return {
                cells: action.payload,
                }
        default:
            return state;
    }
}

export default CellReducer;
