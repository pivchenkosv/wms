import {LOAD_REPORTS, REPORTS_WATCHER} from "../types/reports";

export const loadReportsWatcher = (resolve, reject, page) => {
    return {
        type: REPORTS_WATCHER,
        payload: page,
        resolve: resolve,
        reject: reject
    }
}
export const loadReports = (data) => {
    return {
        type: LOAD_REPORTS,
        payload: data
    }
}