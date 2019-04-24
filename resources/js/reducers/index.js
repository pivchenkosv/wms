import { combineReducers } from 'redux';

import TaskReducer from './task';
import UserReducer from "./user";
import UsersReducer from "./users";
import TasksReducer from "./tasks";
import MessageReducer from "./errorMessage";
import { loadingBarReducer } from 'react-redux-loading-bar'
import ReportReducer from "./reports";
import CellReducer from "./cells";
import ProductReducer from "./products";

export default combineReducers({
    task: TaskReducer,
    tasks: TasksReducer,
    user: UserReducer,
    users: UsersReducer,
    message: MessageReducer,
    reports: ReportReducer,
    cells: CellReducer,
    products: ProductReducer,
    loadingBar: loadingBarReducer,
});
