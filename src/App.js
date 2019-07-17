import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Menu from './components/Menu';
import SearchTask from './components/SearchTask';
import SignIn from './components/SignIn';

import { isLoggedIn } from './services/SessionService';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false
    }

    this.logOut = this.logOut.bind(this);
    this.logIn = this.logIn.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoggedIn: isLoggedIn() })
  }

  logOut() {
    this.setState({ isLoggedIn: false });
  }

  logIn() {
    this.setState({ isLoggedIn: true });
  }

  render() {
    return (
      <div>
        <Router>
          {this.state.isLoggedIn ? <Route render={(routeProps) => <Menu {...routeProps} logOut={this.logOut} />} /> : ""}
          <Route path="/search-task" component={SearchTask} />
          <Route path="/sign-in" render={(routeProps) => <SignIn {...routeProps} logIn={this.logIn} />} />
        </Router>
      </div>
    );
  }
}

export default App;
