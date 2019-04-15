import {loadTasks} from '../actions/actionCreators';
import { takeLatest, call, put } from 'redux-saga/effects';
import { loadTasks as loadTasksApi} from "../components/api";
import {hideLoading, showLoading} from "react-redux-loading-bar";

function* tasksEffectSaga(action) {
    try {
        yield put(showLoading())
        let { data } = yield call(loadTasksApi, action);
        yield put(loadTasks(data.data));
        action.resolve(data)
    } catch (e) {
        action.reject(e)
    } finally {
        yield put(hideLoading())
    }
}

export function* tasksWatcherSaga() {
    yield takeLatest('TASKS_WATCHER', tasksEffectSaga);
}
