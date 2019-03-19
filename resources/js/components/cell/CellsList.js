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
            //viewForm: false,
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
                        <th className='badge badge-pill col-2' style={{width: '10%'}}>id</th>
                        <th className='badge badge-pill col-6' style={{width: '50%'}}>Location</th>
                        <th className='badge badge-pill col-2' style={{width: '20%'}}>Total cells count</th>
                        <th className='badge badge-pill col-2' style={{width: '20%'}}>Cells in use</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.stocks.map(stockInfo => (
                        <tr
                            key={stockInfo.stock.id}
                            className='list-group-item list-group-item-action d-flex justify-content-between align-items-left'
                            onClick={() => this.setStockId(stockInfo.stock.id)}>
                            <td id={stockInfo.stock.id} className='badge-pill'
                                style={{width: '10%'}}>
                                {stockInfo.stock.id}
                            </td>
                            <td className='badge-pill'
                                style={{width: '50%'}}>
                                {stockInfo.stock.location}
                            </td>

                            <td className='badge-pill'
                                style={{width: '20%'}}>
                                {stockInfo.cells.quantity}
                            </td>
                            <td className='badge-pill'
                                style={{width: '20%'}}>
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
        const {user} = this.props

        if (user.role !== 'ROLE_WORKER' && this.state.cell && this.state.cell.id === cell.id) {
            return (
                <div className="col-8 badge">
                    <button className="btn badge col-4"
                            style={{width: '20%', align: "right", fontSize: "11px"}}
                            onClick={this.toggleStocks}
                            value={this.state.cell.stock_id}>
                        {this.state.cell.stock_id}
                    </button>
                    <div className="col-3 badge">
                        <input name="volume" type="number" value={this.state.cell.volume} min="1" max="20"
                               style={{width: "100%", fontSize: "11px"}} onChange={this.inputChange}/>
                    </div>
                    <div className="col-5 badge">
                        <select name="status" value={this.state.cell.status} style={{width: "100%", fontSize: "11px"}}
                                onChange={this.inputChange}>
                            <option value="FREE">Free</option>
                            <option value="BUSY">Busy</option>
                            <option value="RESERVED">Reserved</option>
                        </select>
                    </div>
                    <button className="btn btn-primary badge col-4"
                            style={{width: '20%', align: "right", fontSize: "11px"}}
                            disabled={this.isValueChanged(cell)}
                            onClick={this.handleSubmit}>
                        Save
                    </button>
                    <button className="btn btn-danger badge col-4"
                            style={{width: '20%', align: "right", fontSize: "11px", marginLeft: "2px"}}
                            onClick={this.handleDelete}>
                        Delete
                    </button>
                </div>
            );
        } else {
            return (
                <div className="col-8 badge">
                    <span className='badge col-3' style={{fontSize: "11px"}}>
                        {cell.stock_id}
                    </span>
                    <span className='badge col-4' style={{fontSize: "11px"}}>
                        {cell.volume}
                    </span>
                    <span className='badge badge-primary col-5' style={{fontSize: "11px"}}>
                        {cell.status}
                    </span>
                </div>

            );
        }
    }

    render() {
        const {cells} = this.state
        const {user} = this.props
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
                                <div className='list-group-item justify-content-between align-items-left'>
                                    <span className='badge badge-pill col-2'>id</span>
                                    <span className='badge badge-pill col-2'>stockID</span>
                                    <span className='badge badge-pill col-3'>volume</span>
                                    <span className='badge badge-pill col-3'>status</span>
                                </div>
                            </div>
                            <div className='card-body'>
                                <ul className='list-group list-group-flush'>
                                    {cells.map(cell => (
                                        <div
                                            key={cell.id}
                                            className='list-group-item list-group-item-action justify-content-between align-items-left'
                                            onClick={() => this.showCellInfo(cell)}
                                        >
                                                <span className='badge col-2'>
                                                    {cell.id}
                                                </span>
                                            {this.selected(cell)}
                                            <div className="dropdown-content">

                                            </div>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div id="cell" className="col-md-6">
                        {(this.state.cell) ?
                            (this.state.showStocks) ?
                                this.stocksList()
                                :
                                <Cell cellId={this.state.cell.id} unmountForm={this.handleFormUnmount}
                                      rerenderCellsList={this.rerenderList}/>
                            : ''}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        user: store.user
    }
}

export default connect(mapStateToProps, null)(withRouter(CellsList))
