import {loadTasks} from '../actions/actionCreators';
import { takeLatest, call, put } from 'redux-saga/effects';
import { loadTasks as loadTasksApi} from "../components/api";

function* tasksEffectSaga(action) {
    try {
        let { data } = yield call(loadTasksApi, action);
        yield put(loadTasks(data.data));
        action.resolve(data)
    } catch (e) {
        action.reject(e)
        console.log('rejected 2 ', e)
    }
}

export function* tasksWatcherSaga() {
    console.log('tasksSagaWatcher')
    yield takeLatest('TASKS_WATCHER', tasksEffectSaga);
}
