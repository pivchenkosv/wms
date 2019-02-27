import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

class ReportsList extends Component {
    constructor() {
        super();
        this.state = {
            reports: [],
            //viewForm: false,
        }
    }

    componentDidMount () {
        axios.get('/api/reports').then(response => {
            this.setState({
                reports: response.data
            })
        })
    }

    render() {
        const {reports} = this.state
        return (
            <div className='container py-4'>
                <div className='row justify-content-left'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'>
                                <div className='row'>
                                    <div className='col-sm-8'>Reports</div>
                                </div>
                            </div>
                            <div className='card-header'>
                                <div className='list-group-item d-flex justify-content-between align-items-left'>
                                    <span className='badge badge-pill'>id</span>
                                    <span className='badge badge-pill'>location</span>
                                    <span className='badge badge-pill'>capacity</span>
                                </div>
                            </div>

                            <div className='card-body'>
                                <ul className='list-group list-group-flush'>
                                    {reports.map(report=> (
                                        <Link
                                            to="#"
                                            className='list-group-item list-group-item-action d-flex justify-content-between align-items-left'
                                            onClick={() => this.showUserInfo(report)}
                                        >
                                            <span id={report.id} className='badge badge-pill'>
                                                {report.id}
                                            </span>
                                            <span id={report.id} className='badge badge-pill'>
                                                {report.task_id}
                                            </span>
                                            <span id={report.id} className='badge badge-pill'>
                                                {report.description}
                                            </span>
                                            <span id={report.id} className='badge badge-pill'>
                                                {report.created_at}
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

export default ReportsList
