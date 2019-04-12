import UsersListContainer from "../containers/UsersListContainer";
import Register from "./user/Register";
import CellsListContainer from "../containers/CellsListContainer";
import ProductsListContainer from "../containers/ProductsListContainer";
import StocksListContainer from "../containers/StocksListContainer";
import TasksListContainer from "../containers/TasksListContainer";
import NewTaskContainer from "../containers/NewTaskContainer";
import Home from "./Home";
import LoginContainer from "../containers/LoginContainer";
import ResetPassword from "./password/ResetPassword";
import ResetPasswordForm from "./password/ResetPasswordForm";
import ReportsListContainer from "../containers/ReportsListContainer";

export const ROUTES = {
    ROLE_WORKER: {
        routes: [
            {path: '/cells', component: CellsListContainer, name: 'Cells'},
            {path: '/products', component: ProductsListContainer, name: 'Products'},
            {path: '/stocks', component: StocksListContainer, name: 'Stocks'},
            {path: '/home', component: Home},
            {path: '/tasks', component: TasksListContainer, name: 'Tasks'},
        ],
        redirect: "/tasks",
    },
    unauthorized: {
        redirect: "/login",
        routes: [
            {path: '/', component: LoginContainer},
            {path: '/login', component: LoginContainer},
            {path: '/password/reset', component: ResetPassword},
            {path: '/password/reset/:token', component: ResetPasswordForm}
        ],
    },
    ROLE_ADMIN: {
        routes: [
            {path: '/admin/users', component: UsersListContainer, name: 'Users'},
            {path: '/tasks', component: TasksListContainer, name: 'Tasks'},
            {path: '/reports', component: ReportsListContainer, name: 'Reports'},
            {path: '/register', component: Register},
            {path: '/home', component: Home},
            {path: '/cells', component: CellsListContainer, name: 'Cells'},
            {path: '/products', component: ProductsListContainer, name: 'Products'},
            {path: '/stocks', component: StocksListContainer, name: 'Stocks'},
            {path: '/newTask', component: NewTaskContainer},
        ],
        redirect: "/tasks",
    },
    ROLE_MANAGER: {
        routes: [
            {path: '/home', component: Home},
            {path: '/tasks', component: TasksListContainer, name: 'Tasks'},
            {path: '/reports', component: ReportsListContainer, name: 'Reports'},
            {path: '/cells', component: CellsListContainer, name: 'Cells'},
            {path: '/products', component: ProductsListContainer, name: 'Products'},
            {path: '/stocks', component: StocksListContainer, name: 'Stocks'},
            {path: '/newTask', component: NewTaskContainer},
        ],
        redirect: "/tasks",
    },
};
