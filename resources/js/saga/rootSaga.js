import { all } from 'redux-saga/effects';
import {
    loginWatcherSaga, logoutWatcherSaga
    // import other watchers from this file
} from './sessionSaga';
import {createUserWatcherSaga, deleteUserWatcherSaga, usersWatcherSaga} from "./usersSaga";
import {tasksWatcherSaga} from "./tasksSaga";
import {reportsWatcherSaga} from "./reportsSaga";
import {cellsWatcherSaga} from "./cellsSaga";
import {productsWatcherSaga} from "./productsSaga";
// import watchers from other files

export default function* rootSaga() {
    yield all([
        loginWatcherSaga(),
        logoutWatcherSaga(),
        usersWatcherSaga(),
        tasksWatcherSaga(),
        reportsWatcherSaga(),
        cellsWatcherSaga(),
        productsWatcherSaga(),
        createUserWatcherSaga(),
        deleteUserWatcherSaga(),
        // add other watchers to the array
    ]);
}
