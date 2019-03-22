import axios from 'axios';
import {loadUsers, updateProfile} from '../actions/actionCreators';
import { browserHistory } from 'react-router';
import { takeLatest, call, put } from 'redux-saga/effects';

function usersApi(action) {
    return axios.get('/api/admin/users')
        // .then(response => {
        //     this.setState({
        //         users: response.data.data
        //     })
        // })
}

function* usersEffectSaga(action) {
    console.log('usersEffectSaga')
    try {
        let { data } = yield call(usersApi, action);
        console.log('data ', data)

        yield put(loadUsers(data.data));
        //
        // // redirect to home route after successful login
        // browserHistory.push('/home');
        console.log('effect saga resolved')
        action.resolve(data)
    } catch (e) {
        console.log('effect saga rejected users')
        action.reject(e)
    }
}

export function* usersWatcherSaga() {
    console.log('usersWatcherSaga')
    yield takeLatest('USERS_WATCHER', usersEffectSaga);
}
