import React, {Component} from 'react'
import axios from "axios";
import '../Style.css';

class Task extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            taskId: this.props.taskId,
            subtasks: null,
        }
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
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className='col-sm-10'>{`Task id: ` + this.state.taskId}</div>
                        <div className='col-sm-2'>
                            <button onClick={this.props.unmountForm}>&#x274C;</button>
                        </div>
                    </div>
                </div>
                <div className='card-header'>
                    <div className='list-group-item d-flex justify-content-between align-items-left'>
                        <span className='badge badge-pill col-3'>from cell</span>
                        <span className='badge badge-pill col-3'>to cell</span>
                        <span className='badge badge-pill col-3'>product id</span>
                        <span className='badge badge-pill col-3'>quantity</span>
                    </div>
                </div>

                <div className='card-body'>
                    <ul className='list-group list-group-flush'>
                        {subtasks ? subtasks.map(subtask => (
                            <div
                                key={subtask.id}
                                className='list-group-item list-group-item-action justify-content-between align-items-left'
                            >
                                <span className='badge badge-pill col-3'>
                                    {subtask.from_cell}
                                </span>
                                <span className='badge badge-pill col-3'>
                                    {subtask.to_cell}
                                </span>
                                <span className='badge badge-pill col-3'>
                                    {subtask.product_id}
                                </span>
                                <span className='badge badge-pill col-3'>
                                    {subtask.quantity}
                                </span>
                            </div>
                        )) : ''}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Task
