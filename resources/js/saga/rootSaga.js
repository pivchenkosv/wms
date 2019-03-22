import { all } from 'redux-saga/effects';
import {
    loginWatcherSaga, logoutWatcherSaga
    // import other watchers from this file
} from './sessionSaga';
import {usersWatcherSaga} from "./usersSaga";
// import watchers from other files

export default function* rootSaga() {
    yield all([
        loginWatcherSaga(),
        logoutWatcherSaga(),
        usersWatcherSaga(),
        // add other watchers to the array
    ]);
}
