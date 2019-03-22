import { combineReducers } from 'redux';

import TaskReducer from './task';
import UserReducer from "./user";
import UsersReducer from "./users";

export default combineReducers({
    task: TaskReducer,
    user: UserReducer,
    users: UsersReducer
});
