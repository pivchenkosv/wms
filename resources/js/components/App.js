import React, {Component} from 'react'

import ReactDOM from 'react-dom'
import {Redirect, Route, Router, Switch} from 'react-router-dom'
import {applyMiddleware, compose, createStore} from 'redux';
import {connect, Provider} from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import LoadingBar, {loadingBarMiddleware} from 'react-redux-loading-bar'

import reducers from '../reducers';
import {ROUTES} from "./routes";
import {SET_USER} from "../types/users";
import {setUser, unsetUser} from "../actions/users";
import rootSaga from "../saga/rootSaga";
import HeaderContainer from "../containers/HeaderContainer";
import {getUser} from "./api";

const sagaMiddleware = createSagaMiddleware();
const middlewares = applyMiddleware(sagaMiddleware, loadingBarMiddleware());
const store = createStore(reducers,{tasks: {tasks: []}, reports: {reports: []}}, compose(middlewares));
sagaMiddleware.run(rootSaga);
const history = createHistory();

class App extends Component {

    constructor(props) {
        super(props)
        let user = JSON.parse(localStorage.getItem('user'));
        // let user = null;
        getUser().then(response => {
            store.dispatch({type: SET_USER, payload: response.data})
            user = response.data
        }).catch(rejected => {
            if (rejected.response.status === 401 && localStorage.user) {
                localStorage.removeItem('user');
            }
        })
        store.dispatch({type: SET_USER, payload: user})
    }

    update = () => {
        this.setState({somethingToUpdate: "newValue"});
        console.log("updated!");
    }

    router = () => {

        const {user} = store.getState()
        console.log('user', user)
        const userRole = user.user ? user.user.role : 'unauthorized';
        const routesData = ROUTES[userRole]

        return (
            <Switch>
                {routesData.routes.map((item, index) => (<Route exact key={index} {...item} />))}
                {console.log('switch')}
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
                        <LoadingBar/>
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

