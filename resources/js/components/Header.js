import React from 'react'
import {withRouter} from 'react-router-dom'

import LoadingBar from 'react-redux-loading-bar'
import {ROUTES} from "./routes";

class Header extends React.Component {

    logout = (event) => {
        event.preventDefault();
        new Promise((resolve, reject) => {
            this.props.logoutWatcher({
                token: $('meta[name="csrf-token"]').attr('content'),
            }, resolve, reject);
        }).then(response => {
            window.location.reload()
        })
    }

    Dropdown() {
        const {user} = this.props.user
        const {history} = this.props
        if (!user)
            return (
                <li className="nav-item">
                    <a className="nav-link" href="/login">Login</a>
                    {/*<a className="nav-link" onClick={this.logout}>Logout</a>*/}
                </li>
            );
        const userRole = user ? user.role : 'unauthorized';
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
        const {user} = this.props.user
        const userRole = user ? user.role : 'unauthorized';
        return (
            <nav id='navbar' className="navbar navbar-expand-md navbar-light navbar-laravel nav-down">
                <div className="container">
                    {userRole === 'ROLE_ADMIN' || userRole === 'ROLE_MANAGER' ?
                        <a className="navbar-brand" href="/home">
                            Warehouse Management System
                        </a> :
                        <a className="navbar-brand" href="/">
                            Warehouse Management System
                        </a>
                    }
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

var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
    } else {
        document.getElementById("navbar").style.top = "-50px";
    }
    prevScrollpos = currentScrollPos;
}

export default withRouter(Header)
