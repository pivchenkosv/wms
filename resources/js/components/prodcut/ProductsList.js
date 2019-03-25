import React, {Component} from 'react';
import axios from "axios";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

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
                products: response.data.data
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
        axios.put('/api/editProduct', params).then(response => {
            console.log('fulfilled', response);
            console.log(response.data);
            this.setState({
                products: response.data.data,
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
            axios.delete(`/api/delProduct/${this.state.product.id}`).then(response => {
                this.setState({
                    products: response.data.data,
                    product: null
                })
            }).catch(response => {
                console.log('rejected', response);
            })

        } else {
            this.setState(state => {
                const products = state.products.filter((product) => 0 !== product.id);

                return {
                    products,
                };
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
            product.volume == this.state.product.volume) {
            return (
                <button className="btn btn-primary badge col-1 mr-2 text-size"
                        onClick={() => this.setState({product: null})}>
                    {'\u2718'}
                </button>
            );
        } else {
            return (
                <button className="btn btn-primary badge col-1 mr-2 text-size"
                        onClick={this.handleSubmit}>
                    {'\u2714'}
                </button>
            );
        }
        ;
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
        const {user} = this.props.user

        if (user.role !=='ROLE_WORKER' && this.state.product && this.state.product.id === product.id) {

            return (
                <tr
                    key={product.id}
                    className='list-group-item list-group-item-action d-flex justify-content-between align-items-left'
                    onClick={() => this.editProduct(product)}
                >
                    {this.isValueChanged(product)}
                    <input name="name"
                           value={this.state.product.name}
                           className="col-4"
                           onChange={this.inputChange}/>
                    <input name="description"
                           className="col-4"
                           value={this.state.product.description}
                           onChange={this.inputChange}/>
                    <input name="volume" type="number" value={this.state.product.volume} min="1"
                           max="20"
                           className="col-2" onChange={this.inputChange}/>

                </tr>
            );
        } else {
            return (
                <tr
                    key={product.id}
                    className='card-body list-group-item list-group-item-action d-flex'
                    onClick={() => this.editProduct(product)}
                >
                    <td className='badge-pill col-2'>
                        {product.id}
                    </td>
                    <td className='badge-pill col-4'>
                        {product.name}
                    </td>
                    <td className='badge-pill col-4'>
                        {product.description}
                    </td>
                    <td className='badge-pill col-2'>
                        {product.volume}
                    </td>
                </tr>

            );
        }
    }

    render() {
        const {products} = this.state
        const {user} = this.props.user
        return (
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'>
                                <div className='row'>
                                    <div className='col-sm-6'>Products Table</div>
                                    {user.role !== 'ROLE_WORKER' ?
                                        <div className="col-sm-6">
                                            <button className='btn btn-primary btn-sm mb-3 col-sm-4 mr-1'
                                                    onClick={this.handleDelete}
                                                    disabled={!this.state.product}
                                            >
                                                Delete selected
                                            </button>
                                            <button className='btn btn-primary btn-sm mb-3 col-sm-6'
                                                    onClick={this.createNewProduct}>
                                                Create new product
                                            </button>
                                        </div> : ''
                                    }
                                </div>
                            </div>
                        </div>
                        <table className='card'>
                            <thead>
                            <tr className='card-header list-group-item list-group-item-action d-flex'>
                                <th className='badge-pill col-2'>id</th>
                                <th className='badge-pill col-4'>name</th>
                                <th className='badge-pill col-4'>description</th>
                                <th className='badge-pill col-2'>volume</th>
                            </tr>
                            </thead>

                            <tbody>
                            {products.map(product => (
                                this.selected(product)
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

export default connect(mapStateToProps, null)(withRouter(ProductsList))
