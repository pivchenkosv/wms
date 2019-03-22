import axios from 'axios'
import React, {Component} from 'react'
import User from "./User";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {loadUsersWatcher, loginWatcher} from "../../actions/actionCreators";

class UsersList extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            user: null,
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.showUserInfo = this.showUserInfo.bind(this);
        this.showUserInfo = this.showUserInfo.bind(this);
        this.handleFormUnmount = this.handleFormUnmount.bind(this);
        this.createNewUser = this.createNewUser.bind(this);
    }

    handleFormUnmount() {
        this.setState({user: null});
    }

    rerenderList = (users) => {
        this.setState({users: users.data});
    }

    showUserInfo(user) {
        this.setState({user: null}, function () {
            this.setState({user: user});
        });
    };

    createNewUser() {
        this.setState({user: null}, function () {
            this.setState({
                user: {
                    id: null,
                    name: '',
                    email: '',
                    role: '',
                }
            });
        });
    };

    componentDidMount() {
        new Promise((resolve, reject) => {
            this.props.loadUsersWatcher(resolve, reject);
        }).then(response => {
            this.setState({users: this.props.users.users})
            console.log('resolved ', response)
        }).catch(response => {
            console.log('rejected ', response)
        })
        // axios.get('/api/admin/users').then(response => {
        //     this.setState({
        //         users: response.data.data
        //     })
        // })
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
                                    <button className='btn btn-primary btn-sm mb-3 col-sm-3'
                                            onClick={this.createNewUser}>
                                        Create new user account
                                    </button>
                                </div>
                            </div>
                        </div>
                        <table className='card'>
                            <thead>
                            <tr className='card-header list-group-item list-group-item-action d-flex'>
                                <td className='badge badge-pill col-1'>id</td>
                                <td className='badge badge-pill col-2'>name</td>
                                <td className='badge badge-pill col-3'>email</td>
                                <td className='badge badge-pill col-3'>role</td>
                                <td className='badge badge-pill col-3'>created at</td>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map(user => (
                                <tr key={user.id}
                                    className='list-group-item list-group-item-action d-flex justify-content-between align-items-left'
                                    onClick={() => this.showUserInfo(user)}
                                >
                                    <td className='badge badge-pill col-1'>
                                        {user.id}
                                    </td>
                                    <td className='badge badge-pill col-2'>
                                        {user.name}
                                    </td>

                                    <td className='badge badge-primary badge-pill col-3'>
                                        {user.email}
                                    </td>
                                    <td className='badge badge-pill col-3'>
                                        {user.role}
                                    </td>
                                    <td className='badge badge-pill col-3'>
                                        {user.created_at}
                                    </td>

                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div id="user" className="col-md-4">
                        {(this.state.user) ?
                            <User user={this.state.user} unmountForm={this.handleFormUnmount}
                                  rerenderUsersList={this.rerenderList}/> : ''}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        user: store.user,
        users: store.users,
    }
}
const mapDispatchToProps = (dispatch) => {
    console.log('mapDispatchToProps when add');
    // return {
    //     setUser: (user) => setUser(user)(dispatch),
    // }
    return bindActionCreators({
        loadUsersWatcher
        // add other watcher sagas to this object to map them to props
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList)

