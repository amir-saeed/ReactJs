import React from 'react';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from "react-router";
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
        xhr.done(this._onSuccess.bind(this))
            .fail(this._onError.bind(this))
            .always(this.hideLoading.bind(this))
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

    _create() {
        return $.ajax({
            url: 'http://localhost:3000/auth/login/',
            type: 'POST',
            data: {
                email: this.state.email,
                password: this.state.password
            },
            beforeSend: function () {
                this.setState({ loading: true });
            }.bind(this)
        })
    }


    _onSuccess(data) {
        if (data) {
            if (data.success) {
                this.setState({
                    errors: {}
                });

                console.log('83483838838',this.state);

                hashHistory.push('/dashboard');
            }
        }
    }

    _onError(data) {
        if (!data.responseJSON.success) {
            let onErrors = {};
            onErrors.summary = data.responseJSON.message;
            this.setState({
                errors: onErrors
            });
        }
    }

    render() {
        return (
            <div className="form-section">
                <div className="container">
                    <div className="row">
                        <div class="col-md-5 col-md-offset-3 error-summary">
                            <p>{this.state.errors.summary}</p>
                        </div>
                    </div>
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