import React, {Component} from 'react';
import axios from "axios";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";

class StocksList extends Component {
    constructor() {
        super();
        this.state = {
            stocks: [],
            selectedStock: null,
        }
    }

    componentDidMount() {
        axios.get('/api/stocks').then(response => {
            this.setState({
                stocks: response.data.data
            })
        })
    }

    isValueChanged = (stock) => {
        return (stock.stock.location === this.state.selectedStock.stock.location);
    };

    createNewStock = () => {
        const emptyStock = {
            stock: {
                id: 0,
                location: 'Add location info',
                capacity: 0
            },
            cells: {
                in_use: 0,
                quantity: 0
            }
        }
        this.setState({
            stocks: [...this.state.stocks, emptyStock],
            selectedStock: emptyStock
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        const params = new URLSearchParams();
        if (this.state.selectedStock.stock.id !== 0)
            params.append('id', this.state.selectedStock.stock.id);
        params.append('location', this.state.selectedStock.stock.location);
        axios.post('/api/editStock', params).then(response => {
            console.log('fulfilled', response);
            console.log(response.data);
            this.setState({
                stocks: response.data.data,
                selectedStock: null
            })
        }).catch(response => {
            console.log('rejected', response);
            console.log(response.data);
        })
    };

    deleteStock = (evt) => {
        evt.preventDefault();
        const params = new URLSearchParams();
        if (this.state.selectedStock.stock.id !== 0) {
            if (this.state.selectedStock.cells.quantity > 0) {
                alert('First delete all cells related to this stock');
            } else {
                params.append('id', this.state.selectedStock.stock.id);
                axios.post('/api/delStock', params).then(response => {
                    console.log('fulfilled', response);
                    console.log(response.data);
                    this.setState({
                        stocks: response.data.data,
                        selectedStock: null
                    })
                }).catch(response => {
                    console.log('rejected', response);
                    console.log(response.data);
                })
            }
        } else {
            this.setState(state => {
                const stocks = state.stocks.filter((stock) => 0 !== stock.stock.id);

                return {
                    stocks,
                };
            }, function () {
                console.log(this.state);
            });
        }
    }

    inputChange = (event) => {
        const {name, value} = event.target;
        let selectedStock = {...this.state.selectedStock}
        selectedStock.stock.location = value;
        this.setState({
            selectedStock: selectedStock
            })
    };

    editStock(stock) {
        if (!this.state.selectedStock || stock.stock.id !== this.state.selectedStock.stock.id)
            this.setState({selectedStock: null}, function () {
                this.setState({selectedStock: stock}, function () {
                    console.log('state.stock ', this.state.selectedStock)
                    console.log('stock ', stock);
                });

            });
    };

    selected = (stock) => {
        const {user} = this.props.user
        console.log(stock)

        if (user.role !== 'ROLE_WORKER' && this.state.selectedStock && this.state.selectedStock.stock.id === stock.stock.id) {

            return (
                <td className="col-6 badge-pill">
                    <input name="location" className='col-10' autoFocus
                           value={this.state.selectedStock.stock.location}
                           onChange={this.inputChange}/>
                    <button className="btn btn-primary col-2 p-1 align-baseline"
                            onClick={this.handleSubmit}>
                        Save
                    </button>
                </td>
            );
        } else {
            return (
                <td className='col-6 badge-pill'>
                    {stock.stock.location}
                </td>
            );
        }
    }

    render() {

        const {stocks} = this.state
        const {user} = this.props.user

        return (
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'>
                                <div className='row'>
                                    <div className='col-sm-6'>Stocks</div>
                                    {user.role !== 'ROLE_WORKER' ?
                                        <div className="col-sm-6">
                                            <button className='btn btn-primary btn-sm mb-3 col-sm-6'
                                                    onClick={this.createNewStock}>
                                                Add new stock info
                                            </button>
                                            <button className='btn btn-danger btn-sm mb-3 col-sm-5 ml-1'
                                                    onClick={this.deleteStock}
                                                    disabled={!this.state.selectedStock}>
                                                RemoveStock
                                            </button>
                                        </div> : ''
                                    }
                                </div>

                            </div>
                        </div>
                        <table className='card'>
                            <thead>
                            <tr className='card-header list-group-item d-flex justify-content-between align-items-left'>
                                <th className='badge-pill col-2'>id</th>
                                <th className='badge-pill col-6'>Location</th>
                                <th className='badge-pill col-2'>Total cells count</th>
                                <th className='badge-pill col-2'>Cells in use</th>
                            </tr>
                            </thead>
                            <tbody>
                            {stocks.map(stockInfo => (
                                <tr
                                    key={stockInfo.stock.id}
                                    className='list-group-item list-group-item-action d-flex justify-content-between align-items-left'
                                    onClick={() => {this.editStock(stockInfo)}}>
                                    <td className='badge-pill col-2'>
                                        {stockInfo.stock.id}
                                    </td>

                                    {this.selected(stockInfo)}

                                    <td className='badge-pill col-2'>
                                        {stockInfo.cells.quantity}
                                    </td>
                                    <td className='badge-pill col-2'>
                                        {stockInfo.cells.in_use}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
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

export default connect(mapStateToProps, null)(withRouter(StocksList))
