import axios from 'axios'
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ReactDOM from "react-dom";
import User from "./User";
import {connect} from "react-redux";

class UsersList extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            user: null,
            //viewForm: false,
        }
        this.showUserInfo = this.showUserInfo.bind(this);
        this.handleFormUnmount = this.handleFormUnmount.bind(this);
        this.createNewUser = this.createNewUser.bind(this);
    }

    handleFormUnmount(){
        this.setState({user: null});
    }

    rerenderList = (users) => {
        this.setState({users: users});
    }

    showUserInfo(user) {
        // this.setState({viewForm: false},function () {
        //     this.setState({viewForm: true});
        // });
        this.setState({user: null}, function () {
            this.setState({user: user});
        });
    };

    createNewUser() {
        this.setState({user: null}, function () {
            this.setState({user: {
                    id: null,
                    name: '',
                    email: '',
                    role: '',
                }});
        });
    };

    componentDidMount () {
        axios.get('/api/admin/users').then(response => {
            this.setState({
                users: response.data.data
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
                                    <button className='btn btn-primary btn-sm mb-3 col-sm-3' onClick={this.createNewUser}>
                                        Create new user account
                                    </button>
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
                                            to="#"
                                            className='list-group-item list-group-item-action d-flex justify-content-between align-items-left'
                                            onClick={() => this.showUserInfo(user)}
                                        >
                                            <span id={user.id} className='badge badge-pill'>
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
                    <div id="user" className="col-md-4">
                        {(this.state.user) ?
                            <User user={this.state.user} unmountForm = {this.handleFormUnmount} rerenderUsersList = {this.rerenderList}/> : ''}
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps)(UsersList)

