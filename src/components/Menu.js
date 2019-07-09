import React, { Component } from 'react';

export default class Menu extends Component {
    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand" href="/home">Task Manager</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                    aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarColor01">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="/search-task">Search</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/new-task">Add new task <span class="sr-only">(current)</span></a>
                        </li>
                    </ul>
                    <form class="form-inline">
                        <button class="btn btn-outline-info my-2 my-sm-0" type="submit">Log out</button>
                    </form>
                </div>
            </nav>
        );
    }
}