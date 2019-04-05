import React, {Component} from 'react'
import DatePicker from "react-datepicker/es";
import {withRouter} from "react-router-dom";
import {Dropdown} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import CellSelector from "../cell/CellSelector";
import ProductSelector from "../prodcut/ProductSelector";
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import {getSubtasks, handleCreateTask, usersApi} from "../api";
import {ACTIONS} from "./taskActions";

class NewTask extends Component {

    state = {
        users: null,
        task: {
            id: null,
            assigned_user: 0,
            description: '',
            at: new Date(),
            status: null,
            created_by: null,
            action: 'custom',
        },
        subtasks: [],
        newSubtaskId: -1,
        selected: {
            subtask: null,
            column: null
        },
        message: null,
    }

    handleActionChange = (e, {name, value}) => {
        this.setState({
            task: {
                ...this.state.task,
                [name]: value,
            }
        }, () => {
            switch (this.state.task.action) {
                case 'shipment': {
                    const newSubtasks = this.state.subtasks.map(el => (
                        {...el, ['to_cell']: 1, ['from_cell']: 0, ['product_id']: 0}
                    ))

                    this.setState({
                        subtasks: newSubtasks,
                    })
                    break
                }
                case 'acceptance': {
                    const newSubtasks = this.state.subtasks.map(el => (
                        {...el, ['from_cell']: 1, ['to_cell']: 0, ['product_id']: 0}
                    ))

                    this.setState({
                        subtasks: newSubtasks,
                    })
                    break
                }
            }
        })
    }

    handleChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            task: {
                ...this.state.task,
                [name]: value,
            }
        });
    }

    handleUserChange = (event, {value}) => {
        this.setState({
            task: {
                ...this.state.task,
                assigned_user: value,
            }
        });
    }

    handleDateChange = (date) => {
        this.setState({
            task: {
                ...this.state.task,
                at: date,
            }
        });
    }

    componentDidMount() {
        usersApi().then(response => {
            const users = response.data.data.map((user) => {
                return {key: user.id, value: user.id, text: user.name, role: user.role}
            })
            this.setState({users: users})
        })
        if (this.props.task && this.props.task.id !== 0) {
            this.setState({task: this.props.task})
            getSubtasks(this.props.task.id).then(response => {
                this.setState({
                    subtasks: response.data
                })
            })
        } else {
            const newSubtask = {
                id: 0,
                from_cell: 0,
                to_cell: 0,
                product_id: 0,
                quantity: 0,
            }
            this.setState({
                task: {
                    id: 0,
                    assigned_user: 0,
                    description: '',
                    at: new Date(),
                    status: null,
                    created_by: null,
                },
                subtasks: [...this.state.subtasks, newSubtask],
            })
        }
    }

    createNewSubtask = () => {
        let from_cell = 0, to_cell = 0;
        switch (this.state.task.action) {
            case 'acceptance':{
                from_cell = 1;
                break;
            }
            case 'shipment':{
                to_cell = 1;
                break;
            }
            default: {
                from_cell = 0;
                to_cell = 0;
                break;
            }
        }
        const newSubtask = {
            id: this.state.newSubtaskId,
            from_cell: from_cell,
            to_cell: to_cell,
            product_id: 0,
            quantity: 0,
        }

        this.setState({
            subtasks: [...this.state.subtasks, newSubtask],
            newSubtaskId: this.state.newSubtaskId - 1,
        })

    }

    cancel = (message) => {
        this.props.unsetTask();
        this.props.history.push('/tasks');
    }

    handleSubmit = (evt) => {
        evt.preventDefault();

        const button = document.getElementById('createButton');
        button.disabled = true;
        button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>&nbsp Loading...'

        handleCreateTask(this.state.task, this.state.subtasks).then(() => {

            this.setState({message: 'Success!'}, function () {
                const message = $('div#message').addClass('success');
                message.fadeIn(300).delay(1500).fadeOut(400);
            })

            setTimeout(() => this.cancel(), 2500);

        }).catch(response => {
            console.log('rejected', response.response);
            this.setState({message: response.response.data.errors[Object.keys(response.response.data.errors)[0]]}, function () {
                const message = $('div#message').addClass('failure');
                message.fadeIn(300).delay(1500).fadeOut(400);
            })
            const button = document.getElementById('createButton');
            button.disabled = false;
            button.innerHTML = 'Create Task'
        })
    }

    selectCell = (subtask, column) => {
        this.setState({selected: null}, function () {
            this.setState({
                selected: {
                    ...this.state.selected,
                    subtask: subtask,
                    column: column
                }
            })
        })
    }

    setSubtaskState = (id) => {
        const selectedId = this.state.selected.subtask.id;
        let newSubtasks
        const {column} = this.state.selected

        newSubtasks = this.state.subtasks.map(el => (
            el.id === selectedId ? {...el, [column]: id} : el
        ))

        this.setState({
            subtasks: newSubtasks,
            selected: null
        })
    }

    renderInfoTable = () => {
        const {selected} = this.state;
        if (!selected) {
            return null;
        }
        switch (this.state.selected.column) {
            case "from_cell":
                if (this.state.task.action === 'acceptance')
                    return null
                return <CellSelector returnSelected={this.setSubtaskState} action={this.state.task.action}/>
            case "to_cell":
                if (this.state.task.action === 'shipment')
                    return null
                return <CellSelector returnSelected={this.setSubtaskState} action={this.state.task.action}/>
            case "product_id":
                return <ProductSelector returnSelected={this.setSubtaskState}/>
        }
    }

    inputChange = (event) => {
        const {value} = event.target
        const selectedId = this.state.selected.subtask.id;
        const newSubtasks = this.state.subtasks.map(el => (
            el.id === selectedId ? {...el, quantity: value} : el
        ))
        this.setState({
            subtasks: newSubtasks,
        })
    };

    countMaxQuantity = (subtask) => {
        return null;
    }

    selected = (subtask) => {

        return (
            <tr
                key={subtask.id}
                className='list-group-item list-group-item-action d-flex justify-content-between align-items-left'
                onMouseEnter={() => this.showDeleteButton(subtask.id)}
                onMouseLeave={() => this.hideDeleteButton(subtask.id)}
            >
                <td className='badge badge-pill col-3'
                    onClick={() => this.selectCell(subtask, "from_cell")}>
                    {subtask.from_cell}
                </td>
                <td onClick={() => this.selectCell(subtask, "to_cell")}
                    className='badge badge-pill col-3'>
                    {subtask.to_cell}
                </td>
                <td onClick={() => this.selectCell(subtask, "product_id")}
                    className='badge badge-pill col-3'>
                    {subtask.product_id}
                </td>
                {(this.state.selected && this.state.selected.column === "quantity" && this.state.selected.subtask.id === subtask.id) ?
                    <input id={subtask.id} className="col-3 text-size" name="quantity" type="number"
                           value={subtask.quantity}
                           min="1" max={this.countMaxQuantity(subtask)}
                           onChange={this.inputChange}/> :
                    <td onClick={() => this.selectCell(subtask, "quantity")}
                        className='badge badge-pill col-3'>
                        {subtask.quantity}
                    </td>
                }
                <button type='button' id={'delete' + subtask.id} className='btn badge badge-pill col-2 hidden'
                        onClick={() => this.deleteSubtask(subtask)}>
                    {'\u2718'}
                </button>

            </tr>
        );
    }

    render() {
        const {subtasks, users, actions} = this.state;
        const {assigned_user} = this.state.task
        const usersOpts = users ? users.filter(user => user.role === 'ROLE_WORKER') : null;

        return (

            <div className='container py-4'>
                <div className='row justify-content-left'>
                    <div className="card">
                        <div className="card-header">
                            <div className='row'>
                                <div className='col-2 pl-1 pr-0 pt-2 text-center'>
                                    New Task
                                </div>
                                <div className='col-6 px-1 pt-2'>
                                    {
                                        <div id='message' className='alert-box success'>
                                            {this.state.message}
                                        </div>
                                    }
                                </div>
                                <div className='col-4 py-0'>
                                    <Dropdown
                                        placeholder='Action'
                                        name='action'
                                        fluid
                                        selection
                                        options={ACTIONS}
                                        onChange={this.handleActionChange}
                                        value={this.state.task.action}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <form id="newTask" onSubmit={this.handleSubmit}>
                                <div className="mx-1 mb-2">
                                    <Dropdown
                                        placeholder='For user'
                                        name='assigned_user'
                                        fluid
                                        search
                                        selection
                                        options={usersOpts}
                                        onChange={this.handleUserChange}
                                        value={assigned_user}
                                    />
                                </div>
                                <div className="row">
                                    <label htmlFor="description" className="col-12 text-md-left">Description: </label>
                                    <textarea id="description" className="form-control non-resizable" rows="3" cols="20"
                                              name="description" value={this.state.task.description}
                                              onChange={this.handleChange}/>
                                </div>
                                <div className="row">
                                    <label htmlFor="description"
                                           className="col-2 col-form-label text-md-left pt-0">At: </label>
                                    <DatePicker
                                        minDate={new Date()}
                                        selected={new Date(this.state.task.at)}
                                        onChange={this.handleDateChange}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        timeCaption="time"
                                    />
                                </div>
                                <div className="container mt-3">
                                    <div className='card'>
                                        <div className='card-header'>
                                            <div className='row'>
                                                <div className='col-sm-10'><span>Specify cells, where products should be replaced from/to</span>
                                                </div>
                                                <button type="button" className='btn btn-success btn-circle'
                                                        onClick={this.createNewSubtask}>
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <table className="card">
                                        <thead>
                                        <tr className="list-group-item list-group-item-action d-flex justify-content-between align-items-left">
                                            <td className='badge badge-pill col-3'>from cell</td>
                                            <td className='badge badge-pill col-3'>to cell</td>
                                            <td className='badge badge-pill col-3'>product id</td>
                                            <td className='badge badge-pill col-3'>quantity</td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {subtasks ? subtasks.map(subtask => (
                                            this.selected(subtask)
                                        )) : ''}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="container flex-md-row mt-2">
                                    <button id="createButton" className="btn btn-primary mr-1">
                                        Create Task
                                    </button>
                                    <button type="button" className="btn btn-danger" onClick={this.cancel}>Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div id="additional" className="col-6">
                        {this.renderInfoTable()}
                    </div>
                </div>
            </div>
        );
    }

    showDeleteButton = (id) => {
        const elementId = 'delete' + id;
        const cross = document.getElementById(elementId);
        cross.style.visibility = 'visible'
    }

    hideDeleteButton = (id) => {
        const elementId = 'delete' + id;
        const cross = document.getElementById(elementId);
        cross.style.visibility = 'hidden'
    }

    deleteSubtask = (subtask) => {
        const id = subtask.id
        const subtasks = this.state.subtasks.filter(subtask => subtask.id !== id);
        this.setState({subtasks: subtasks})
    }
}

export default withRouter(NewTask)
