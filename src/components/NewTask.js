import React, { Component } from 'react';

import { isLoggedIn, getToken } from '../services/SessionService';

export default class NewTask extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            category: "",
            startDate: "",
            startTime: "",
            endDate: "",
            endTime: "",
            description: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {

        if (!isLoggedIn()) {
            this.props.history.push('/sign-in');
        }
        else {
            fetch("http://localhost:8080/category")
                .then(res => res.json()
                    .then(resJson => {
                        let categories = resJson.data;
                        this.setState({ categories });
                    }));
        }
    }

    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.isFormValid()) {
            let objectToSubmit = {
                id: 0,
                category: this.state.category,
                startDateTime: new Date(`${this.state.startDate} ${this.state.startTime}`),
                endDateTime: new Date(`${this.state.endDate} ${this.state.endTime}`),
                description: this.state.description
            }

            fetch("http://localhost:8080/task",
                {
                    method: 'post',
                    body: JSON.stringify(objectToSubmit),
                    headers: {
                        'Authorization': getToken(),
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json()
                    .then(resJson => {
                        this.props.history.push('/search-task');
                    }));

        }
        else {
            console.log("You have to fill in all the fields to create a task");
        }
    }

    isFormValid() {
        return (this.state.category !== "" && this.state.startDate !== "" && this.state.startTime !== "" && this.state.endDate !== "" && this.state.endTime !== "" && this.state.description !== "");
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-6">
                        <h3 className="mt-4">
                            <strong>New Task</strong>
                        </h3>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="category">Category</label>
                                <select className="form-control" name="category" onChange={this.handleChange}>
                                    {this.state.categories.map(category =>
                                        <option key={category}>{category}</option>
                                    )}
                                </select>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputStartDate">Start date</label>
                                    <input name="startDate" type="date" className="form-control" id="inputStartDate" onChange={this.handleChange} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputStartTime">Time</label>
                                    <input name="startTime" type="time" className="form-control" id="inputStartTime" onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEndDate">End date</label>
                                    <input name="endDate" type="date" className="form-control" id="inputEndDate" onChange={this.handleChange} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEndTime">Time</label>
                                    <input name="endTime" type="time" className="form-control" id="inputEndTime" onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputDescription">Description</label>
                                <input name="description" type="text" className="form-control" id="inputDescription"
                                    placeholder="Enter description for this task" onChange={this.handleChange} />
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                        <div className="mt-2">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}