import axios from 'axios'
import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class UsersList extends Component {
    constructor() {
        super()
        this.state = {
            users: []
        }
    }

    showUserInfo(evt) {
        let id = evt.target.getAttribute('id');
        console.log(evt.target.getAttribute('id'));
        axios.get('/api/admin/users/' + id).then(response => {
            this.setState({
                user: response.data
            })
        })
    };
    componentDidMount () {
        axios.get('/api/admin/users').then(response => {
            this.setState({
                users: response.data
            })
        })
    }

    render() {
        const {users} = this.state
        return (
            <div className='container py-4'>
                <div className='row justify-content-left'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'>
                                <div className='row'>
                                    <div className='col-sm-8'>Users Table</div>
                                    <Link className='btn btn-primary btn-sm mb-3 col-sm-3' to='/register'>
                                        Create new user account
                                    </Link>
                                </div>
                            </div>
                            <div className='card-header'>
                                <div className='list-group-item d-flex justify-content-between align-items-left'>
                                    <span className='badge badge-pill'>id</span>
                                    <span className='badge badge-pill'>name</span>
                                    <span className='badge badge-pill'>email</span>
                                    <span className='badge badge-pill'>role</span>
                                    <span className='badge badge-pill'>created at</span>
                                </div>
                            </div>

                            <div className='card-body'>
                                <ul className='list-group list-group-flush'>
                                    {users.map(user => (
                                        <Link
                                            className='list-group-item list-group-item-action d-flex justify-content-between align-items-left'
                                            to={'#'}
                                            onClick={this.showUserInfo}
                                            id={user.id}
                                            key={user.id}
                                        >
                                            <span id={user.id} className='badge badge-pill' id='userId'>
                                                {user.id}
                                            </span>
                                            <span id={user.id} className='badge badge-pill'>
                                                {user.name}
                                            </span>

                                            <span id={user.id} className='badge badge-primary badge-pill'>
                                                {user.email}
                                            </span>
                                            <span id={user.id} className='badge badge-pill'>
                                                {user.role}
                                            </span>
                                            <span id={user.id} className='badge badge-pill'>
                                                {user.created_at}
                                            </span>

                                        </Link>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UsersList

