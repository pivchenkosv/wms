import {loadUsers} from '../actions/actionCreators';
import { takeLatest, call, put } from 'redux-saga/effects';
import {usersApi} from "../components/api";
import {hideLoading, showLoading} from "react-redux-loading-bar";


function* usersEffectSaga(action) {
    try {
        yield put(showLoading())
        let { data } = yield call(usersApi, action);
        console.log('data ', data)
        yield put(loadUsers(data.data));
        action.resolve(data)
    } catch (e) {
        action.reject(e)
    } finally {
        yield put(hideLoading())
    }
}

export function* usersWatcherSaga() {
    yield takeLatest('USERS_WATCHER', usersEffectSaga);
}
