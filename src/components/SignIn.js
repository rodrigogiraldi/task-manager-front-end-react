import React, { Component } from 'react';

import { isLoggedIn, logIn } from '../services/SessionService';

export default class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "asd",
            password: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        if (isLoggedIn()) {
            this.props.history.push('/search-task');
        }
    }

    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.logIn();
    }

    logIn() {
        fetch("http://localhost:8080/user/login",
            {
                method: 'post',
                body: JSON.stringify(this.state),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json()
                .then(resJson => {
                    console.log(resJson.data);
                    logIn(resJson.data);
                    this.props.history.push('/search-task');
                    this.props.logIn();
                }));
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-6">
                        <h1 className="text-center mt-4">Welcome to TM</h1>
                        <h3 className="mt-4">
                            <strong>Please, Sign-In</strong>
                        </h3>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="inputEmail">Email address</label>
                                <input name="email" type="email" onChange={this.handleChange} className="form-control" id="inputEmail"
                                    aria-describedby="emailHelp" placeholder="Enter email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputPassword">Password</label>
                                <input name="password" type="password" onChange={this.handleChange} className="form-control" id="inputPassword"
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
            </div>
        )
    }
}