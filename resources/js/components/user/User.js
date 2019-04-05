import React, {Component} from 'react'
import axios from "axios";
import '../Style.css';
import {handleCreateUser, handleDeleteUser} from "../api";

class User extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userInfo: this.props.user,
            errors: null,
        }
        console.log('props.user ', this.props.user)
        this.handleRoleChange = this.handleRoleChange.bind(this);
    }

    isUserSaved = () => {
        return (this.state.userInfo.name === this.props.user.name &&
            this.state.userInfo.email === this.props.user.email &&
            this.state.userInfo.role === this.props.user.role);
    };

    selected = (event) => {
        if (this.state.userInfo.role === event.target.value) {
            event.target.selected = 'selected';
            return 'selected';
        }
    };

    inputChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            userInfo: {
                ...this.state.userInfo,
                [name]: value,
            }
        })
    };

    handleRoleChange(evt) {
        const value = evt.target.options[evt.target.selectedIndex].value;
        console.log(value);
        this.setState({
            userInfo: {
                ...this.state.userInfo,
                role: value,
            }
        }, function () {
            console.log(this.state.userInfo.role);
        });
    };

    handleSubmit = (evt) => {
        evt.preventDefault();
        handleCreateUser(this.state.userInfo).then(response => {
            console.log('fulfilled', response);
            console.log(response.data);
            this.props.rerenderUsersList(response.data);
        }).catch(response => {
            console.log('rejected', response);
            // this.setState({errors: response.response.data.errors})
            this.setState({errors: response.response.data}, function () {
                console.log('state ', this.state)
                $("div.failure").fadeIn(300).delay(1500).fadeOut(400);
            })
        })
        this.props.unmountForm()
    };

    deleteUser = (event) => {
        event.preventDefault();

        handleDeleteUser(this.state.userInfo.id).then(response => {
            this.props.rerenderUsersList(response.data);
        })
        this.props.unmountForm()
    }

    render() {
        const {userInfo} = this.state;
        const {unmountForm} = this.props;
        return (
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className='col-sm-10'>
                            {userInfo.id ? `UserID: ${userInfo.id}` : 'New User'}
                        </div>

                        <div className='col-sm-2'>
                            <button onClick={unmountForm}>&#x274C;</button>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        {/*<input type="hidden" name="_token" value={$('meta[name="csrf-token"]').attr('content')}/>*/}
                        <div className="form-group">
                            <label htmlFor="name" className="col-form-label text-md-left">Name</label>


                            <input id="name" type="text"
                                   className="form-control"
                                   name="name" value={userInfo.name} onChange={this.inputChange} required
                                   autoFocus/>

                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="col-form-label text-md-left">E-mail Address</label>


                            <input id="email" type="email"
                                   className="form-control"
                                   name="email" value={userInfo.email} onChange={this.inputChange}
                                   required/>

                            <div className='col-sm-12 center alert-box failure mt-2'>
                                {this.state.errors ? this.state.errors.errors.email[0] : ''}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="roles" className="col-form-label text-md-left">Role</label>

                            <select id="roles" value={userInfo.role} className="col-md-12"
                                    onChange={this.handleRoleChange}>
                                <option id="WORKER" value="ROLE_WORKER">Warehouse worker</option>
                                <option id="MANAGER" value="ROLE_MANAGER">Warehouse manager</option>
                                <option id="ADMIN" value="ROLE_ADMIN">Admin</option>
                            </select>
                        </div>
                        <div className="form-group row mb-4">
                            <div className="col-md-8 ">
                                <button id="save" type="submit" className="btn btn-primary"
                                        disabled={this.isUserSaved()}>
                                    Save
                                </button>
                                {userInfo.id ?
                                    <button id="delete" type="submit" className="btn btn-primary btn-danger mar"
                                            onClick={this.deleteUser}>
                                        Delete User
                                    </button> : ''}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default User
