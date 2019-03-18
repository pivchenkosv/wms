import React, {Component} from 'react'
import axios from "axios";
import '../Style.css';

class ProductSelector extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            products: null,
        }
    }

    componentDidMount() {
        axios.get("/api/products").then(response => {
            this.setState({
                products: response.data
            })
            console.log(response);
        })
    }

    returnSelected = (product) => {
        console.log('productId', product.id)
        this.props.returnSelected(product.id);
    }

    render() {

        const {products} = this.state
        return (
            <div>
                <table className='card'>
                    <div className='card-header'>
                        <div className='row'>
                            <div className='col-sm-8'>Cells</div>
                        </div>
                    </div>
                    <tr className='card-header list-group-item list-group-item-action d-flex justify-content-between align-items-left'>
                        <th className='badge-pill col-3'>id</th>
                        <th className='badge-pill col-3'>name</th>
                        <th className='badge-pill col-3'>description</th>
                        <th className='badge-pill col-3'>volume</th>
                    </tr>

                    {products ? products.map(product => (
                        <tr className='list-group-item list-group-item-action d-flex justify-content-between align-items-left'
                            onClick={() => this.returnSelected(product)}>
                            <th id={product.id} className='badge-pill col-3' style={{fontSize: "11px"}}>
                                {product.id}
                            </th>
                            <th id={product.id} className='badge-pill col-3' style={{fontSize: "11px"}}>
                                {product.name}
                            </th>
                            <th id={product.id} className='badge-pill col-3' style={{fontSize: "11px"}}>
                                {product.description}
                            </th>
                            <th id={product.id} className='badge-pill col-3' style={{fontSize: "11px"}}>
                                {product.volume}
                            </th>
                        </tr>
                    )) : ''}

                </table>
            </div>
        )
    }
}

export default ProductSelector
