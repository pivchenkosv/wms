import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {handleDeleteStock, handleEditStock, loadStocks} from "../api";

class StocksList extends Component {

    state = {
        stocks: [],
        selectedStock: null,
    }

    componentDidMount() {
        loadStocks().then(response => {
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
        handleEditStock(this.state.selectedStock.stock).then(response => {
            this.setState({
                stocks: response.data.data,
                selectedStock: null
            })
            $('div#message').fadeOut(300);
        }).catch(response => {
            this.setState({message: response.response.data.errors[Object.keys(response.response.data.errors)[0]][0]}, function () {
                const message = $('div#message').addClass('failure');
                message.fadeIn(300);
            })
        })
    };

    deleteStock = (evt) => {
        evt.preventDefault();
        if (this.state.selectedStock.stock.id !== 0) {
            if (this.state.selectedStock.cells.quantity > 0) {
                alert('First delete all cells related to this stock');
            } else {
                handleDeleteStock(this.state.selectedStock.stock.id).then(response => {
                    this.setState({
                        stocks: response.data.data,
                        selectedStock: null
                    })
                })
            }
        } else {
            this.setState(state => {
                const stocks = state.stocks.filter((stock) => 0 !== stock.stock.id);
                return {
                    stocks,
                };
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
        if (!this.state.selectedStock || (stock.stock.id !== this.state.selectedStock.stock.id))
            this.setState({selectedStock: null}, function () {
                this.setState({selectedStock: stock});
            });
    };

    selected = (stock) => {
        const {user} = this.props.user

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
                                    <div className='col-sm-7'>
                                        <span className='col-sm-2'>Stocks</span>
                                        <div id='message' className='alert-box success col-sm-9 mb-3 ml-3'>
                                            {this.state.message}
                                        </div>
                                    </div>
                                    {user.role !== 'ROLE_WORKER' ?
                                        <div className="col-sm-5">
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
                                    onClick={() => {
                                        this.editStock(stockInfo)
                                    }}>
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

export default withRouter(StocksList)
