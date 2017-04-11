import React from 'react';
let ReactDom = require('react-dom');

class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            view: { showModal: false }
        };
    }

    componentDidMount() {

        $(ReactDom.findDOMNode(this)).modal('show');
        $(ReactDom.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideModal);
    }

    render() {
        return (
            <div className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">Modal Form</h4>
                        </div>
                        <div className="modal-body">
                            <p>Form body contents here</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    propTypes: { handleHideModal: React.PropTypes.func.isRequired }
}

export default Modal;