import React, {Component} from 'react';

class Home extends Component {

    render() {
        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Dashboard</div>
                            <div className="card-body">
                                You are logged in!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home
