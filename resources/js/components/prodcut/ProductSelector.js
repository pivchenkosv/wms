import React, {Component} from 'react'

import '../Style.css';
import {loadProducts} from "../api";

class ProductSelector extends Component {

    state = {
        products: [],
    }

    componentDidMount() {
        loadProducts().then(response => {
            this.setState({
                products: response.data.data
            })
        })
    }

    returnSelected = (product) => {
        this.props.returnSelected(product.id);
    }

    render() {

        const {products} = this.state
        return (
            <div>
                <div className='card card-header'>
                    <div className='row'>
                        <div className='col-sm-8'>Products</div>
                    </div>
                </div>
                <table className='card'>
                    <thead>
                    <tr className='card-header d-flex justify-content-between align-items-left'>
                        <th className='badge-pill col-3'>id</th>
                        <th className='badge-pill col-3'>name</th>
                        <th className='badge-pill col-3'>description</th>
                        <th className='badge-pill col-3'>volume</th>
                    </tr>
                    </thead>
                    <tbody className='overflow-auto' style={{height: '200px'}}>
                    {products.map(product => (
                        <tr key={product.id}
                            className='list-group-item list-group-item-action d-flex justify-content-between align-items-left'
                            onClick={() => this.returnSelected(product)}>
                            <th className='badge-pill col-3 text-size'>
                                {product.id}
                            </th>
                            <th className='badge-pill col-3 text-size'>
                                {product.name}
                            </th>
                            <th className='badge-pill col-3 text-size'>
                                {product.description}
                            </th>
                            <th className='badge-pill col-3 text-size'>
                                {product.volume}
                            </th>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ProductSelector
