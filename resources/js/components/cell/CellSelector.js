import React, {Component} from 'react'
import axios from "axios";
import '../Style.css';

class CellSelector extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            cells: [],
        }
    }

    componentDidMount() {
        axios.get("/api/fromCell").then(response => {
            this.setState({
                cells: response.data.data
            })
            console.log(response);
        })
    }

    returnSelected = (cell) => {
        console.log('cellId', cell.id)
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

                    {cells.map(cell => (
                        <tr className='list-group-item list-group-item-action d-flex justify-content-between align-items-left'
                            onClick={() => this.returnSelected(cell)}>
                                    <th className='badge col-1' style={{fontSize: "11px"}}>
                                        {cell.id}
                                    </th>
                            <th className='badge col-1' style={{fontSize: "11px"}}>
                                        {cell.stock_id}
                                    </th>
                            <th className='badge col-3' style={{fontSize: "11px"}}>
                                {cell.available_volume ? cell.available_volume : cell.volume}
                            </th>
                            <th className='badge col-3' style={{fontSize: "11px"}}>
                                        {cell.volume}
                                    </th>
                            <th className='badge badge-primary col-4' style={{fontSize: "11px"}}>
                                        {cell.status}
                                    </th>
                        </tr>
                    ))}

                </table>
            </div>
        )
    }
}

export default CellSelector
