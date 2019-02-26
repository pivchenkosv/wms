import React, {Component} from 'react';
import axios from "axios";
import { Redirect } from 'react-router-dom';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            error: '',
            toDashboard: false,
        };

        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dismissError = this.dismissError.bind(this);
    }

    dismissError() {
        this.setState({error: ''});
    }

    handleSubmit(evt) {
        evt.preventDefault();
        if (!this.state.email) {
            return this.setState({error: 'Username is required'});
        }

        if (!this.state.password) {
            return this.setState({error: 'Password is required'});
        }
        console.log(this.state);
        const params = new URLSearchParams();
        params.append('email', this.state.email);
        params.append('password', this.state.password);
        params.append('_token',$('meta[name="csrf-token"]').attr('content'));
        axios.post('api/login', params, {
            headers : {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}
        }).then(response => {
            console.log(response);
            console.log(response.data);
            this.setState({
                toDashboard: true
            })
            // return <Redirect to='/home' />;
        }).catch(response => {
            console.log(response);
            console.log(response.data);
        })
        return this.setState({error: ''});
    }

    handleUserChange(evt) {
        this.setState({
            email: evt.target.value,
        });
    };

    handlePassChange(evt) {
        this.setState({
            password: evt.target.value,
        });
    }

    render() {

        if (this.state.toDashboard === true) {
            return <Redirect to='/home' />
        }
        return (
            <div className="Login">
                <div className="container py-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">Login</div>
                                <div className="card-body">
                                    <form onSubmit={this.handleSubmit}>
                                        <input type="hidden" name="_token" value={$('meta[name="csrf-token"]').attr('content')} />
                                        <div className="form-group">
                                            <label htmlFor="email" className="col-md-12 col-form-label text-md-left">E-Mail
                                                Address</label>
                                            <div className="col-md-12">
                                                <input id="email" type="email"
                                                       className="form-control"
                                                       name="email" value={this.state.email} onChange={this.handleUserChange} required autoFocus/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password"
                                                   className="col-md-12 col-form-label text-md-left">Password</label>
                                            <div className="col-md-12">
                                                <input id="password" type="password"
                                                       className="form-control"
                                                       name="password" value={this.state.password} onChange={this.handlePassChange} required/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-md-8 offset-md-2">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" name="remember" id="remember"/>
                                                        <label className="form-check-label" htmlFor="remember">
                                                            Remember Me
                                                        </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row mb-0">
                                            <div className="col-md-12 offset-md-2">
                                                <button type="submit" className="btn btn-primary">Login</button>
                                                <a className="btn btn-link" href="password/request">
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
export default Login

