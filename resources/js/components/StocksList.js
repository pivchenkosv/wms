import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

class StocksList extends Component {
    constructor() {
        super();
        this.state = {
            stocks: [],
            selectedStock: null,
            //viewForm: false,
        }
    }

    componentDidMount() {
        axios.get('/api/stocks').then(response => {
            this.setState({
                stocks: response.data
            })
        })
    }

    isValueChanged = (stock) => {
        return (stock.location === this.state.selectedStock.location);
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
                stocks: response.data,
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
            if (this.state.selectedStock.cells.quantity > 0)
            {
                alert('First delete all cells related to this stock');
            } else {
                params.append('id', this.state.selectedStock.stock.id);
                axios.post('/api/delStock', params).then(response => {
                    console.log('fulfilled', response);
                    console.log(response.data);
                    this.setState({
                        stocks: response.data,
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
        }, function () {
            console.log(this.state)
        })
    };

    selected = (stock) => {
        // this.setState({stock: stock})
        if (this.state.selectedStock && this.state.selectedStock.stock.id === stock.stock.id) {

            return (
                <div className="row" style={{width: '50%'}}>
                    <input id={stock.stock.id} name="location" autoFocus onFocus={() => this.setState({selectedStock: stock})}
                           value={this.state.selectedStock.stock.location} style={{width: '80%'}}
                           onChange={this.inputChange}/>
                    <button className="btn btn-primary" style={{width: '20%'}} disabled={this.isValueChanged(stock.stock)}
                            onClick={this.handleSubmit}>
                        Save
                    </button>
                </div>
            );
        } else {
            return (
                <span id={stock.id} className='badge badge-pill editable'
                      onClick={() => this.setState({selectedStock: stock})} style={{width: '50%'}}>
                        {stock.stock.location}
                    </span>
            );
        }
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
                                    <div className='col-sm-6'>Stocks</div>
                                    <button className='btn btn-primary btn-sm mb-3 col-sm-3'
                                            onClick={this.createNewStock}>
                                        Add new stock info
                                    </button>
                                    <button className='btn btn-danger btn-sm mb-3 col-sm-2'
                                            onClick={this.deleteStock} style={{margin: '0 0 0 5px'}}
                                            disabled={!this.state.selectedStock}>
                                        RemoveStock
                                    </button>
                                </div>
                            </div>
                            <div className='card-header'>
                                <div className='list-group-item d-flex justify-content-between align-items-left'>
                                    <span className='badge badge-pill' style={{width: '10%'}}>id</span>
                                    <span className='badge badge-pill' style={{width: '50%'}}>Location</span>
                                    <span className='badge badge-pill' style={{width: '20%'}}>Total cells count</span>
                                    <span className='badge badge-pill' style={{width: '20%'}}>Cells in use</span>
                                </div>
                            </div>

                            <div className='card-body'>
                                <ul className='list-group list-group-flush'>
                                    {stocks.map(stockInfo => (
                                        <div
                                            className='list-group-item list-group-item-action d-flex justify-content-between align-items-left'>
                                            <span id={stockInfo.stock.id} className='badge badge-pill'
                                                  style={{width: '10%'}}>
                                                {stockInfo.stock.id}
                                            </span>
                                            {/*<span id={stockInfo.stock.id} className='badge badge-pill editable'>*/}
                                            {/*{stockInfo.stock.location}*/}
                                            {/*</span>*/}
                                            {this.selected(stockInfo)}

                                            <span id={stockInfo.stock.id} className='badge badge-pill'
                                                  style={{width: '20%'}}>
                                                {stockInfo.cells.quantity}
                                            </span>
                                            <span id={stockInfo.stock.id} className='badge badge-pill'
                                                  style={{width: '20%'}}>
                                                {stockInfo.cells.in_use}
                                            </span>
                                        </div>
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
