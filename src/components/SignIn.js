import React, { Component } from 'react';

export default class SignIn extends Component {
    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-6">
                    <h1 className="text-center mt-4">Welcome to TM</h1>
                    <h3 className="mt-4">
                        <strong>Please, Sign-In</strong>
                    </h3>
                    <form>
                        <div className="form-group">
                            <label htmlFor="inputEmail">Email address</label>
                            <input name="email" type="email" className="form-control" id="inputEmail"
                                aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword">Password</label>
                            <input name="password" type="password" className="form-control" id="inputPassword"
                                placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-primary" >Submit</button>
                        <small id="emailHelp" className="form-text text-muted">Don't you have an account? Click <a
                            href="/sign-up">here</a> to create one.</small>
                    </form>
                    <div >
                    </div>
                </div>
            </div>
        )
    }
}