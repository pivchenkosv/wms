import { combineReducers } from 'redux';

import TaskReducer from './task';
import UserReducer from "./users";

export default combineReducers({
    task: TaskReducer,
    user: UserReducer
});
