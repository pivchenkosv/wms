import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import {unsetUser} from "../actions/users";
import useLocalStorage from 'react-use-localstorage';

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    logout = (event) => {
        event.preventDefault();
        localStorage.clear();
        document.getElementById('logout-form').submit();
    }

    Dropdown() {
        const user = JSON.parse(localStorage.getItem('user')) || null;
        const {history} = this.props
        if (user === null)
            return (
                <li className="nav-item">
                    <a className="nav-link" href="/login">Login</a>
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
                            <form id="logout-form" action="/logout" method="POST"
                                  style={{display: 'none'}}>
                                <input name='_token' value={$('meta[name="csrf-token"]').attr('content')}/>
                            </form>
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
                            <form id="logout-form" action="/logout" method="POST"
                                  style={{display: 'none'}}>
                                <input name='_token' value={$('meta[name="csrf-token"]').attr('content')}/>
                            </form>
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
                            <form id="logout-form" action="/logout" method="POST"
                                  style={{display: 'none'}}>
                                <input name='_token' value={$('meta[name="csrf-token"]').attr('content')}/>
                            </form>
                        </div>
                    </li>
                );
            }
            default:
                return (
                    <li className="nav-item">
                        <a className="nav-link" href="/login">Login</a>
                    </li>
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
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))
