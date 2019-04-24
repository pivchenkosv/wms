import React, {Component} from 'react';
import axios from "axios";

class Register extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    handleSubmit = (evt) => {
        evt.preventDefault();

        const params = new URLSearchParams();
        params.append('name', this.state.name);
        params.append('email', this.state.email);
        params.append('password', this.state.password);
        params.append('password_confirmation', this.state.confirmPassword);
        params.append('_token', $('meta[name="csrf-token"]').attr('content'));
        axios.post('api/register', params, {
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}
        })

    }

    handleInputChange = (evt) => {
        const {name, value} = evt.target
        this.setState({
            [name]: value
        })
    }

    render() {

        return (
            <div className="Register">
                <div className="container py-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">Register</div>

                                <div className="card-body">
                                    <form onSubmit={this.handleSubmit}>
                                        <input type="hidden" name="_token"
                                               value={$('meta[name="csrf-token"]').attr('content')}/>
                                        <div className="form-group row">
                                            <label htmlFor="name"
                                                   className="col-md-4 col-form-label text-md-right">Name</label>

                                            <div className="col-md-6">
                                                <input id="name" type="text"
                                                       className="form-control"
                                                       name="name" value={this.state.name}
                                                       onChange={this.handleInputChange} required autoFocus/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-mail
                                                Address</label>

                                            <div className="col-md-6">
                                                <input id="email" type="email"
                                                       className="form-control"
                                                       name="email" value={this.state.email}
                                                       onChange={this.handleInputChange} required/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="password"
                                                   className="col-md-4 col-form-label text-md-right">Password</label>

                                            <div className="col-md-6">
                                                <input id="password" type="password"
                                                       className="form-control"
                                                       name="password" value={this.state.password}
                                                       onChange={this.handleInputChange} required/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="password-confirm"
                                                   className="col-md-4 col-form-label text-md-right">Confirm
                                                Password</label>

                                            <div className="col-md-6">
                                                <input id="password-confirm" type="password" className="form-control"
                                                       name="confirmPassword" value={this.state.confirmPassword}
                                                       onChange={this.handleInputChange} required/>
                                            </div>
                                        </div>

                                        <div className="form-group row mb-0">
                                            <div className="col-md-6 offset-md-4">
                                                <button type="submit" className="btn btn-primary">
                                                    Register
                                                </button>
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

export default Register

