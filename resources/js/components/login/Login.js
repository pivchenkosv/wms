import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class Login extends Component {

    state = {
        email: '',
        password: '',
        error: '',
    };

    handleSubmit = (evt) => {
        // this.props.history.push('/tasks')
        evt.preventDefault();
        if (!this.state.email) {
            return this.setState({error: 'Username is required'});

        }
        if (!this.state.password) {
            return this.setState({error: 'Password is required'});
        }
        new Promise((resolve) => {
            this.props.loginWatcher({
                email: this.state.email,
                password: this.state.password,
                history: this.props.history,
                resolve: resolve
            })
        }).then(() => {
            this.props.history.push('/tasks')
        })
    }

    handleUserChange = (evt) => {
        this.setState({
            email: evt.target.value,
        });
    };

    handlePassChange = (evt) => {
        this.setState({
            password: evt.target.value,
        });
    }

    render() {

        const {history} = this.props

        return (
            <div className="Login">
                <div className="container py-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">
                                    <div className='row'>
                                        <div className="col-2">
                                            Login
                                        </div>
                                        {this.props.message.message ?
                                            <div className='col-8 alert-box failure'>
                                                {this.props.message.message}
                                            </div> : ''}
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.handleSubmit}>
                                        <input type="hidden" name="_token"
                                               value={$('meta[name="csrf-token"]').attr('content')}/>
                                        <div className="form-group">
                                            <label htmlFor="email" className="col-md-12 col-form-label text-md-left">E-Mail
                                                Address</label>
                                            <div className="col-md-12">
                                                <input id="email" type="email"
                                                       className="form-control"
                                                       name="email" value={this.state.email}
                                                       onChange={this.handleUserChange} required autoFocus/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password"
                                                   className="col-md-12 col-form-label text-md-left">Password</label>
                                            <div className="col-md-12">
                                                <input id="password" type="password"
                                                       className="form-control"
                                                       name="password" value={this.state.password}
                                                       onChange={this.handlePassChange} required/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-md-8 offset-md-2">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" name="remember"
                                                           id="remember"/>
                                                    <label className="form-check-label" htmlFor="remember">
                                                        Remember Me
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row mb-0">
                                            <div className="col-md-12 offset-md-2">
                                                <button type="submit" className="btn btn-primary">Login</button>
                                                <a className="btn btn-link" onClick={() => {
                                                    history.push('password/reset')
                                                }}>
                                                    Forgot Your Password?
                                                </a>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Login)

