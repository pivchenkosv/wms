import React, {Component} from 'react'

import '../Style.css';
import {loadProductInfo} from "../api";

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
                        {/*<div className='col-sm-2'>*/}
                        {/*    <button className='btn btn-danger py-0 px-1 float-right text-size'*/}
                        {/*            onClick={unmountForm}>{'\u2718'}</button>*/}
                        {/*</div>*/}
                    </div>
                </div>
                <table className='card'>
                    <thead>
                    <tr className='card-header list-group-item d-flex justify-content-between align-items-left'>
                        <th className='badge badge-pill col-4'>Cell id</th>
                        <th className='badge badge-pill col-4'>Product quantity</th>
                        <th className='badge badge-pill col-4'>Volume</th>
                    </tr>
                    </thead>


                    <tbody>
                    {productCells.map(product => (
                        <tr
                            key={product.cell_id}
                            className='list-group-item list-group-item-action justify-content-between align-items-left'
                        >
                            <td className='badge badge-pill col-4'>
                                {product.cell_id}
                            </td>
                            <td className='badge badge-pill col-4'>
                                {product.quantity}
                            </td>

                            <td className='badge badge-pill col-4'>
                                {product.volume * product.quantity}
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
