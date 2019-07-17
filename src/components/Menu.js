import React, { Component } from 'react';

import { logOut } from '../services/SessionService';

import { withRouter } from 'react-router-dom'

export default class Menu extends Component {

    constructor(props) {
        super(props);

        this.logOut = this.logOut.bind(this);
    }

    logOut(event) {
        event.preventDefault();
        logOut();
        this.props.history.push('/sign-in');
        this.props.logOut();
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/home">Task Manager</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                    aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/search-task">Search</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/new-task">Add new task <span className="sr-only">(current)</span></a>
                        </li>
                    </ul>
                    <form className="form-inline">
                        <button className="btn btn-outline-info my-2 my-sm-0" onClick={this.logOut}>Log out</button>
                    </form>
                </div>
            </nav>
        );
    }
}