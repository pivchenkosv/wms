import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import {setUser, unsetUser} from "../actions/users";
import useLocalStorage from 'react-use-localstorage';
import axios from "axios";

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

        // this.props.history.push('/login')
        window.location.reload()
        // document.getElementById('logout-form').submit();
    }

    Dropdown() {
        const {user} = this.props
        const {history} = this.props
        if (user === null)
            return (
                <li className="nav-item">
                    <a className="nav-link" href="/login">Login</a>
                    {/*<a className="nav-link" onClick={this.logout}>Login</a>*/}
                </li>
            );
        switch (user.role) {
            case 'ROLE_ADMIN': {
                return (
                    <li className="nav-item dropdown">
                        <a id="navbarDropdown" className="nav-link dropdown-toggle" href="#" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {user.name} <span className="caret"></span>
                        </a>

                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="#" onClick={() => history.push('/admin/users')}>
                                Users
                            </a>
                            <a className="dropdown-item" href="#" onClick={() => history.push('reports')}>
                                Reports
                            </a>
                            <a className="dropdown-item" href="#" onClick={() => history.push('/tasks')}>
                                Tasks
                            </a>
                            <a className="dropdown-item" href="#" onClick={() => history.push('/cells')}>
                                Cells
                            </a>
                            <a className="dropdown-item" href="#" onClick={() => history.push('/stocks')}>
                                Stocks
                            </a>
                            <a className="dropdown-item" href="#" onClick={() => history.push('/products')}>
                                Products
                            </a>
                            <a className="dropdown-item"
                               onClick={this.logout}>
                                Logout
                            </a>
                        </div>
                    </li>
                )
            }
            case 'ROLE_MANAGER': {
                return (
                    <li className="nav-item dropdown">
                        <a id="navbarDropdown" className="nav-link dropdown-toggle" href="#" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {user.name} <span className="caret"></span>
                        </a>

                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="#" onClick={() => history.push('reports')}>
                                Reports
                            </a>
                            <a className="dropdown-item" href="#" onClick={() => history.push('/tasks')}>
                                Tasks
                            </a>
                            <a className="dropdown-item" href="#" onClick={() => history.push('/cells')}>
                                Cells
                            </a>
                            <a className="dropdown-item" href="#" onClick={() => history.push('/stocks')}>
                                Stocks
                            </a>
                            <a className="dropdown-item" href="#" onClick={() => history.push('/products')}>
                                Products
                            </a>
                            <a className="dropdown-item"
                               onClick={this.logout}>
                                Logout
                            </a>
                        </div>
                    </li>
                );
            }
            case 'ROLE_WORKER': {
                return (
                    <li className="nav-item dropdown">
                        <a id="navbarDropdown" className="nav-link dropdown-toggle" href="#" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {user.name} <span className="caret"></span>
                        </a>

                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="#" onClick={() => history.push('/tasks')}>
                                Tasks
                            </a>
                            <a className="dropdown-item" href="#" onClick={() => history.push('/cells')}>
                                Cells
                            </a>
                            <a className="dropdown-item" href="#" onClick={() => history.push('/stocks')}>
                                Stocks
                            </a>
                            <a className="dropdown-item" href="#" onClick={() => history.push('/products')}>
                                Products
                            </a>
                            <a className="dropdown-item"
                               onClick={this.logout}>
                                Logout
                            </a>
                        </div>
                    </li>
                );
            }
            default:
                return (
                    <div>
                        <li className="nav-item">
                            <a className="nav-link" href="/login">Login</a>
                        </li>
                    </div>
                );

        }
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
