import React, {Component} from 'react'

import ReactDOM from 'react-dom'
import {BrowserRouter, Redirect, Route, Router, Switch, withRouter} from 'react-router-dom'
import Header from './Header'
import {createStore, combineReducers, applyMiddleware as dispatch} from 'redux';
import {connect, Provider} from 'react-redux';
import reducers from '../reducers';
import createHistory from 'history/createBrowserHistory';

import {ROUTES} from "./routes";
import {setUser, unsetUser} from "../actions/users";

const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : f => f;

const store = createStore(reducers, {user: JSON.parse(localStorage.getItem('user'))}, enhancers);

const history = createHistory();

class App extends Component {

    constructor(props) {
        super(props)
        let user = JSON.parse(localStorage.getItem('user'));
        dispatch(setUser(user))
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user'));
        dispatch(setUser(user))
    }

    router(history) {
        let {user} = store.getState();
        console.log('user ', user);
        let userRole = user ? user.role : 'unauthorized';
        const routesData = ROUTES[userRole]
        return (
            <Switch>
                {routesData.routes.map((item, index) => (<Route exact key={index} {...item} />))}
                <Redirect to={routesData.redirect}  />
            </Switch>
        );
    }

    render() {

        let user = JSON.parse(localStorage.getItem('user'));
        dispatch(setUser(user))
        return (
            <Provider store={store}>
                <Router history={history}>
                    <div>
                        <Header history={history}/>
                        {this.router(history)}
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
    console.log('mapStateToProps App');
    console.log(store)
    return {
        user: store.user
    }
}

const mapDispatchToProps = dispatch => {
    console.log('mapDispatchToProps App');
    return {
        unsetUser: user => unsetUser(user)(dispatch),
        setUser: user => setUser(user)(dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)

