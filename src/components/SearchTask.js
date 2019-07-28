import React, { Component } from 'react';

import { isLoggedIn, getToken } from '../services/SessionService';

export default class SearchTask extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            filteredTasks: []
        }

        this.filterTasks = this.filterTasks.bind(this);
    }

    componentWillMount() {
        if (!isLoggedIn()) {
            this.props.history.push('/sign-in');
        }
        else {
            this.getTasks();
        }
    }

    filterTasks(event) {

        let value = event.target.value;

        let newFilteredTasks = this.state.tasks.filter(task => {
            return task.searchable.toLowerCase().indexOf(value) >= 0;
        });

        this.setState({ filteredTasks: newFilteredTasks });
    }

    getTasks() {

        fetch("http://localhost:8080/task",
            {
                method: 'get',
                headers: {
                    'Authorization': getToken(),
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json()
                .then(resJson => {
                    this.createTasksFieldForSearching(resJson.data);
                    this.setState({ tasks: resJson.data });
                    this.setState({ filteredTasks: resJson.data });

                }));
    }

    createTasksFieldForSearching(tasks) {

        let field;

        for (let i = 0; i < tasks.length; i++) {
            field = tasks[i].category + tasks[i].startDateTime + tasks[i].endDateTime + tasks[i].description;
            field = field.toLowerCase();
            tasks[i].searchable = field;
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <h3 className="mt-4 text-center">
                            <strong>Search Tasks</strong>
                        </h3>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default">Task</span>
                            </div>
                            <input type="text" name="searchTask" className="form-control" aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default" onChange={this.filterTasks} />
                        </div>
                        <table className="table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Category</th>
                                    <th scope="col">Start</th>
                                    <th scope="col">End</th>
                                    <th scope="col">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.filteredTasks.map(task => {
                                    return (
                                        <tr key={task.id}>
                                            <td>{task.category}</td>
                                            <td>{task.startDateTime}</td>
                                            <td>{task.endDateTime}</td>
                                            <td>{task.description}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}