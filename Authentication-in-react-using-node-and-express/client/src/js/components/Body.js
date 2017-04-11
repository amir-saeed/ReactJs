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
            <div className="row modal-body">
                <div className="col-md-12">
                    <span onClick={this.handleShowModal.bind(this)}><i className="glyphicon glyphicon-question-sign" /></span>
                    {this.state.view.showModal ? <Modal handleHideModal={this.handleHideModal.bind(this)} /> : null}
                </div>
            </div>
        );
    }
}
/*
* This is main body of the page
*/
export default Body;