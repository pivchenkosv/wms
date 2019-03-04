import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

class ProductsList extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            //viewForm: false,
        }
    }

    componentDidMount () {
        axios.get('/api/products').then(response => {
            this.setState({
                products: response.data
            })
        })
    }

    render() {
        const {products} = this.state
        return (
            <div className='container py-4'>
                <div className='row justify-content-left'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'>
                                <div className='row'>
                                    <div className='col-sm-8'>Products Table</div>
                                    <button className='btn btn-primary btn-sm mb-3 col-sm-3' onClick={this.createNewUser}>
                                        Create new product
                                    </button>
                                </div>
                            </div>
                            <div className='card-header'>
                                <div className='list-group-item d-flex justify-content-between align-items-left'>
                                    <span className='badge badge-pill'>id</span>
                                    <span className='badge badge-pill'>name</span>
                                    <span className='badge badge-pill'>description</span>
                                    <span className='badge badge-pill'>volume</span>
                                </div>
                            </div>

                            <div className='card-body'>
                                <ul className='list-group list-group-flush'>
                                    {products.map(product=> (
                                        <Link
                                            to="#"
                                            className='list-group-item list-group-item-action d-flex justify-content-between align-items-left'
                                            onClick={() => this.showUserInfo(product)}
                                        >
                                            <span id={product.id} className='badge badge-pill'>
                                                {product.id}
                                            </span>
                                            <span id={product.id} className='badge badge-pill'>
                                                {product.name}
                                            </span>
                                            <span id={product.id} className='badge badge-pill'>
                                                {product.description}
                                            </span>
                                            <span id={product.id} className='badge badge-pill'>
                                                {product.volume}
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

export default ProductsList
