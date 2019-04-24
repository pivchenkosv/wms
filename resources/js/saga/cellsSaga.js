import { takeLatest, call, put } from 'redux-saga/effects';
import {loadCells as loadCellsApi} from "../api/cells";
import {hideLoading, showLoading} from "react-redux-loading-bar";
import {loadCellsAction} from "../actions/cells";
import {CELLS_WATCHER} from "../types/cells";

function* cellsEffectSaga(action) {
    try {
        yield put(showLoading())

        let {data}  = yield call(loadCellsApi);

        yield put(loadCellsAction(data.data));

        action.resolve(data.data)
    } finally {
        yield put(hideLoading())
    }
}

export function* cellsWatcherSaga() {
    yield takeLatest(CELLS_WATCHER, cellsEffectSaga);
}
