import React from 'react';
import Modal from './Modal';

class Body extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     view: { showModal: false }
        // };
    }

    // getInitialState() {
    //     return { view: { showModal: false } }
    // }

    handleHideModal() {
        this.setState({ view: { showModal: false } });
    }

    handleShowModal() {
        console.log('i am clicked',this.state);
        this.setState({ view: { showModal: true } });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <button className="btn btn-primary btn-block" onClick={this.handleShowModal.bind(this)}>Open Modal</button>
                    </div>
                </div>
                <Modal />
            </div>
        );
    }
}

export default Body;