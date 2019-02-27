import React, { Component } from 'react'

import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
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
class App extends Component {

    constructor(props){
        super(props)
    }
    render () {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path='/admin/users' component={UsersList}/>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/' component={Login}/>
                        <Route exact path='/home' component={Home}/>
                        <Route exact path='/register' component={Register}/>
                        <Route exact path='/cells' component={CellsList}/>
                        <Route exact path='/products' component={ProductsList}/>
                        <Route exact path='/stocks' component={StocksList}/>
                        <Route exact path='/tasks' component={TasksList}/>
                        <Route exact path='/reports' component={ReportsList}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

window.onload = function () {
    ReactDOM.render(<App />, document.getElementById('content'));
}

