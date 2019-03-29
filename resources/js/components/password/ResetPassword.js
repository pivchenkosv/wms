import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {resetPasswordApi} from "../api";

class ResetPassword extends Component {

    state = {
        email: null
    }

    handleInputChange = (evt) => {
        const {name, value} = evt.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        resetPasswordApi(this.state.email);
        this.props.history.push('/login')
    }

    render(){

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
                                                   name="email" value={this.state.email} onChange={this.handleInputChange} required/>
                                        </div>
                                    </div>

                                    <div className="form-group row mb-0">
                                        <div className="col-md-6 offset-md-4">
                                            <button type="submit" className="btn btn-primary">
                                                Send Password Reset Link
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

export default withRouter(ResetPassword)
