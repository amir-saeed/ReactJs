import React from 'react';
import IPAddress from './IPAddress';
import Loading from './spinner';

class Form extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            email: '',
            password: '',
            loading: false,
            numberOfTime: 1,
            errors: {}
        };
    }

    _onChange(e) {
        var localState = {};
        localState[e.target.name] = $.trim(e.target.value);
        this.setState(localState);
    }

    _formGroupClass(field) {
        var className = "form-group ";
        if (field) {
            className += " has-error";
        }
        return className;
    }

    hideLoading() {
        this.setState({ loading: false });
    }

    _handleSubmit(e) {
        e.preventDefault();
        var errors = this._validate();
        if (Object.keys(errors).length !== 0) {
            this.setState({
                errors: errors
            });
            return;
        }

        var xhr = this._create();
        // xhr.done(this._onSuccess)
        //     .fail(this._onError)
        //     .always(this.hideLoading)
    }

    _validate() {
        var errors = {};
        if (this.state.email === "") {
            errors.email = "Email is required";
        }
        if (this.state.password === "") {
            errors.password = "Password is required";
        }
        return errors;
    }

    // _create() {
    //     return $.ajax({
    //         url: 'http://localhost:3000/auth/login/',
    //         type: 'POST',
    //         dataType: 'jsonp',
    //         data: {
    //             email: this.state.email,
    //             password: this.state.password
    //         },
    //         beforeSend: function () {
    //             this.setState({ loading: true });
    //         }.bind(this)
    //     })
    // }

    _create() {
        // create a string for an HTTP body message
        const email = encodeURIComponent(this.state.email);
        const password = encodeURIComponent(this.state.password);
        const formData = `email=${email}&password=${password}`;
        // create an AJAX request 1
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/auth/login');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {

            console.log(xhr.status);

            if (xhr.status === 200) {
                // success

                // change the component-container state
                this.setState({
                    errors: {}
                });

                // save the token
               // Auth.authenticateUser(xhr.response.token);


                // change the current URL to /
                this.context.router.replace('/');
            } else {
                // failure

                console.log('7373734737473::::', xhr.response);

                // change the component state
                const errors = xhr.response.errors ? xhr.response.errors : {};
                //errors.summary = xhr.response.message;

                // this.setState({
                //     errors
                // });
            }
        });

        console.log(formData);

        xhr.send(formData);
    }


    _onSuccess(data) {

        console.log('_onSuccess', data);

        //  this.refs.user_form.getDOMNode().reset();
        //this.setState(this.getInitialState());
    }

    _onError(data) {

        console.log('_onError', data);

        // var message = "Failed to create the user";
        // var res = data.responseJSON;
        // if (res.message) {
        //     message = data.responseJSON.message;
        // }
        // if (res.errors) {
        //     this.setState({
        //         errors: res.errors
        //     });
        // }
    }


    // Create the XHR object.
    createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            // XHR for Chrome/Firefox/Opera/Safari.
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined") {
            // XDomainRequest for IE.
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            // CORS not supported.
            xhr = null;
        }
        return xhr;
    }

    render() {
        return (
            <div className="form-section">
                <div className="container">
                    <div className="row">
                        <div class="col-md-5 col-md-offset-3">
                            <form id="login-form" ref='user_form' role="form" onSubmit={this._handleSubmit.bind(this)} >
                                <div className={this._formGroupClass(this.state.errors.email)}>
                                    <label className="control-label" for="email">Email</label>
                                    <input id="email"
                                        class="email form-control input-md"
                                        type="email"
                                        name="email"
                                        ref="email"
                                        placeholder="Email"
                                        onChange={this._onChange.bind(this)}
                                    />
                                    <span className="help-block">{this.state.errors.email}</span>
                                </div>

                                <div className={this._formGroupClass(this.state.errors.password)}>
                                    <label className="control-label" for="password">Password</label>
                                    <input id="password"
                                        class="form-control input-md"
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        ref="password"
                                        onChange={this._onChange.bind(this)}
                                    />
                                    <span className="help-block">{this.state.errors.password}</span>
                                </div>
                                <div class="form-group">
                                    <div className="pull-left">
                                        <IPAddress numberOfTime={this.state.numberOfTime} />
                                    </div>
                                    <button id="login-button" type="submit"
                                        class="btn btn-success btn-md pull-right" disabled={this.state.loading}>Sign in
                                        <Loading loading={this.state.loading} />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
/*
* This is main body of the page
*/
export default Form;