import React, {Component} from 'react'
import DatePicker from "react-datepicker/es";
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import {connect} from "react-redux";
import {setTask, unsetTask} from "../actions/task";
import axios from "axios";

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
        console.log('state: ',this.state);
        console.log("taskID: ", this.state.task.id);
        if (this.state.task.id) {
            console.log("taskID: ", this.state.task.id);
            axios.get("/api/taskInfo", {
                params: {
                    taskId: this.state.task.id,
                }
            }).then(response => {
                this.setState({
                    subtasks: response.data
                })
            })
        } else {
            const newSubtask = {
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
            }, () => {console.log('new state:', this.state);})
        }
    }

    selected = (subtask) => {
        // this.setState({stock: stock})
        console.log("subtask: ", subtask.from_cell)
        return (
            <tr
                className='list-group-item list-group-item-action d-flex justify-content-between align-items-left'
            >
                <td className='badge badge-pill col-3'>
                    {subtask.from_cell}
                </td>
                <td className='badge badge-pill col-3'>
                    {subtask.to_cell}
                </td>
                <td className='badge badge-pill col-3'>
                    {subtask.product_id}
                </td>
                <td className='badge badge-pill col-3'>
                    {subtask.quantity}
                </td>
            </tr>
        );
    }

    render() {
        const {task} = this.state;
        const {subtasks} = this.state;
        return (
            <div className='container py-4'>
                <div className='row justify-content-left'>
                    <div className="card">
                        <div className="card-header">New Task</div>
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <label htmlFor="user" className="col-form-label text-md-left"
                                           style={{marginLeft: "15px", marginRight: "15px"}}>For user: </label>
                                    <input id="user" type="text" className="col-md-2 left"
                                           name="user" value={this.state.task.assigned_user} disabled/>
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
                                                <button className='btn btn-success btn-circle'
                                                    // href = "/newTask"
                                                        onClick={() => this.createNewSubtask(history)}>
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
                            </form>
                        </div>
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
        task: store.task
    }
}

const mapDispatchToProps = (dispatch) => {
    console.log('mapDispatchToProps when add new task');
    return {
        setTask: (task) => setTask(task)(dispatch),
        unsetTask: (task) => unsetTask(task)(dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTask)
