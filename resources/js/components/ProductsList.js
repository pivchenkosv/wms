import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

class ProductsList extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            product: null,
        }
    }

    componentDidMount() {
        axios.get('/api/products').then(response => {
            this.setState({
                products: response.data
            })
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        const params = new URLSearchParams();
        if (this.state.product.id !== 0)
            params.append('id', this.state.product.id);
        params.append('name', this.state.product.name);
        params.append('description', this.state.product.description);
        params.append('volume', this.state.product.volume)
        axios.post('/api/editProduct', params).then(response => {
            console.log('fulfilled', response);
            console.log(response.data);
            this.setState({
                products: response.data,
                product: null
            })
        }).catch(response => {
            console.log('rejected', response);
            console.log(response.data);
        })
    }

    editProduct(product) {
        if (!this.state.product || product.id !== this.state.product.id)
            this.setState({product: null}, function () {
                this.setState({product: product});
            });
    };

    handleDelete = (evt) => {
        evt.preventDefault();
        const params = new URLSearchParams();
        if (this.state.product.id !== 0) {
            params.append('id', this.state.product.id);
            axios.post('/api/delProduct', params).then(response => {
                console.log('fulfilled', response);
                console.log(response.data);
                this.setState({
                    products: response.data,
                    product: null
                })
            }).catch(response => {
                console.log('rejected', response);
                console.log(response.data);
            })

        } else {
            this.setState(state => {
                const products = state.products.filter((product) => 0 !== product.id);

                return {
                    products,
                };
            }, function () {
                console.log(this.state);
            });
        }
    }

    inputChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            product: {
                ...this.state.product,
                [name]: value,
            }
        })
    };

    isValueChanged = (product) => {
        if (product.name == this.state.product.name &&
            product.description == this.state.product.description &&
            product.volume == this.state.product.volume){
            return (
                <button className="btn btn-primary badge col-1"
                        style={{marginLeft: "5%", marginRight: "5%", fontSize: "11px"}}
                        onClick={() => this.setState({product: null})}>
                    {'\u2718'}
                </button>
            );
        } else {
            return (
                <button className="btn btn-primary badge col-1"
                        style={{marginLeft: "5%", marginRight: "5%", fontSize: "11px"}}
                        onClick={this.handleSubmit}>
                    {'\u2714'}
                </button>
            );
        };
    };

    createNewProduct = () => {
        const newProduct = {
            id: 0,
            name: '',
            description: '',
            volume: 5,
        }
        if (!this.state.products.find((product) => {
            return product.id === 0
        })) {
            this.setState({
                products: [...this.state.products, newProduct],
                product: newProduct,
            })
        }
    }

    selected = (product) => {
        // this.setState({stock: stock})
        if (this.state.product && this.state.product.id === product.id) {

            return (
                <Link
                    to="#"
                    className='list-group-item list-group-item-action d-flex justify-content-between align-items-left'
                    onClick={() => this.editProduct(product)}
                >
                    {/*<input id={stock.stock.id} name="location" autoFocus onFocus={() => this.setState({selectedStock: stock})}*/}
                    {/*value={this.state.selectedStock.stock.location} style={{width: '80%'}}*/}
                    {/*onChange={this.inputChange}/>*/}
                    {/*<span id={product.id} className='badge badge-pill col-2'>*/}
                                                {/*{product.id}*/}
                                            {/*</span>*/}
                    {this.isValueChanged(product)}
                    <input id={product.id} name="name"
                           value={this.state.product.name}
                           className="col-4"
                           onChange={this.inputChange}/>
                    <input id={product.id} name="description"
                           className="col-4"
                           value={this.state.product.description}
                           onChange={this.inputChange}/>
                    <input id={product.id} name="volume" type="number" value={this.state.product.volume} min="1" max="20"
                           className="col-2" onChange={this.inputChange}/>

                </Link>
            );
        } else {
            return (
                <Link
                    to="#"
                    className='list-group-item list-group-item-action d-flex justify-content-between align-items-left'
                    onClick={() => this.editProduct(product)}
                >
                    <span id={product.id} className='badge badge-pill col-2'>
                                                {product.id}
                                            </span>
                    <span id={product.id} className='badge badge-pill col-4'>
                                                {product.name}
                                            </span>
                    <span id={product.id} className='badge badge-pill col-4'>
                                                {product.description}
                                            </span>
                    <span id={product.id} className='badge badge-pill col-2'>
                                                {product.volume}
                                            </span>
                </Link>

            );
        }
    }

    render() {
        const {products} = this.state
        return (
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'>
                                <div className='row'>
                                    <div className='col-sm-6'>Products Table</div>
                                    <button className='btn btn-primary btn-sm mb-3 col-sm-2'
                                            onClick={this.handleDelete}
                                            disabled={!this.state.product}
                                            style={{marginRight: "1%"}}>
                                        Delete selected
                                    </button>
                                    <button className='btn btn-primary btn-sm mb-3 col-sm-3'
                                            onClick={this.createNewProduct}>
                                        Create new product
                                    </button>
                                </div>
                            </div>
                            <div className='card-header'>
                                <div
                                    className='list-group-item list-group-item-action d-flex justify-content-between align-items-left'>
                                    <span className='badge badge-pill col-2'>id</span>
                                    <span className='badge badge-pill col-4'>name</span>
                                    <span className='badge badge-pill col-4'>description</span>
                                    <span className='badge badge-pill col-2'>volume</span>
                                </div>
                            </div>

                            <div className='card-body'>
                                <ul className='list-group list-group-flush'>
                                    {products.map(product => (
                                        this.selected(product)
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

export default ProductsList
