import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

class TasksList extends Component {
    constructor() {
        super();
        this.state = {
            tasks: [],
            //viewForm: false,
        }
    }

    componentDidMount () {
        axios.get('/api/tasks').then(response => {
            this.setState({
                tasks: response.data
            })
        })
    }

    render() {
        const {tasks} = this.state
        return (
            <div className='container py-4'>
                <div className='row justify-content-left'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'>
                                <div className='row'>
                                    <div className='col-sm-8'>Tasks</div>
                                </div>
                            </div>
                            <div className='card-header'>
                                <div className='list-group-item d-flex justify-content-between align-items-left'>
                                    <span className='badge badge-pill'>id</span>
                                    <span className='badge badge-pill'>description</span>
                                    <span className='badge badge-pill'>product id</span>
                                    <span className='badge badge-pill'>quantity</span>
                                    <span className='badge badge-pill'>at</span>
                                    <span className='badge badge-pill'>from cell</span>
                                    <span className='badge badge-pill'>to cell</span>
                                    <span className='badge badge-pill'>assigned worker</span>
                                    <span className='badge badge-pill'>status</span>
                                    <span className='badge badge-pill'>created at</span>
                                    <span className='badge badge-pill'>updated at</span>
                                </div>
                            </div>

                            <div className='card-body'>
                                <ul className='list-group list-group-flush'>
                                    {tasks.map(task=> (
                                        <Link
                                            to="#"
                                            className='list-group-item list-group-item-action d-flex justify-content-between align-items-left'
                                            onClick={() => this.showUserInfo(task)}
                                        >
                                            <span id={task.id} className='badge badge-pill'>
                                                {task.id}
                                            </span>
                                            <span id={task.id} className='badge badge-pill'>
                                                {task.description}
                                            </span>
                                            <span id={task.id} className='badge badge-pill'>
                                                {task.product_id}
                                            </span>
                                            <span id={task.id} className='badge badge-pill'>
                                                {task.quantity}
                                            </span>
                                            <span id={task.id} className='badge badge-pill'>
                                                {task.at}
                                            </span>
                                            <span id={task.id} className='badge badge-pill'>
                                                {task.from_cell}
                                            </span>
                                            <span id={task.id} className='badge badge-pill'>
                                                {task.to_cell}
                                            </span>
                                            <span id={task.id} className='badge badge-pill'>
                                                {task.assigned_user}
                                            </span>
                                            <span id={task.id} className='badge badge-pill'>
                                                {task.status}
                                            </span>
                                            <span id={task.id} className='badge badge-pill'>
                                                {task.created_at}
                                            </span>
                                            <span id={task.id} className='badge badge-pill'>
                                                {task.updated_at}
                                            </span>

                                        </Link>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/*<div id="user" className="col-md-4">*/}
                    {/*{(this.state.user) ?*/}
                    {/*<User user={this.state.user} unmountForm = {this.handleFormUnmount} rerenderUsersList = {this.rerenderList}/> : ''}*/}
                    {/*</div>*/}
                </div>
            </div>
        );
    }
}

export default TasksList
