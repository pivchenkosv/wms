import React, {Component} from 'react'

import ReactDOM from 'react-dom'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import Header from './Header'
import UsersList from "./UsersList";
import Login from "./Login";
import Home from "./Home";
import CellsList from "./CellsList";
import Register from "./Register";
import ProductsList from "./ProductsList";
import StocksList from "./StocksList";
import ReportsList from "./ReportsList";
import TasksList from "./TasksList";
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import reducers from '../reducers/users';

const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : f => f;

const store = createStore(reducers, {user: JSON.parse(localStorage.getItem('user'))}, enhancers);

class App extends Component {

    constructor(props) {
        super(props)
    }

    router() {
        console.log(store.user);
        let user = JSON.parse(localStorage.getItem('user'));
        switch (user ? user.role : 'unauthorized') {
            case 'ROLE_ADMIN': return(
                <Switch>
                    <Route exact path='/admin/users' component={UsersList}/>
                    <Route exact path='/home' component={Home}/>
                    <Route exact path='/register' component={Register}/>
                    <Route exact path='/cells' component={CellsList}/>
                    <Route exact path='/products' component={ProductsList}/>
                    <Route exact path='/stocks' component={StocksList}/>
                    <Route exact path='/tasks' component={TasksList}/>
                    <Route exact path='/reports' component={ReportsList}/>
                    <Redirect to="/tasks" />
                </Switch>
            );
            case 'ROLE_MANAGER': return(
                <Switch>
                    <Route exact path='/home' component={Home}/>
                    <Route exact path='/cells' component={CellsList}/>
                    <Route exact path='/products' component={ProductsList}/>
                    <Route exact path='/stocks' component={StocksList}/>
                    <Route exact path='/tasks' component={TasksList}/>
                    <Route exact path='/reports' component={ReportsList}/>
                    <Redirect to="/tasks" />
                </Switch>
            );
            case 'ROLE_WORKER': return(
                <Switch>
                    <Route exact path='/home' component={Home}/>
                    <Route exact path='/cells' component={CellsList}/>
                    <Route exact path='/products' component={ProductsList}/>
                    <Route exact path='/stocks' component={StocksList}/>
                    <Route exact path='/tasks' component={TasksList}/>
                    <Redirect to="/tasks" />
                </Switch>
            );
            case 'unauthorized': return(<Switch><Route exact path='/login' component={Login}/><Route exact path='/' component={Login}/><Redirect to="/login" /></Switch>);
        }
    }

    render() {

        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div>
                        <Header/>
                            {this.router()}
                            {/*<Route exact path='/admin/users' component={UsersList}/>*/}
                            {/*<Route exact path='/login' component={Login}/>*/}
                            {/*<Route exact path='/' component={Login}/>*/}
                            {/*<Route exact path='/home' component={Home}/>*/}
                            {/*<Route exact path='/register' component={Register}/>*/}
                            {/*<Route exact path='/cells' component={CellsList}/>*/}
                            {/*<Route exact path='/products' component={ProductsList}/>*/}
                            {/*<Route exact path='/stocks' component={StocksList}/>*/}
                            {/*<Route exact path='/tasks' component={TasksList}/>*/}
                            {/*<Route exact path='/reports' component={ReportsList}/>*/}
                    </div>
                </BrowserRouter>
            </Provider>
        )
    }
}

window.onload = function () {
    ReactDOM.render(<App/>, document.getElementById('content'));
}

