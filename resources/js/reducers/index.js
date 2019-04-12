import { combineReducers } from 'redux';

import TaskReducer from './task';
import UserReducer from "./user";
import UsersReducer from "./users";
import TasksReducer from "./tasks";
import MessageReducer from "./errorMessage";
import { loadingBarReducer } from 'react-redux-loading-bar'
import ReportReducer from "./reports";

export default combineReducers({
    task: TaskReducer,
    tasks: TasksReducer,
    user: UserReducer,
    users: UsersReducer,
    message: MessageReducer,
    reports: ReportReducer,
    loadingBar: loadingBarReducer,
});
