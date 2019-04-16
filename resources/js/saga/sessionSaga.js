import {setErrorMessage, updateProfile} from '../actions/actionCreators';
import {browserHistory} from 'react-router';
import {takeLatest, call, put} from 'redux-saga/effects';
import {loginApi, logoutApi} from "../api/api";

/** saga worker that is responsible for the side effects */
function* loginEffectSaga(action) {
    try {
        const {data} = yield call(loginApi, action.payload);

        if (data.success) {
            localStorage.setItem('user', JSON.stringify(data.user));
            yield put(updateProfile(data.user));
            yield put(setErrorMessage(null))
            window.location.reload()
        }

        yield put(setErrorMessage(data.data))
        $("div.failure").fadeIn(300).delay(1500).fadeOut(400);

    } catch (e) {
        yield put(setErrorMessage(e.response.data.message))

        $("div.failure").fadeIn(300).delay(1500).fadeOut(400);

        history.push('/tasks')
    }
}

function* logoutEffectSaga(action) {
    try {
        let {data} = yield call(logoutApi, action.token);
        localStorage.clear();
        window.location.reload()
        yield put(updateProfile({user: null}))

    } catch (e) {
        yield put(setErrorMessage(e.response.data.message))
    }
}

/**
 * saga watcher that is triggered when dispatching action of type
 * 'LOGIN_WATCHER'
 */
export function* loginWatcherSaga() {
    yield takeLatest('LOGIN_WATCHER', loginEffectSaga);
}

export function* logoutWatcherSaga() {
    yield takeLatest('LOGOUT_WATCHER', logoutEffectSaga);
}
