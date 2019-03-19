import React, {Component} from 'react';
import axios from "axios";

class ReportsList extends Component {
    constructor() {
        super();
        this.state = {
            reports: [],
            table: null,
        }
    }

    componentDidMount() {
        axios.get('/api/reports').then(response => {
            this.setState({
                reports: response.data.data
            }, () => {
                let table = $('#reports').DataTable({
                    "paging": true,
                    "searching": true,
                    "dom": "lrtip"
                });
                this.setState({table: table})
            })
            console.log(response);
        })
    }

    search = () => {
        $(document).ready(() => {
            $('#customSearchBox').keyup(() => {
                this.state.table.search($('#search').val()).draw();
            })
        });
    }

    render() {
        const {reports} = this.state
        return (
            <div className='container py-4'>
                <div className='row justify-content-left'>
                    <div className='col-md-8'>
                        <table id='reports' className='card'>
                            <tr className='card-header list-group-item list-group-item-action d-flex'>
                                <th className="row">
                                    <div className='col-sm-4'>Reports</div>
                                    <div id="customSearchBox" className="dataTables_filter col-sm-8">
                                        <input
                                            id="search"
                                            type="search"
                                            className="form-control form-control-sm"
                                            placeholder="Search"
                                            aria-controls="tasks"
                                            onKeyUp={this.search}
                                        />
                                    </div>
                                </th>
                            </tr>
                            <thead>
                            <tr className='card-header list-group-item list-group-item-action d-flex'>
                                <td className='badge badge-pill col-1'>id</td>
                                <td className='badge badge-pill col-2'>created by</td>
                                <td className='badge badge-pill col-3'>created at</td>
                                <td className='badge badge-pill col-4'>action</td>
                                <td className='badge badge-pill col-2'>task_id</td>
                            </tr>
                            </thead>
                            <tbody>
                            {reports.map(report => (
                                <tr className='list-group-item list-group-item-action d-flex justify-content-between align-items-left'
                                    onClick={() => this.showUserInfo(report)}
                                >
                                    <td className='badge badge-pill col-1'>
                                        {report.id}
                                    </td>
                                    <td className='badge badge-pill col-2'>
                                        {report.created_by}
                                    </td>
                                    <td className='badge badge-pill col-3'>
                                        {report.created_at}
                                    </td>
                                    <td className='badge badge-pill col-4'>
                                        {report.action}
                                    </td>
                                    <td className='badge badge-pill col-2'>
                                        {report.task_id}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReportsList
