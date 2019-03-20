import React, {Component} from 'react'
import axios from "axios";
import '../Style.css';

class Cell extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            cellId: this.props.cellId,
            cellProducts: [],
        }
    }

    componentDidMount() {
        axios.get("/api/cellInfo", {
            params: {
                cellId: this.state.cellId,
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
            <div>
                <div className="card card-header">
                    <div className="row">
                        <div className='col-sm-10'>{`Cell id: ` + this.state.cellId}</div>
                        <div className='col-sm-2'>
                            <button className='btn btn-danger py-0 px-1 float-right text-size'
                                    onClick={unmountForm}>{'\u2718'}</button>
                        </div>
                    </div>
                </div>
                <table className='card'>
                    <thead>
                    <tr className='card-header list-group-item d-flex justify-content-between align-items-left'>
                        <th className='badge badge-pill col-4'>Product Name</th>
                        <th className='badge badge-pill col-4'>Quantity</th>
                        <th className='badge badge-pill col-4'>Volume</th>
                    </tr>
                    </thead>


                    <tbody>
                        {cellProducts.map(product => (
                            <tr
                                key={product.name}
                                className='list-group-item list-group-item-action justify-content-between align-items-left'
                            >
                                <td className='badge badge-pill col-4'>
                                    {product.name}
                                </td>
                                <td className='badge badge-pill col-4'>
                                    {product.quantity}
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

export default Cell
