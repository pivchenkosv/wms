import React, {Component} from 'react';
import axios from "axios";
import {Link, withRouter} from "react-router-dom";
import Cell from "./Cell";
import {connect} from "react-redux";

class CellsList extends Component {
    constructor() {
        super();
        this.state = {
            cells: [],
            cell: null,
            showStocks: false,
            stocks: []
        }
    }

    componentDidMount() {
        axios.get('/api/cells').then(response => {
            this.setState({
                cells: response.data.data
            })
        })
        axios.get('/api/stocks').then(response => {
            this.setState({
                stocks: response.data.data
            })
        })
    }

    toggleStocks = () => {
        this.setState({showStocks: !this.state.showStocks})
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        const params = new URLSearchParams();
        if (this.state.cell.id !== 0)
            params.append('id', this.state.cell.id);
        params.append('volume', this.state.cell.volume);
        params.append('status', this.state.cell.status);
        params.append('stock_id', this.state.cell.stock_id)
        axios.post('/api/editCell', params).then(response => {
            console.log('fulfilled', response);
            console.log(response.data);
            this.setState({
                cells: response.data.data,
                cell: null
            })
        }).catch(response => {
            console.log('rejected', response);
            console.log(response.data);
        })
    }

    showCellInfo(cell) {
        if (!this.state.cell || cell.id !== this.state.cell.id)
            this.setState({cell: null}, function () {
                this.setState({cell: cell});
            });
    };

    setStockId = (stockId) => {
        this.setState({
            cell: {
                ...this.state.cell,
                stock_id: stockId
            }
        })
        this.toggleStocks()
    }

    handleFormUnmount = () => {
        this.setState({cell: null});
    }

    rerenderList = (cells) => {
        this.setState({cells: cells});
    }

    isValueChanged = (cell) => {
        return (cell.volume == this.state.cell.volume &&
            cell.status == this.state.cell.status &&
            cell.stock_id == this.state.cell.stock_id);
    };

    inputChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            cell: {
                ...this.state.cell,
                [name]: value,
            }
        })
    };

    createNewCell = () => {
        const newCell = {
            id: 0,
            stock_id: 0,
            volume: 5,
            status: 'FREE'
        }
        this.setState({
            cells: [...this.state.cells, newCell],
            cell: newCell,
        })
    }

    handleDelete = (evt) => {
        evt.preventDefault();
        const params = new URLSearchParams();
        if (this.state.cell.id !== 0) {
            params.append('id', this.state.cell.id);
            axios.post('/api/delCell', params).then(response => {
                console.log(response.data)
                this.setState({
                    cells: response.data.data,
                    cell: null
                })
            }).catch(response => {
                console.log('rejected', response);
                console.log(response.data);
            })

        } else {
            this.setState(state => {
                const cells = state.cells.filter((cell) => 0 !== cell.id);

                return {
                    cells,
                };
            }, function () {
                console.log(this.state);
            });
        }
    }

    stocksList = () => {

        return (
            <div>
                <div className='card card-header'>
                    <div className='row'>
                        <span className='col-sm-6'>Select Stock</span>
                    </div>
                </div>
                <table className='card'>
                    <thead>
                    <tr className='card-header list-group-item list-group-item-action d-flex justify-content-between align-items-left'>
                        <th className='badge badge-pill col-2'>id</th>
                        <th className='badge badge-pill col-6'>Location</th>
                        <th className='badge badge-pill col-2'>Total cells count</th>
                        <th className='badge badge-pill col-2'>Cells in use</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.stocks.map(stockInfo => (
                        <tr
                            key={stockInfo.stock.id}
                            className='list-group-item list-group-item-action d-flex justify-content-between align-items-left'
                            onClick={() => this.setStockId(stockInfo.stock.id)}>
                            <td id={stockInfo.stock.id} className='badge-pill col-2 text-center'>
                                {stockInfo.stock.id}
                            </td>
                            <td className='badge-pill col-6'>
                                {stockInfo.stock.location}
                            </td>

                            <td className='badge-pill col-2 text-center'>
                                {stockInfo.cells.quantity}
                            </td>
                            <td className='badge-pill col-2 text-center'>
                                {stockInfo.cells.in_use}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>


            </div>
        );
    }

    selected = (cell) => {
        const {user} = this.props.user

        if (user.role !== 'ROLE_WORKER' && this.state.cell && this.state.cell.id === cell.id) {
            return (
                <div
                    key={cell.id}
                    className='list-group-item list-group-item-action justify-content-between'
                    onClick={() => this.showCellInfo(cell)}
                >
                    <div className='row'>
                        <div className='col-2 pl-0 pr-2'>
                            <button className="btn btn-primary col-12 mb-1 p-0 text-size"
                                    disabled={this.isValueChanged(cell)}
                                    onClick={this.handleSubmit}>
                                Save
                            </button>
                            <button className="btn btn-danger col-12 p-0 text-size"
                                    onClick={this.handleDelete}>
                                Delete
                            </button>
                        </div>
                        <button className="btn col-2 text-size"
                                onClick={this.toggleStocks}
                                value={this.state.cell.stock_id}>
                            {this.state.cell.stock_id}
                        </button>
                        <div className="col-4 text-size pt-2">
                            <input name="volume" type="number" value={this.state.cell.volume} min="1" max="20"
                                   onChange={this.inputChange}/>
                        </div>
                        <div className="col-4 text-size pt-2 text-center">
                            <select name="status" value={this.state.cell.status}
                                    onChange={this.inputChange}>
                                <option value="FREE">Free</option>
                                <option value="BUSY">Busy</option>
                                <option value="RESERVED">Reserved</option>
                            </select>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div
                    key={cell.id}
                    className='list-group-item list-group-item-action justify-content-between'
                    onClick={() => this.showCellInfo(cell)}
                >
                    <div className='row text-center font-weight-bold'>


                    <span className='badge-pill col-2 font-weight-bold text-size'>
                        {cell.id}
                    </span>
                        <span className='badge-pill font-weight-bold col-2 text-size'>
                        {cell.stock_id}
                    </span>
                        <span className='badge-pill col-4 font-weight-bold text-size'>
                        {cell.volume}
                    </span>
                        <span className='badge-pill badge-primary col-4 font-weight-bold text-size'>
                        {cell.status}
                    </span>
                    </div>
                </div>

            );
        }
    }

    render() {
        const {cells} = this.state
        const {user} = this.props.user
        return (
            <div className='container py-4'>
                <div className='row justify-content-left'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>
                                <div className='row'>
                                    <div className='col-sm-8'>Cells</div>
                                    {user.role !== 'ROLE_WORKER' ?
                                        <button className='btn btn-primary btn-sm mb-3 col-sm-3'
                                                onClick={this.createNewCell}>
                                            Create new cell
                                        </button> : ''
                                    }
                                </div>
                            </div>
                            <div className='card-header'>
                                <div className='list-group-item justify-content-between'>
                                    <div className='row font-weight-bold text-center'>
                                        <span className='badge-pill col-2'>id</span>
                                        <span className='badge-pill col-2'>stockID</span>
                                        <span className='badge-pill col-4'>volume</span>
                                        <span className='badge-pill col-4'>status</span>
                                    </div>
                                </div>
                            </div>
                            <div className='card-body'>
                                {cells.map(cell => (
                                    this.selected(cell)
                                ))}
                            </div>
                        </div>
                    </div>
                    <div id="cell" className="col-md-6">
                        {this.showInfoTable()}
                    </div>
                </div>
            </div>
        );
    }

    showInfoTable = () => {
        const {cell, showStocks} = this.state;
        if (!cell) {
            return null;
        }
        if (showStocks) {
            return this.stocksList()
        }
        return (
            <Cell cellId={this.state.cell.id} unmountForm={this.handleFormUnmount}
                  rerenderCellsList={this.rerenderList}/>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        user: store.user
    }
}

export default connect(mapStateToProps, null)(withRouter(CellsList))