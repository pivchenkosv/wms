import React, {Component} from 'react'

import ReactDOM from 'react-dom'
import {Redirect, Route, Router, Switch} from 'react-router-dom'
import {applyMiddleware, compose, createStore} from 'redux';
import {connect, Provider} from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';

import reducers from '../reducers';
import {ROUTES} from "./routes";
import {SET_USER} from "../types/users";
import {setUser, unsetUser} from "../actions/users";
import rootSaga from "../saga/rootSaga";
import HeaderContainer from "../containers/HeaderContainer";

const sagaMiddleware = createSagaMiddleware();
const middlewares = applyMiddleware(sagaMiddleware);
const store = createStore(reducers, compose(middlewares));
sagaMiddleware.run(rootSaga);
const history = createHistory();

class App extends Component {

    constructor(props) {
        super(props)
        const user = JSON.parse(localStorage.getItem('user'));
        store.dispatch({type: SET_USER, payload: user})
    }

    router() {

        const {user} = store.getState();
        const userRole = user.user ? user.user.role : 'unauthorized';
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
                        <HeaderContainer history={history}/>
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

