import React, {Component} from 'react'

import '../Style.css';
import {loadAvailableCells} from "../api";

class CellSelector extends Component {

    state = {
        cells: [],
    }

    componentDidMount() {
        const {action} = this.props
        let cells
        loadAvailableCells().then(response => {
            cells = response.data.data.map(cell => {
                return cell.available_volume ? cell : {...cell, available_volume: cell.volume}
            })
            switch (action) {
                case 'shipment':
                    cells = cells.sort(function (a, b) {
                        if (a.available_volume < b.available_volume)
                            return 1;
                        if (a.available_volume > b.available_volume)
                            return -1;
                        return 0;
                    })
                    break;
                case 'acceptance':
                    cells = cells.sort(function (a, b) {
                        if (a.available_volume > b.available_volume)
                            return 1;
                        if (a.available_volume < b.available_volume)
                            return -1;
                        return 0;
                    })
                    break;
            }
            this.setState({
                cells: cells
            })
        })
    }

    returnSelected = (cell) => {
        this.props.returnSelected(cell.id);
    }

    render() {

        const {cells} = this.state

        return (
            <div className="col-12">
                <table className='card'>
                    <div className='card-header'>
                        <div className='row'>
                            <div className='col-sm-8'>Cells</div>
                        </div>
                    </div>
                    <tr className='card-header'>
                        <th className='badge badge-pill col-1'>id</th>
                        <th className='badge badge-pill col-1'>stockID</th>
                        <th className='badge badge-pill col-3'>available volume</th>
                        <th className='badge badge-pill col-3'>total volume</th>
                        <th className='badge badge-pill col-4'>status</th>
                    </tr>
                    <tbody className='overflow-auto' style={{height: '200px'}}>
                    {cells.map(cell => (
                        <tr className='list-group-item list-group-item-action d-flex justify-content-between align-items-left'
                            onClick={() => this.returnSelected(cell)}
                            key={cell.id}>
                            <th className='badge col-1 text-size'>
                                {cell.id}
                            </th>
                            <th className='badge col-1 text-size'>
                                {cell.stock_id}
                            </th>
                            <th className='badge col-3 text-size'>
                                {cell.available_volume ? cell.available_volume : cell.volume}
                            </th>
                            <th className='badge col-3 text-size'>
                                {cell.volume}
                            </th>
                            <th className='badge badge-primary col-4 text-size'>
                                {cell.status}
                            </th>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CellSelector
