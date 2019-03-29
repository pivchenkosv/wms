import { all } from 'redux-saga/effects';
import {
    loginWatcherSaga, logoutWatcherSaga
    // import other watchers from this file
} from './sessionSaga';
import {usersWatcherSaga} from "./usersSaga";
import {tasksWatcherSaga} from "./tasksSaga";
// import watchers from other files

export default function* rootSaga() {
    yield all([
        loginWatcherSaga(),
        logoutWatcherSaga(),
        usersWatcherSaga(),
        tasksWatcherSaga(),
        // add other watchers to the array
    ]);
}
