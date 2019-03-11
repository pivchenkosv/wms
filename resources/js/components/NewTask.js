import React, {Component} from 'react'
import DatePicker from "react-datepicker/es";
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import {connect} from "react-redux";
import {setTask, unsetTask} from "../actions/task";
import axios from "axios";
import {withRouter} from "react-router-dom";
import CellSelector from "./CellSelector";
import update from 'react-addons-update';
import ProductSelector from "./ProductSelector";

class NewTask extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            task: {
                id: null,
                assigned_user: 0,
                description: '',
                at: new Date(),
                status: null,
                created_by: null,
            },
            subtasks: [],
            newSubtaskId: -1,
            selected: {
                subtask: null,
                column: null
            }
        }
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

    handleDateChange = (date) => {
        this.setState({
            task: {
                ...this.state.task,
                at: date,
            }
        });
    }

    componentDidMount() {
        if (this.props.task && this.props.task.id !== 0) {
            this.setState({task: this.props.task})
            axios.get("/api/taskInfo", {
                params: {
                    taskId: this.props.task.id,
                }
            }).then(response => {
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
            }, () => {
                console.log('new state:', this.state);
            })
        }
    }

    createNewSubtask = () => {
        const newSubtask = {
            id: this.state.newSubtaskId,
            from_cell: 0,
            to_cell: 0,
            product_id: 0,
            quantity: 0,
        }
        this.setState({
            subtasks: [...this.state.subtasks, newSubtask],
            newSubtaskId: this.state.newSubtaskId - 1,
        })

    }

    cancel = () => {
        this.props.unsetTask();
        this.props.history.push('/tasks');
    }

    handleSubmit = (evt) => {
        evt.preventDefault();

        const params = new URLSearchParams();
        if (this.state.task.id !== 0) {
            params.append('id', this.state.task.id);
        }
        params.append('assigned_user', this.state.task.assigned_user);
        params.append('description', this.state.task.description);
        let d = this.state.task.at;
        d.setHours(d.getHours() + 3);
        console.log(d.toISOString().slice(0, 19).replace('T', ' '));
        params.append('at', d.toISOString().slice(0, 19).replace('T', ' '));
        params.append('subtasks', JSON.stringify(this.state.subtasks))
        // this.state.subtasks.forEach(function (subtask) {
        //     params.append('subtask.id', subtask.id);
        //     params.append('subtask.from_cell', subtask.from_cell);
        //     params.append('subtask.to_cell', subtask.to_cell);
        //     params.append('subtask.product_id', subtask.product_id);
        //     params.append('subtask.quantity', subtask.quantity);
        // })
        axios.post('api/editTask', params).then(response => {
            console.log('response', response);
            //window.location.reload()
        }).catch(response => {
            console.log(response);
            console.log(response.data);
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
            }, () => {
                console.log(this.state)
            })
        })
    }

    setSubtaskState = (id) => {
        const selectedId = this.state.selected.subtask.id;
        let newSubtasks = null
        switch (this.state.selected.column) {
            case "from_cell":
                newSubtasks = this.state.subtasks.map(el => (
                    el.id === selectedId ? {...el, from_cell: id} : el
                ))
                break;
            case "to_cell":
                newSubtasks = this.state.subtasks.map(el => (
                    el.id === selectedId ? {...el, to_cell: id} : el
                ))
                break;
            case "product_id":
                newSubtasks = this.state.subtasks.map(el => (
                    el.id === selectedId ? {...el, product_id: id} : el
                ))
                break;
            case "quantity":
                newSubtasks = this.state.subtasks.map(el => (
                    el.id === selectedId ? {...el, quantity: id} : el
                ))
                break;
        }
        this.setState({
            subtasks: newSubtasks,
            selected: null
        })
    }

    renderInfoTable = () => {
        switch (this.state.selected.column) {
            case "from_cell":
            case  "to_cell":
                return <CellSelector returnSelected={this.setSubtaskState}/>
            case  "product_id":
                return <ProductSelector returnSelected={this.setSubtaskState}/>
        }
    }

    inputChange = (event) => {
        const {value} = event.target
        const selectedId = this.state.selected.subtask.id;
        let newSubtasks = this.state.subtasks.map(el => (
            el.id === selectedId ? {...el, quantity: value} : el
        ))
        this.setState({
            subtasks: newSubtasks,
        })
    };

    selected = (subtask) => {
        // this.setState({stock: stock})
        return (
            <tr
                className='list-group-item list-group-item-action d-flex justify-content-between align-items-left'
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
                    <input id={subtask.id} className="col-3" name="quantity" type="number" value={subtask.quantity} min="1" max="20"
                           style={{fontSize: "11px"}} onChange={this.inputChange}/> :
                    <td onClick={() => this.selectCell(subtask, "quantity")}
                        className='badge badge-pill col-3'>
                        {subtask.quantity}
                    </td>
                }

            </tr>
        );
    }

    render() {
        const {subtasks} = this.state;
        return (
            <div className='container py-4'>
                <div className='row justify-content-left'>
                    <div className="card">
                        <div className="card-header">New Task</div>
                        <div className="card-body">
                            <form id="newTask" onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <label htmlFor="user" className="col-form-label text-md-left"
                                           style={{marginLeft: "15px", marginRight: "15px"}}>For user: </label>
                                    <input id="user" type="text" className="col-md-2 left"
                                           name="assigned_user" value={this.state.task.assigned_user} onChange={this.handleChange}/>
                                </div>
                                <div className="row">
                                    <label htmlFor="description" className="col-12 text-md-left">Description: </label>
                                    <textarea id="description" className="form-control " rows="3" cols="20"
                                              name="description" value={this.state.task.description}
                                              style={{resize: "none", margin: "0 15px 15px 15px"}}
                                              onChange={this.handleChange}/>
                                </div>
                                <div className="row">
                                    <label htmlFor="description"
                                           className="col-2 col-form-label text-md-left">At: </label>
                                    {/*<textarea id="description" className="form-control " rows="3" cols="20" style={{resize: "none", marginLeft: "15px", marginRight: "15px"}}></textarea>*/}
                                    <DatePicker
                                        selected={this.state.task.at}
                                        onChange={this.handleDateChange}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        timeCaption="time"
                                    />
                                </div>
                                <div className="container" style={{marginTop: "10px"}}>
                                    <table className="card">
                                        <tr className='card-header'>
                                            <td className='row'>
                                                <div className='col-sm-10'><span>Specify cells, where products should be replaced from/to</span>
                                                </div>
                                                <button type="button" className='btn btn-success btn-circle'
                                                    // href = "/newTask"
                                                        onClick={this.createNewSubtask}>
                                                    +
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="list-group-item list-group-item-action d-flex justify-content-between align-items-left">
                                            <td className='badge badge-pill col-3'>from cell</td>
                                            <td className='badge badge-pill col-3'>to cell</td>
                                            <td className='badge badge-pill col-3'>product id</td>
                                            <td className='badge badge-pill col-3'>quantity</td>
                                        </tr>
                                        {subtasks ? subtasks.map(subtask => (
                                            this.selected(subtask)
                                        )) : ''}
                                    </table>
                                </div>
                                <div className="container flex-md-row" style={{marginTop: "10px"}}>
                                    <button className="btn btn-primary" style={{marginRight: "5px"}}>
                                        Create New Task
                                    </button>
                                    <button type="button" className="btn btn-danger" onClick={this.cancel}>Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div id="additional" className="col-6">
                        {(this.state.selected) ? this.renderInfoTable() : ''}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (store, ownProps) => {
    console.log('mapStateToProps when remove new task');
    console.log(store)
    return {
        task: store.task.task
    }
}

const mapDispatchToProps = (dispatch) => {
    console.log('mapDispatchToProps when add new task');
    return {
        setTask: (task) => setTask(task)(dispatch),
        unsetTask: () => unsetTask()(dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewTask))
