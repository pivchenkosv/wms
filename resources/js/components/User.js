import React, {Component} from 'react'

class User extends Component {
    user;
    constructor(props) {
        super(props);
        console.log(props);
        this.user = this.props.user;
        this.state = {
            userInfo: this.props.user,
        }
        //this.handleUserChange = this.handleUserChange.bind(this);
        //this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
    }

    isUserChanged = () => {
        return (this.state.user === this.props.user);
    }

    inputChange = (event) => {
        const {name, value} = event.target;
        this.setState({
        userInfo: {
            ...this.state.userInfo,
            [name]: value,
        }})
    }

    handleRoleChange(evt) {
        this.user.role = evt.target.value;
        this.setState({
            user: this.user,
        });
    };

    render() {
        const {userInfo} = this.state;
        const {unmountForm} = this.props;
        return (
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className='col-sm-10'>{userInfo.id ?  `UserID: ${userInfo.id}` : '' }</div>
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
                            <label htmlFor="email" className="col-form-label text-md-left">E-mail
                                Address</label>


                            <input id="email" type="email"
                                   className="form-control"
                                   name="email" value={userInfo.email} onChange={this.inputChange}
                                   required/>

                        </div>
                        <div className="form-group">
                            <label htmlFor="roles" className="col-form-label text-md-left">Role</label>

                            <select id="roles" className="col-md-12" onChange={this.handleRoleChange}>
                                <option id="ROLE_WORKER">ROLE_WORKER</option>
                                <option id="ROLE_MANAGER">ROLE_MANAGER</option>
                                <option id="ROLE_ADMIN">ROLE_ADMIN</option>
                            </select>
                        </div>
                        <div className="form-group row mb-4">
                            <div className="col-md-6 ">
                                <button id="save" type="submit" className="btn btn-primary" disabled={this.isUserChanged()}>
                                    Save
                                </button>
                            </div>
                        </div>


                        {/*<div className="form-group row">*/}
                        {/*<label htmlFor="password"*/}
                        {/*className="col-md-4 col-form-label text-md-right">Password</label>*/}

                        {/*<div className="col-md-6">*/}
                        {/*<input id="password" type="password"*/}
                        {/*className="form-control"*/}
                        {/*name="password" value={this.state.password} onChange={this.handlePassChange}*/}
                        {/*required/>*/}
                        {/*</div>*/}
                        {/*</div>*/}

                        {/*<div className="form-group row">*/}
                        {/*<label htmlFor="password-confirm"*/}
                        {/*className="col-md-4 col-form-label text-md-right">Confirm Password</label>*/}

                        {/*<div className="col-md-6">*/}
                        {/*<input id="password-confirm" type="password" className="form-control"*/}
                        {/*name="password_confirmation" value={this.state.confirmPassword}*/}
                        {/*onChange={this.handleConfirmPassChange} required/>*/}
                        {/*</div>*/}
                        {/*</div>*/}
                    </form>
                </div>
            </div>
        )
    }
}

export default User
