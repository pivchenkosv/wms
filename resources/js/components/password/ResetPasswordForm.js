import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {submitPasswordReset} from "../api";

class ResetPasswordForm extends Component {

    state = {
        token: this.props.match.params.token,
        email: null,
        password: null,
        passwordConfirmation: null,
    }

    handleInputChange = (evt) => {
        const {name, value} = evt.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        submitPasswordReset(this.state).then(response => {
            this.props.history.push('/login')
        });
    }

    render()
    {

        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Reset Password</div>

                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>

                                        <div className="form-group row">
                                            <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                                            <div className="col-md-6">
                                                <input id="email" type="email"
                                                       className="form-control"
                                                       name="email" value={this.state.email}
                                                       onChange={this.handleInputChange}
                                                       required
                                                       autoFocus/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="password"
                                                   className="col-md-4 col-form-label text-md-right">Password</label>

                                            <div className="col-md-6">
                                                <input id="password" type="password"
                                                       className="form-control"
                                                       value={this.state.password}
                                                       onChange={this.handleInputChange}
                                                       name="password" required/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="password-confirm"
                                                   className="col-md-4 col-form-label text-md-right">Confirm Password</label>

                                            <div className="col-md-6">
                                                <input id="password-confirm" type="password" className="form-control"
                                                       name="passwordConfirmation"
                                                       value={this.state.passwordConfirmation}
                                                       onChange={this.handleInputChange}
                                                       required/>
                                            </div>
                                        </div>

                                        <div className="form-group row mb-0">
                                            <div className="col-md-6 offset-md-4">
                                                <button type="submit" className="btn btn-primary">
                                                    Reset Password
                                                </button>
                                            </div>
                                        </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ResetPasswordForm)