import React from 'react'
import { Link } from 'react-router-dom'

class Header extends React.Component {

    constructor(user) {
        super();
        this.user = user;
    }

    logout(event) {
        event.preventDefault();
        document.getElementById('logout-form').submit();
    }

    render() {

        return (
            <nav className='navbar navbar-expand-md navbar-light navbar-laravel'>
                <div className='container'>
                    <Link className='navbar-brand' to='/'>WMS</Link>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown">
                            <a id="navbarDropdown" className="nav-link dropdown-toggle" href="#" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                User <span className="caret"></span>
                            </a>

                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">

                                <a className="dropdown-item" href="/logout"
                                   onClick={this.logout}>
                                    Logout
                                </a>

                                <form id="logout-form" action="/logout" method="POST" style={{display: 'none'}}>
                                    <input type="hidden" name="_token" value={$('meta[name="csrf-token"]').attr('content')}/>

                                </form>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        )

    }
}
export default Header
