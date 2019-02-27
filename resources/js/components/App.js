import React, { Component } from 'react'

import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import UsersList from "./UsersList";
import Login from "./Login";
import Home from "./Home";
import Cells from "./Cells";
import Register from "./Register";
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
                        <Route exact path='/cells' component={Cells}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}
//if (Route.location == 'users') ReactDOM.render(<App />, document.getElementById('app'));
//console.log(Router.location);

window.onload = function () {
    ReactDOM.render(<App />, document.getElementById('content'));
}

