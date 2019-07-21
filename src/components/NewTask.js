import React, { Component } from 'react';

import { isLoggedIn } from '../services/SessionService';

export default class NewTask extends Component {

    constructor(props) {
        super(props);

        this.state = { categories: [] };
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

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-6">
                        <h3 className="mt-4">
                            <strong>New Task</strong>
                        </h3>
                        <form>
                            <div className="form-group">
                                <label htmlFor="category">Category</label>
                                <select className="form-control" name="category">
                                    {this.state.categories.map(category =>
                                        <option key={category}>{category}</option>
                                    )}
                                </select>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputStartDate">Start date</label>
                                    <input name="startDate" type="date" className="form-control" id="inputStartDate" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputStartTime">Time</label>
                                    <input name="startTime" type="time" className="form-control" id="inputStartTime" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEndDate">End date</label>
                                    <input name="startEnd" type="date" className="form-control" id="inputEndDate" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEndTime">Time</label>
                                    <input name="endTime" type="time" className="form-control" id="inputEndTime" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputDescription">Description</label>
                                <input name="description" type="text" className="form-control" id="inputDescription"
                                    placeholder="Enter description for this task" />
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