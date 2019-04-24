import {LOAD_REPORTS} from "../types/reports";

const ReportReducer= (state = {}, action ) => {
    switch (action.type) {
        case LOAD_REPORTS:
            return {
                reports: action.payload.data,
                currentPage: action.payload.current_page,
                lastPage: action.payload.last_page
            }
        default:
            return state;
    }
}

export default ReportReducer;
