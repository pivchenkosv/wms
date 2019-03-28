import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {hashHistory} from 'react-router';

class Login extends Component {

    state = {
            email: '',
            password: '',
            error: '',
            toDashboard: false,
    };

    handleSubmit = (evt) => {
        evt.preventDefault();
        if (!this.state.email) {
            return this.setState({error: 'Username is required'});
        }

        if (!this.state.password) {
            return this.setState({error: 'Password is required'});
        }
        new Promise((resolve, reject) => {
            this.props.loginWatcher({
                email: this.state.email,
                password: this.state.password
            }, resolve, reject);
        }).then(response => {
            console.log('resolved', response)
            if (this.props.user) {
                console.log('should be redirected');
                window.location.reload()
            }
            this.setState({error: null})
        }).catch(response => {
            console.log('rejected: ', response);
            this.setState({error: response.response.data.message}, function () {
                $( "div.failure" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
            })
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
                                        {this.state.error ?
                                            <div className='col-8 alert-box failure'>
                                                {this.state.error}
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
                                                <a className="btn btn-link" href="password/reset">
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

