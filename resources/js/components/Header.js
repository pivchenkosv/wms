import React from 'react'
import {Link, Route, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import {setUser, unsetUser} from "../actions/users";
import axios from "axios";
import {ROUTES} from "./routes";

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    logout = (event) => {
        event.preventDefault();
        localStorage.clear();
        const params = new URLSearchParams();
        params.append('_token', $('meta[name="csrf-token"]').attr('content'));
        axios.post('/logout', params).then(response => {
            this.props.unsetUser().then(() => {
            })
        })
        window.location.reload()
    }

    Dropdown() {
        const {user} = this.props.user
        const {history} = this.props
        if (user === null)
            return (
                <li className="nav-item">
                    <a className="nav-link" href="/login">Login</a>
                    {/*<a className="nav-link" onClick={this.logout}>Logout</a>*/}
                </li>
            );
        let userRole = user ? user.role : 'unauthorized';
        const routesData = ROUTES[userRole]
        return (
            <li className="nav-item dropdown">
                <a id="navbarDropdown" className="nav-link dropdown-toggle" href="#" role="button"
                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {user.name} <span className="caret"></span>
                </a>

                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                    {routesData ? routesData.routes.map((item, index) => (
                        item.name ?
                        <a key={index} className="dropdown-item" href="#" onClick={() => history.push(item.path)}>
                            {item.name}
                        </a> : null
                        )) : ''}
                    <a className="dropdown-item" href="#"
                       onClick={this.logout}>
                        Logout
                    </a>
                </div>
            </li>
        )
    }

    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-light navbar-laravel">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        WMS React
                    </a>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            {this.Dropdown()}
                        </ul>
                    </div>
                </div>
            </nav>
        )

    }
}

const mapStateToProps = (store, ownProps) => {
    console.log('mapStateToProps when remove');
    console.log(store)
    return {
        user: store.user
    }
}

const mapDispatchToProps = dispatch => {
    console.log('mapDispatchToProps when remove');
    return {
        unsetUser: user => unsetUser(user)(dispatch),
        setUser: user => setUser(user)(dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))
