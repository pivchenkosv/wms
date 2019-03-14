import React, {Component} from 'react'
import axios from "axios";
import './Style.css';

class Cell extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            cellId: this.props.cellId,
            cellProducts: null,
        }
    }

    componentDidMount() {
        axios.get("/api/cellInfo", {
            params: {
                cellId : this.state.cellId,
            }
        }).then(response => {
            this.setState({
                cellProducts: response.data.data
            })
        })
    }

    render() {
        const {cellProducts} = this.state;
        const {unmountForm} = this.props;
        return (
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className='col-sm-10'>{`Cell id: ` + this.state.cellId}</div>
                        <div className='col-sm-2'>
                            <button onClick={this.props.unmountForm}>&#x274C;</button>
                        </div>
                    </div>
                </div>
                <div className='card-header'>
                    <div className='list-group-item d-flex justify-content-between align-items-left'>
                        <span className='badge badge-pill col-4'>Product Name</span>
                        <span className='badge badge-pill col-4'>Quantity</span>
                        <span className='badge badge-pill col-4'>Volume</span>
                    </div>
                </div>

                <div className='card-body'>
                    <ul className='list-group list-group-flush'>
                        {cellProducts ? cellProducts.map(product => (
                            <div>
                                <div
                                    className='list-group-item list-group-item-action justify-content-between align-items-left'
                                >
                                            <span id={product.id} className='badge badge-pill col-4' >
                                                {product.name}
                                            </span>
                                    <span id={product.id} className='badge badge-pill col-4' >
                                                {product.quantity}
                                            </span>

                                    <span id={product.id} className='badge badge-pill col-4' >
                                                {product.volume}
                                            </span>
                                </div>
                            </div>
                        )) : ''}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Cell
