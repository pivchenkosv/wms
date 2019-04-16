import { takeLatest, call, put } from 'redux-saga/effects';
import {loadReports as loadReportsApi} from "../api/reports";
import {hideLoading, showLoading} from "react-redux-loading-bar";
import {loadReports} from "../actions/reports";
import {REPORTS_WATCHER} from "../types/reports";

function* reportsEffectSaga(action) {
    try {
        yield put(showLoading())

        let {data}  = yield call(loadReportsApi, action.payload);

        yield put(loadReports(data.data));

        action.resolve(data)
    } finally {
        yield put(hideLoading())
    }
}

export function* reportsWatcherSaga() {
    yield takeLatest(REPORTS_WATCHER, reportsEffectSaga);
}
