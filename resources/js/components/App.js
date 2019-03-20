import React, {Component} from 'react'

import ReactDOM from 'react-dom'
import {Redirect, Route, Router, Switch} from 'react-router-dom'
import Header from './Header'
import {createStore} from 'redux';
import {connect, Provider} from 'react-redux';
import reducers from '../reducers';
import createHistory from 'history/createBrowserHistory';

import {ROUTES} from "./routes";


import {setUser, unsetUser} from "../actions/users";
import {SET_USER} from "../types/users";

const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : f => f;
const store = createStore(reducers, enhancers);
const history = createHistory();

class App extends Component {

    constructor(props) {
        super(props)
        let user = JSON.parse(localStorage.getItem('user'));
        store.dispatch({type: SET_USER, data: user})
    }

    router() {

        let {user} = store.getState();
        let userRole = user.user ? user.user.role : 'unauthorized';
        const routesData = ROUTES[userRole]

        return (
            <Switch>
                {routesData.routes.map((item, index) => (<Route exact key={index} {...item} />))}
                <Redirect to={routesData.redirect}/>
            </Switch>
        );
    }

    render() {

        return (
            <Provider store={store}>
                <Router history={history}>
                    <div>
                        <Header history={history}/>
                        {this.router()}
                    </div>
                </Router>
            </Provider>
        )
    }
}

window.onload = function () {
    ReactDOM.render(<App/>, document.getElementById('content'));
}

const mapStateToProps = (store, ownProps) => {
    return {
        user: store.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        unsetUser: user => unsetUser(user)(dispatch),
        setUser: user => setUser(user)(dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)

