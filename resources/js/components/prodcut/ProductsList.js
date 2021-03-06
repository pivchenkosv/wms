import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {handleDeleteProduct, handleEditProduct} from "../../api/products";
import Product from "./Product";

class ProductsList extends Component {

    state = {
        products: [],
        product: null,
    }

    componentDidMount() {
        new Promise(resolve => {
            this.props.loadProductsWatcher(resolve)
        }).then(data => {
            this.setState({products: data})
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        handleEditProduct(this.state.product).then(response => {
            this.setState({
                products: response.data.data,
                product: null
            })
            $('div#message').fadeOut(300);
        }).catch(response => {
            this.setState({message: response.response.data.errors[Object.keys(response.response.data.errors)[0]][0]}, function () {
                const message = $('div#message').addClass('failure');
                message.fadeIn(300);
            })
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
        if (this.state.product.id !== 0) {
            handleDeleteProduct(this.state.product).then(response => {
                this.setState({
                    products: response.data.data,
                    product: null
                })
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

        if (user.role !== 'ROLE_WORKER' && this.state.product && this.state.product.id === product.id) {

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
        const {products, product} = this.state
        const {user} = this.props.user
        return (
            <div className='container py-4'>
                <div className='row justify-content-left'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'>
                                <div className='row'>
                                    <div className='col-sm-7 row'>
                                        <span className='col-sm-4'>Products Table</span>
                                        <div id='message' className='alert-box success col-sm-7 mb-3 ml-3'>
                                            {this.state.message}
                                        </div>
                                    </div>
                                    {user.role !== 'ROLE_WORKER' ?
                                        <div className="col-sm-5">
                                            <button className='btn btn-primary btn-sm mb-3 col-sm-5 mr-1'
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
                    <div id="product" className="col-md-4">
                        {product ? <Product productId={product.id}/> : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ProductsList)
