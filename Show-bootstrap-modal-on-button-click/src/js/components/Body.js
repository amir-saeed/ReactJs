import React from 'react';
import Modal from './Modal';

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: { showModal: false }
        };
    }
    
    handleHideModal() {
        this.setState({ view: { showModal: false } });
    }

    handleShowModal() {
        this.setState({ view: { showModal: true } });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <button className="btn btn-primary" onClick={this.handleShowModal.bind(this)}>Open Modal</button>
                        {this.state.view.showModal ? <Modal handleHideModal={this.handleHideModal.bind(this)} /> : null}
                    </div>
                </div>                
            </div>
        );
    }
}

export default Body;