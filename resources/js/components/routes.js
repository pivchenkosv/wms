import UsersList from "./user/UsersList";
import Register from "./user/Register";
import CellsList from "./cell/CellsList";
import ProductsList from "./prodcut/ProductsList";
import StocksList from "./stock/StocksList";
import TasksList from "./task/TasksList";
import NewTask from "./task/NewTask";
import ReportsList from "./report/ReportsList";
import Home from "./Home";
import Login from "./login/Login";

export const ROUTES = {
    ROLE_ADMIN: {
        routes: [
            {path: '/admin/users', component: UsersList},
            {path: '/register', component: Register},
            {path: '/home', component: Home},
            {path: '/cells', component: CellsList},
            {path: '/products', component: ProductsList},
            {path: '/stocks', component: StocksList},
            {path: '/tasks', component: TasksList},
            {path: '/newTask', component: NewTask},
            {path: '/reports', component: ReportsList},
        ],
        redirect: "/tasks",
    },
    ROLE_MANAGER: {
        routes: [
            {path: '/home', component: Home},
            {path: '/cells', component: CellsList},
            {path: '/products', component: ProductsList},
            {path: '/stocks', component: StocksList},
            {path: '/tasks', component: TasksList},
            {path: '/newTask', component: NewTask},
            {path: '/reports', component: ReportsList},
        ],
        redirect: "/tasks",
    },
    ROLE_WORKER: {
        routes: [
            {path: '/home', component: Home},
            {path: '/cells', component: CellsList},
            {path: '/products', component: ProductsList},
            {path: '/stocks', component: StocksList},
            {path: '/tasks', component: TasksList},
        ],
        redirect: "/tasks",
    },
    unauthorized: {
        routes: [
            {path: '/', component: Login},
            {path: '/login', component: Login}
        ],
        redirect: "/login",
    },
};
