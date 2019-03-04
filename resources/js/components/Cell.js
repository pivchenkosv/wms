import React, {Component} from 'react'
import axios from "axios";
import './Style.css';

class Cell extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            cellId: this.props.cellId,
            cellProducts: null,
        }
        //this.handleUserChange = this.handleUserChange.bind(this);
        //this.handleEmailChange = this.handleEmailChange.bind(this);
        // this.handleRoleChange = this.handleRoleChange.bind(this);
    }

    // isUserChanged = () => {
    //     return (this.state.userInfo.name === this.props.user.name &&
    //         this.state.userInfo.email === this.props.user.email &&
    //         this.state.userInfo.role === this.props.user.role);
    // };

    // selected = (event) => {
    //     if (this.state.userInfo.role === event.target.value)
    //     {
    //         event.target.selected = 'selected';
    //         return 'selected';
    //     }
    // };

    // inputChange = (event) => {
    //     const {name, value} = event.target;
    //     console.log(this.props);
    //     this.setState({
    //         userInfo: {
    //             ...this.state.userInfo,
    //             [name]: value,
    //         }})
    // };

    // handleRoleChange(evt) {
    //     let value = evt.target.options[evt.target.selectedIndex].value;
    //     console.log(value);
    //     this.setState({
    //         userInfo: {
    //             ...this.state.userInfo,
    //             role: value,
    //         }
    //     }, function () {
    //         console.log(this.state.userInfo.role);
    //     });
    // };

    // handleSubmit = (evt) => {
    //     evt.preventDefault();
    //     const params = new URLSearchParams();
    //     if (this.state.userInfo.id !== null)
    //         params.append('id' ,this.state.userInfo.id);
    //     params.append('name', this.state.userInfo.name);
    //     params.append('email', this.state.userInfo.email);
    //     params.append('role', this.state.userInfo.role);
    //     params.append('password', '12345678');
    //     params.append('password_confirmation', '12345678');
    //     params.append('_token',$('meta[name="csrf-token"]').attr('content'));
    //     axios.post('/api/register', params, {
    //         headers : {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}
    //     }).then(response => {
    //         console.log('fulfilled', response);
    //         console.log(response.data);
    //         this.props.rerenderUsersList(response.data);
    //     }).catch(response => {
    //         console.log('rejected', response);
    //         console.log(response.data);
    //     })
    // };

    // deleteUser = (event) => {
    //     event.preventDefault();
    //     const id = new URLSearchParams();
    //     id.append('id', this.state.userInfo.id);
    //     axios.post('/api/deleteUser', id).then(response => {
    //         this.props.rerenderUsersList(response.data);
    //     })
    // }

    componentDidMount() {
        axios.get("/api/cellInfo", {
            params: {
                cellId : this.state.cellId,
            }
        }).then(response => {
            this.setState({
                cellProducts: response.data
            })
        })
    }

    render() {
        const {cellProducts} = this.state;
        const {unmountForm} = this.props;
        return (
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className='col-sm-10'>{`Cell id: ` + this.state.cellId}</div>
                        <div className='col-sm-2'>
                            <button onClick={this.props.unmountForm}>&#x274C;</button>
                        </div>
                    </div>
                </div>
                <div className='card-header'>
                    <div className='list-group-item d-flex justify-content-between align-items-left'>
                        <span className='badge badge-pill col-4'>Product Name</span>
                        <span className='badge badge-pill col-4'>Quantity</span>
                        <span className='badge badge-pill col-4'>Volume</span>
                    </div>
                </div>

                <div className='card-body'>
                    <ul className='list-group list-group-flush'>
                        {cellProducts ? cellProducts.map(product => (
                            <div>
                                <div
                                    className='list-group-item list-group-item-action justify-content-between align-items-left'
                                >
                                            <span id={product.id} className='badge badge-pill col-4' >
                                                {product.name}
                                            </span>
                                    <span id={product.id} className='badge badge-pill col-4' >
                                                {product.quantity}
                                            </span>

                                    <span id={product.id} className='badge badge-pill col-4' >
                                                {product.volume}
                                            </span>
                                </div>
                            </div>
                        )) : ''}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Cell
