import React, {Component} from 'react'

import '../Style.css';
import {loadProductInfo} from "../../api/products";

class Product extends Component {

    state = {
        productId: this.props.productId,
        productCells: [],
    }

    componentDidMount() {
        loadProductInfo(this.state.productId).then(response => {
            if (response.data.success) {
                this.setState({
                    productCells: response.data.data
                })
            }
        })
    }

    render() {
        const {productCells, productId} = this.state;

        return (
            <div className='sticky-1'>
                <div className="card card-header">
                    <div className="row">
                        <div className='col-sm-10'>{`Cells containing product ` + productId}</div>
                    </div>
                </div>
                <table className='card'>
                    <thead>
                    <tr className='card-header list-group-item d-flex justify-content-between align-items-left'>
                        <th className='badge badge-pill col-4'>Cell id</th>
                        <th className='badge badge-pill col-4'>Product quantity</th>
                        <th className='badge badge-pill col-4'>Cell volume</th>
                    </tr>
                    </thead>


                    <tbody>
                    {productCells.map(product => (
                        <tr
                            key={product.pivot.cell_id}
                            className='list-group-item list-group-item-action justify-content-between align-items-left'
                        >
                            <td className='badge badge-pill col-4'>
                                {product.pivot.cell_id}
                            </td>
                            <td className='badge badge-pill col-4'>
                                {product.pivot.quantity}
                            </td>

                            <td className='badge badge-pill col-4'>
                                {product.volume}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Product
