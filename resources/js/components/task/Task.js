import React, {Component} from 'react'
import axios from "axios";

import '../Style.css';

class Task extends Component {

    state = {
        taskId: this.props.taskId,
        subtasks: [],
    }

    componentDidMount() {
        axios.get("/api/taskInfo", {
            params: {
                taskId: this.state.taskId,
            }
        }).then(response => {
            this.setState({
                subtasks: response.data
            })
        })
    }

    render() {
        const {subtasks} = this.state;
        const {unmountForm} = this.props;
        return (
            <div>
                <div className="card-header">
                    <div className="row">
                        <div className='col-sm-10'>{`Task id: ` + this.state.taskId}</div>
                        <div className='col-sm-2'>
                            <button onClick={unmountForm}>&#x274C;</button>
                        </div>
                    </div>
                </div>

                <table className="card">
                    <thead>
                    <tr className='card-header list-group-item d-flex justify-content-between align-items-left'>
                        <th className='badge badge-pill col-3'>from cell</th>
                        <th className='badge badge-pill col-3'>to cell</th>
                        <th className='badge badge-pill col-3'>product id</th>
                        <th className='badge badge-pill col-3'>quantity</th>
                    </tr>
                    </thead>

                    <tbody>
                    {subtasks.map(subtask => (
                        <tr
                            key={subtask.id}
                            className='list-group-item list-group-item-action justify-content-between align-items-left'
                        >
                            <td className='badge badge-pill col-3'>{subtask.from_cell}</td>
                            <td className='badge badge-pill col-3'>{subtask.to_cell}</td>
                            <td className='badge badge-pill col-3'>{subtask.product_id}</td>
                            <td className='badge badge-pill col-3'>{subtask.quantity}</td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </div>
        )
    }
}

export default Task
