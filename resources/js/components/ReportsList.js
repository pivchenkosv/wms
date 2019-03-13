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

    componentDidMount() {
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
                        <table className='card'>
                            <tr className='card-header list-group-item list-group-item-action d-flex'>
                                <div className='col-sm-8'>Reports</div>
                            </tr>
                            <tr className='card-header list-group-item list-group-item-action d-flex'>
                                <td className='badge-pill col-1'>id</td>
                                <td className='badge-pill col-2'>created by</td>
                                <td className='badge-pill col-3'>created at</td>
                                <td className='badge-pill col-4'>action</td>
                                <td className='badge-pill col-2'>task_id</td>
                            </tr>
                            {reports.map(report => (
                                <tr className='list-group-item list-group-item-action d-flex justify-content-between align-items-left'
                                    onClick={() => this.showUserInfo(report)}
                                >
                                    <td id={report.id} className='badge-pill col-1'>
                                        {report.id}
                                    </td>
                                    <td id={report.id} className='badge-pill col-2'>
                                        {report.created_by}
                                    </td>
                                    <td id={report.id} className='badge-pill col-3'>
                                        {report.created_at}
                                    </td>
                                    <td id={report.id} className='badge-pill col-4'>
                                        {report.action}
                                    </td>
                                    <td id={report.id} className='badge-pill col-2'>
                                        {report.task_id}
                                    </td>
                                </tr>
                            ))}
                        </table>
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
