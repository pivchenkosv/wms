import React, {Component} from 'react'
import axios from "axios";
import '../Style.css';

class ProductSelector extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            products: [],
        }
    }

    componentDidMount() {
        axios.get("/api/products").then(response => {
            this.setState({
                products: response.data.data
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
                <div className='card card-header'>
                    <div className='row'>
                        <div className='col-sm-8'>Products</div>
                    </div>
                </div>
                <table className='card'>
                    <thead>
                    <tr className='card-header list-group-item list-group-item-action d-flex justify-content-between align-items-left'>
                        <th className='badge-pill col-3'>id</th>
                        <th className='badge-pill col-3'>name</th>
                        <th className='badge-pill col-3'>description</th>
                        <th className='badge-pill col-3'>volume</th>
                    </tr>
                    </thead>
                    <tbody>
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