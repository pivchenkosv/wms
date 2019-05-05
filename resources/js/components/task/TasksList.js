import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import Task from "./Task";
import {handleCompleteTask, handleDeleteTask} from "../../api/tasks";

class TasksList extends Component {

    state = {
        tasks: [],
        task: null,
        store: null,
        message: null,
        table: null,
        currentPage: 1,
    }

    loadTasks = (page) => {
        if (this.state.table)
            this.state.table.destroy()
        new Promise((resolve, reject) => {
            this.props.loadTasksWatcher(resolve, reject, page)
        }).then(response => {
            this.setState({
                tasks: response,
                currentPage: page,
                lastPage: response.data.last_page,
            }, () => {
                const table = $('#tasks').DataTable({
                    "paging": false,
                    "searching": true,
                    "dom": "t",
                    "destroy": true
                });
                this.setState({table: table})
            })
        })
    }

    componentDidMount() {
        this.loadTasks(1)
    }

    search = () => {
        $(document).ready(() => {
            $('#customSearchBox').keyup(() => {
                this.state.table.search($('#search').val()).draw();
            })
        });
    }

    handleFormUnmount = (message) => {
        this.setState({task: null, message: message});
    }

    handleDelete = (evt) => {
        evt.preventDefault();

        handleDeleteTask(this.state.task.id).then(response => {
            this.props.loadTasks(response.data.data)
            this.setState({
                tasks: response.data.data
            })
        })
        this.setState({task: null});
    }

    handleComplete = (evt) => {
        evt.preventDefault();

        handleCompleteTask(this.state.task.id).then(response => {
            this.props.loadTasks(response.data.data)
            this.setState({
                tasks: response.data.data
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

        const {user} = this.props.user
        const {task} = this.state

        switch (user.role) {
            case "ROLE_ADMIN":
            case "ROLE_MANAGER":
                return (
                    <div className='card-header'>
                        <div className='row'>
                            <div className='col-sm-2'>Tasks</div>
                            <div id="customSearchBox" className="dataTables_filter col-sm-4 ">
                                <input
                                    id="search"
                                    type="search"
                                    className="form-control form-control-sm"
                                    placeholder="Search"
                                    aria-controls="tasks"
                                    onKeyUp={this.search}
                                />
                            </div>
                            <button type='button' className='btn btn-danger btn-sm mb-3 col-sm-2 mr-1'
                                    disabled={!task}
                                    onClick={this.handleDelete}>
                                Delete
                            </button>
                            <button type='button' className='btn btn-primary btn-sm mb-3 col-sm-3'
                                    onClick={() => this.createNewTask(history)}
                                    disabled={task && task.status === 'COMPLETED'}>
                                Create/Update task
                            </button>
                        </div>
                    </div>
                );
            case "ROLE_WORKER":
                return (
                    <tr className='card-header'>
                        <th className='row'>
                            <div className='col-sm-6'>Tasks</div>
                            <button type='button' className='btn btn-primary btn-sm mb-3 col-sm-5 mr-1'
                                    disabled={!(this.state.task && this.state.task.status !== 'COMPLETED')}
                                    onClick={this.handleComplete}>
                                Submit task completed
                            </button>
                        </th>
                    </tr>
                );
        }
    }

    taskInfo = (task) => {
        return (
            <tr
                key={task.id}
                className='list-group-item list-group-item-action d-flex justify-content-between align-items-left'
                onClick={() => this.showTaskInfo(task)}
            >
                <td className='badge-pill col-1'>
                    {task.id}
                </td>
                <td className='badge-pill col-3'>
                    {task.description}
                </td>
                <td className='badge-pill col-2'>
                    {task.at}
                </td>
                <td className='badge-pill col-2'>
                    {task.assigned_user}
                </td>
                <td className='badge-pill col-2'>
                    {task.status}
                </td>
                <td className='badge-pill col-2'>
                    {task.created_at}
                </td>
            </tr>
        );
    }

    render() {
        let {tasks} = this.props
        const {history, user} = this.props;

        tasks = user.user.role === 'ROLE_WORKER' ? tasks.filter(task => task.assigned_user === user.user.id) : tasks
        return (
            <div className='container py-4'>
                <div className='row justify-content-left'>
                    <div className='col-md-8'>
                        <div className='card'> {this.tableHeader(history)}</div>
                        <table id="tasks" className='card' width="100%">
                            <thead>
                            <tr className='card-header list-group-item list-group-item-action d-flex'>
                                <th className='col-1'>id</th>
                                <th className='col-3'>description</th>
                                <th className='col-2'>at</th>
                                <th className='col-2'>assigned worker</th>
                                <th className='col-2'>status</th>
                                <th className='col-2'>created at</th>
                            </tr>
                            </thead>
                            <tbody>
                            {tasks.map(task => (
                                this.taskInfo(task)
                            ))}
                            </tbody>
                        </table>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item">
                                    <button className="page-link"
                                            disabled={this.state.currentPage === 1}
                                            onClick={() => this.loadTasks(this.state.currentPage - 1)}>Previous
                                    </button>
                                </li>
                                <li className="page-item">
                                    <button className="page-link"
                                            disabled={this.state.currentPage === this.state.tasks.last_page}
                                            onClick={() => this.loadTasks(this.state.currentPage + 1)}>Next
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-md-4">
                        {(this.state.task) ?
                            <Task taskId={this.state.task.id} unmountForm={this.handleFormUnmount}/> : ''}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(TasksList);
