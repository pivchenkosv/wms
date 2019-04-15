import {loadUsers} from '../actions/actionCreators';
import { takeLatest, call, put } from 'redux-saga/effects';
import {handleCreateUser, handleDeleteUser, usersApi} from "../components/api";
import {hideLoading, showLoading} from "react-redux-loading-bar";


function* usersEffectSaga(action) {
    try {
        yield put(showLoading())
        let { data } = yield call(usersApi, action);
        yield put(loadUsers(data.data));
        action.resolve(data)
    } catch (e) {
        action.reject(e)
    } finally {
        yield put(hideLoading())
    }
}

function* createUserEffectSaga(action) {
    try {
        yield put(showLoading())
        let { data } = yield call(handleCreateUser, action.payload);
        yield put(loadUsers(data.data));
        action.resolve(data)
    } catch (e) {
        action.reject(e)
    } finally {
        yield put(hideLoading())
    }
}

function* deleteUserEffectSaga(action) {
    try {
        yield put(showLoading())
        const { data } = yield call(handleDeleteUser, action.payload)
        yield put(loadUsers(data.data))
    } finally {
        yield put(hideLoading())
    }
}

export function* usersWatcherSaga() {
    yield takeLatest('USERS_WATCHER', usersEffectSaga);
}

export function* createUserWatcherSaga() {
    yield takeLatest('CREATE_USER_WATCHER', createUserEffectSaga)
}

export function* deleteUserWatcherSaga() {
    yield takeLatest('DELETE_USER_WATCHER', deleteUserEffectSaga)
}