import axios from 'axios';
import { updateProfile } from '../actions/actionCreators';
import { browserHistory } from 'react-router';
import { takeLatest, call, put } from 'redux-saga/effects';

/** function that returns an axios call */
function loginApi(authParams) {
    const params = new URLSearchParams();
    params.append('email', authParams.email);
    params.append('password', authParams.password);
    params.append('_token', $('meta[name="csrf-token"]').attr('content'));
    return axios.post('api/login', params, {
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}
    });
}

function logoutApi(token) {
    const params = new URLSearchParams();
    params.append('_token', $('meta[name="csrf-token"]').attr('content'));
    return axios.post('/logout', params)
}

/** saga worker that is responsible for the side effects */
function* loginEffectSaga(action) {
    console.log('loginEffectSaga')
    try {
        // data is obtained after axios call is resolved
        let { data } = yield call(loginApi, action.payload);
        console.log('data ', data)
        localStorage.setItem('user', JSON.stringify(data.user));

        yield put(updateProfile(data.user));
        //
        // // redirect to home route after successful login
        // browserHistory.push('/home');
        console.log('effect saga resolved')
        action.resolve(data)
    } catch (e) {
        console.log('effect saga rejected login')
        action.reject(e)
    }
}

function* logoutEffectSaga(action) {
    try {
        let { data } = yield call(logoutApi, action.token);
        console.log('data logout ', data)
        localStorage.clear();
        window.location.reload()
        yield put(updateProfile(null))
    } catch (e) {
        console.log('logoutEffect saga rejected logout')
        action.reject(e)
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
