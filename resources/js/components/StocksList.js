import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

class StocksList extends Component {
    constructor() {
        super();
        this.state = {
            stocks: [],
            //viewForm: false,
        }
    }

    componentDidMount () {
        axios.get('/api/stocks').then(response => {
            this.setState({
                stocks: response.data
            })
        })
    }

    render() {
        const {stocks} = this.state
        return (
            <div className='container py-4'>
                <div className='row justify-content-left'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'>
                                <div className='row'>
                                    <div className='col-sm-8'>Users Table</div>
                                    <button className='btn btn-primary btn-sm mb-3 col-sm-3' onClick={this.createNewUser}>
                                        Add new stock info
                                    </button>
                                </div>
                            </div>
                            <div className='card-header'>
                                <div className='list-group-item d-flex justify-content-between align-items-left'>
                                    <span className='badge badge-pill'>id</span>
                                    <span className='badge badge-pill'>location</span>
                                    <span className='badge badge-pill'>capacity</span>
                                </div>
                            </div>

                            <div className='card-body'>
                                <ul className='list-group list-group-flush'>
                                    {stocks.map(stock=> (
                                        <Link
                                            to="#"
                                            className='list-group-item list-group-item-action d-flex justify-content-between align-items-left'
                                            onClick={() => this.showUserInfo(stock)}
                                        >
                                            <span id={stock.id} className='badge badge-pill'>
                                                {stock.id}
                                            </span>
                                            <span id={stock.id} className='badge badge-pill'>
                                                {stock.location}
                                            </span>

                                            <span id={stock.id} className='badge badge-pill'>
                                                {stock.capacity}
                                            </span>
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/*<div id="user" className="col-md-4">*/}
                    {/*{(this.state.user) ?*/}
                    {/*<User user={this.state.user} unmountForm = {this.handleFormUnmount} rerenderUsersList = {this.rerenderList}/> : ''}*/}
                    {/*</div>*/}
                </div>
            </div>
        );
    }
}

export default StocksList
