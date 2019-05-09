import React, {Component} from 'react';
import CanvasJSReact from '../canvasjs-2/canvasjs.react';
import {loadUsersRating} from "../api/users";
import {loadProductsReport} from "../api/products";
import {loadAvailableCells, loadCellInfo} from "../api/cells";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Home extends Component {

    state = {
        products: [],
        cells: [],
        usersRating: [],
        tasksCountData: [],
        subtasksCountData: []
    }

    componentDidMount() {
        loadUsersRating().then(response => {
            this.setState({
                usersRating: response.data.data
            }, () => {
                console.log('responce', response.data.data)
                const tasksCountData = []
                const subtasksCountData = []

                if (this.state)
                    this.state.usersRating.forEach((item, index) => {
                        tasksCountData.push({x: index, y: item.tasks_count, label: item.name})
                        subtasksCountData.push({x: index, y: item.subtasks_count, label: item.name})
                    })
                this.setState({
                    tasksCountData: tasksCountData,
                    subtasksCountData: subtasksCountData,
                })
            })
        })

        loadProductsReport().then(response => {
            this.setState({
                products: response.data.data
            })
        })

        loadAvailableCells().then(response => {
            this.setState({
                cells: response.data.data.filter(cell => cell.status !== 'RESERVED')
            }, () => {
                console.log('responce', response.data.data)
                const filled = []
                const free = []

                this.state.cells.forEach((item, index) => {
                    filled.push({x: index, y: 100 * item.available_volume / item.volume, label: item.id})
                    free.push({x: index, y: 100 - 100 * item.available_volume / item.volume, label: item.id})
                })
                this.setState({
                    filled: filled,
                    free: free,
                })
            })
        })
    }

    toggleDataSeries(e) {
        e.dataSeries.visible = !(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible);
        this.chart.render();
    }

    render() {

        const {tasksCountData, subtasksCountData, products, filled, free} = this.state
        console.log('data', tasksCountData)
        console.log(subtasksCountData)

        const options = {
            height: tasksCountData.length * 100,
            animationEnabled: true,
            theme: "light2",
            title: {
                text: "Users rating"
            },
            toolTip: {
                shared: true
            },
            axisY: {
                interval: 1,
            },
            legend: {
                cursor: "pointer",
                itemclick: this.toggleDataSeries
            },
            data: [
                {
                    type: "stackedBar",
                    name: "Tasks",
                    showInLegend: "true",
                    dataPoints: tasksCountData.sort()
                },
                {
                    type: "stackedBar",
                    name: "Subtasks",
                    showInLegend: "true",
                    dataPoints: subtasksCountData
                },
            ]
        }

        const options2 = {
            height: tasksCountData.length * 70,
            title: {
                text: "Cells volume"
            },
            toolTip: {
                shared: true
            },
            legend: {
                verticalAlign: "top"
            },
            axisY: {
                suffix: "%"
            },
            data: [{
                type: "stackedBar100",
                color: "#9bbb59",
                name: "is filled",
                showInLegend: true,
                indexLabel: "{y}",
                indexLabelFontColor: "white",
                yValueFormatString: "#,###'%'",
                dataPoints: filled
            }, {
                type: "stackedBar100",
                color: "#7f7f7f",
                name: "free",
                showInLegend: true,
                indexLabel: "{y}%",
                indexLabelFontColor: "white",
                yValueFormatString: "#,###'%'",
                dataPoints: free
            }]
        }

        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card" style={{height: tasksCountData.length * 100 + 100}}>
                            <div className="card-header">Dashboard</div>
                            <div className="card-body">
                                <CanvasJSChart options={options}
                                               onRef={ref => this.chart = ref}
                                />
                            </div>
                        </div>

                        <table className='card my-4'>
                            <div className="card-header">Products</div>
                            <thead>
                            <tr className='card-header list-group-item list-group-item-action d-flex'>
                                <th className='badge-pill col-2'>id</th>
                                <th className='badge-pill col-4'>name</th>
                                <th className='badge-pill col-4'>description</th>
                                <th className='badge-pill col-2'>quantity available</th>
                            </tr>
                            </thead>

                            <tbody>
                            {products.map(product => (
                                <tr
                                    key={product.id}
                                    className='card-body list-group-item list-group-item-action d-flex'
                                >
                                    <td className='badge-pill col-2'>
                                        {product.id}
                                    </td>
                                    <td className='badge-pill col-4'>
                                        {product.name}
                                    </td>
                                    <td className='badge-pill col-4'>
                                        {product.description}
                                    </td>
                                    <td className='badge-pill col-2'>
                                        {product.quantity}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        <div className="card" style={{height: tasksCountData.length * 70 + 100}}>
                            <div className="card-header">Dashboard</div>
                            <div className="card-body">
                                <CanvasJSChart options={options2}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home
