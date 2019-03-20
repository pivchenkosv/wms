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
            {path: '/admin/users', component: UsersList, name: 'Users'},
            {path: '/tasks', component: TasksList, name: 'Tasks'},
            {path: '/reports', component: ReportsList, name: 'Reports'},
            {path: '/register', component: Register},
            {path: '/home', component: Home},
            {path: '/cells', component: CellsList, name: 'Cells'},
            {path: '/products', component: ProductsList, name: 'Products'},
            {path: '/stocks', component: StocksList, name: 'Stocks'},
            {path: '/newTask', component: NewTask},
        ],
        redirect: "/tasks",
    },
    ROLE_MANAGER: {
        routes: [
            {path: '/home', component: Home},
            {path: '/tasks', component: TasksList, name: 'Tasks'},
            {path: '/reports', component: ReportsList, name: 'Reports'},
            {path: '/cells', component: CellsList, name: 'Cells'},
            {path: '/products', component: ProductsList, name: 'Products'},
            {path: '/stocks', component: StocksList, name: 'Stocks'},
            {path: '/newTask', component: NewTask},
        ],
        redirect: "/tasks",
    },
    ROLE_WORKER: {
        routes: [
            {path: '/home', component: Home},
            {path: '/tasks', component: TasksList, name: 'Tasks'},
            {path: '/cells', component: CellsList, name: 'Cells'},
            {path: '/products', component: ProductsList, name: 'Products'},
            {path: '/stocks', component: StocksList, name: 'Stocks'},
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
