import React, {Component} from 'react';
import axios from "axios";
import {Link, withRouter} from "react-router-dom";
import Task from "./Task";
import {connect} from "react-redux";
import {setTask, unsetTask} from "../actions/task";

class TasksList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            task: null,
            store: null,
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

    handleFormUnmount = () => {
        this.setState({task: null});
    }

    handleDelete = (evt) => {
        evt.preventDefault();
        const params = new URLSearchParams();
        params.append('id', this.state.task.id)
        axios.post('/api/delTask', params).then(response => {
            this.setState({
                tasks: response.data
            })
        })
        this.setState({task: null});
    }

    handleComplete = (evt) => {
        evt.preventDefault();
        const params = new URLSearchParams();
        params.append('id', this.state.task.id)
        axios.post('/api/completeTask', params).then(response => {
            this.setState({
                tasks: response.data
            })
        })
        this.setState({task: null});
    }

    showTaskInfo(task) {
        if (!this.state.task || task.id !== this.state.task.id)
            this.setState({task: null}, function () {
                this.setState({task: task});
            });
    };

    createNewTask = (history) => {
        this.props.setTask(this.state.task);
        history.push('/newTask');
    }

    tableHeader = (history) => {

        const {user} = this.props

        switch (user.role) {
            case "ROLE_ADMIN":
            case "ROLE_MANAGER":
                return (
                    <tr className='card-header'>
                        <th className='row'>
                            <div className='col-sm-6'>Tasks</div>
                            <button type='button' className='btn btn-danger btn-sm mb-3 col-sm-2' disabled={!this.state.task} style={{marginRight: "5px"}}
                                    onClick={this.handleDelete}>
                                Delete
                            </button>
                            <a className='btn btn-primary btn-sm mb-3 col-sm-3'
                               onClick={() => this.createNewTask(history)}>
                                Create/Update task
                            </a>
                        </th>
                    </tr>
                );
            case "ROLE_WORKER":
                return (
                    <tr className='card-header'>
                        <th className='row'>
                            <div className='col-sm-6'>Tasks</div>
                            <button type='button' className='btn btn-primary btn-sm mb-3 col-sm-5' disabled={!this.state.task} style={{marginRight: "5px"}}
                                    onClick={this.handleComplete}>
                                Submit task completed
                            </button>
                        </th>
                    </tr>
                );
        }
    }

    render() {
        const {tasks} = this.state
        const {location, history} = this.props;
        return (
            <div className='container py-4'>
                <div className='row justify-content-left'>
                    <div className='col-md-8'>
                        <table className='card'>
                            {this.tableHeader(history)}
                            <tr className='card-header list-group-item list-group-item-action d-flex'>
                                    <th className='badge-pill col-1'>id</th>
                                    <th className='badge-pill col-3'>description</th>
                                    <th className='badge-pill col-2'>at</th>
                                    <th className='badge-pill col-2'>assigned worker</th>
                                    <th className='badge-pill col-2'>status</th>
                                    <th className='badge-pill col-2'>created at</th>
                            </tr>
                                    {tasks.map(task=> (
                                        <tr
                                            className='list-group-item list-group-item-action d-flex justify-content-between align-items-left'
                                            onClick={() => this.showTaskInfo(task)}
                                        >
                                            <td id={task.id} className='badge badge-pill'>
                                                {task.id}
                                            </td>
                                            <td id={task.id} className='badge badge-pill'>
                                                {task.description}
                                            </td>
                                            <td id={task.id} className='badge badge-pill'>
                                                {task.at}
                                            </td>
                                            <td id={task.id} className='badge badge-pill'>
                                                {task.assigned_user}
                                            </td>
                                            <td id={task.id} className='badge badge-pill'>
                                                {task.status}
                                            </td>
                                            <td id={task.id} className='badge badge-pill'>
                                                {task.created_at}
                                            </td>
                                        </tr>
                                    ))}
                        </table>
                    </div>
                    <div className="col-md-4">
                        {(this.state.task) ? <Task taskId={this.state.task.id} unmountForm={this.handleFormUnmount}/> : ''}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (store, ownProps) => {
    console.log('mapStateToProps when remove');
    console.log(store)
    return {
        task: store.task.task,
        store: store,
        user: store.user
    }
}

const mapDispatchToProps = (dispatch) => {
    console.log('mapDispatchToProps when add');
    return {
        setTask: (task) => setTask(task)(dispatch),
        unsetTask: () => unsetTask()(dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TasksList));
