import {loadUsers} from '../actions/actionCreators';
import { takeLatest, call, put } from 'redux-saga/effects';
import {usersApi} from "../components/api";


function* usersEffectSaga(action) {
    console.log('usersEffectSaga')
    try {
        let { data } = yield call(usersApi, action);
        console.log('data ', data)
        yield put(loadUsers(data.data));
        action.resolve(data)
    } catch (e) {
        action.reject(e)
    }
}

export function* usersWatcherSaga() {
    console.log('usersWatcherSaga')
    yield takeLatest('USERS_WATCHER', usersEffectSaga);
}
