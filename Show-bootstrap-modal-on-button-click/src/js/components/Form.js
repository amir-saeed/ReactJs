import React from 'react';
import IPAddress from './IPAddress';

class Form extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('form is valid');
    }

    render() {
        return (
            <div className="form-section">
                <div className="container">
                    <div className="row">
                        <div class="col-md-5 col-md-offset-3">
                            <form id="login-form" role="form" onSubmit={this.handleSubmit}>
                                <div class="form-group">
                                    <label for="login-email">Email</label>
                                    <input id="login-email"
                                        class="email form-control input-md"
                                        type="email"
                                        placeholder="Email"
                                        required={true}
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="login-password">Password</label>
                                    <input id="login-password"
                                        class="form-control input-md"
                                        type="password"
                                        placeholder="Password" 
                                        required={true}
                                        />
                                </div>
                                <div class="form-group">
                                    <div className="pull-left">
                                        <IPAddress />
                                    </div>
                                    <button id="login-button" type="submit"
                                        class="btn btn-success btn-md pull-right">Sign in</button>
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