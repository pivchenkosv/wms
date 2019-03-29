import {setErrorMessage, updateProfile} from '../actions/actionCreators';
import { browserHistory } from 'react-router';
import { takeLatest, call, put } from 'redux-saga/effects';
import {loginApi, logoutApi} from "../components/api";

/** saga worker that is responsible for the side effects */
function* loginEffectSaga(action) {
    try {
        let { data } = yield call(loginApi, action.payload);
        console.log('data ', data)
        localStorage.setItem('user', JSON.stringify(data.user));

        yield put(updateProfile(data.user));
        yield put(setErrorMessage(null))
        window.location.reload()

    } catch (e) {
        yield put(setErrorMessage(e.response.data.message))

        $( "div.failure" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );

        console.log('rejected ', e)
    }
}

function* logoutEffectSaga(action) {
    try {
        let { data } = yield call(logoutApi, action.token);
        localStorage.clear();
        window.location.reload()
        yield put(updateProfile(null))
    } catch (e) {
        console.log('rejected')
    }
}

/**
 * saga watcher that is triggered when dispatching action of type
 * 'LOGIN_WATCHER'
 */
export function* loginWatcherSaga() {
    console.log('loginWatcherSaga')
    yield takeLatest('LOGIN_WATCHER', loginEffectSaga);
}
export function* logoutWatcherSaga() {
    console.log('loginWatcherSaga')
    yield takeLatest('LOGOUT_WATCHER', logoutEffectSaga);
}
