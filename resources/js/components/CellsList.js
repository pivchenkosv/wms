import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

class CellsList extends Component {
    constructor() {
        super();
        this.state = {
            cells: [],
            //viewForm: false,
        }
    }

    componentDidMount () {
        axios.get('/api/cells').then(response => {
            this.setState({
                cells: response.data
            })
        })
    }

    render() {
        const {cells} = this.state
        return (
            <div className='container py-4'>
                <div className='row justify-content-left'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'>
                                <div className='row'>
                                    <div className='col-sm-8'>Users Table</div>
                                    <button className='btn btn-primary btn-sm mb-3 col-sm-3' onClick={this.createNewUser}>
                                        Create new cell
                                    </button>
                                </div>
                            </div>
                            <div className='card-header'>
                                <div className='list-group-item d-flex justify-content-between align-items-left'>
                                    <span className='badge badge-pill'>id</span>
                                    <span className='badge badge-pill'>volume</span>
                                    <span className='badge badge-pill'>status</span>
                                    <span className='badge badge-pill'>stockID</span>
                                </div>
                            </div>

                            <div className='card-body'>
                                <ul className='list-group list-group-flush'>
                                    {cells.map(cell=> (
                                        <Link
                                            to="#"
                                            className='list-group-item list-group-item-action d-flex justify-content-between align-items-left'
                                            onClick={() => this.showUserInfo(cell)}
                                        >
                                            <span id={cell.id} className='badge badge-pill'>
                                                {cell.id}
                                            </span>
                                            <span id={cell.id} className='badge badge-pill'>
                                                {cell.volume}
                                            </span>

                                            <span id={cell.id} className='badge badge-primary badge-pill'>
                                                {cell.status}
                                            </span>
                                            <span id={cell.id} className='badge badge-pill'>
                                                {cell.stock_id}
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

export default CellsList
