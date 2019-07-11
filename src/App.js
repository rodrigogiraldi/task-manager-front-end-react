import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Menu from './components/Menu';
import SearchTask from './components/SearchTask';
import SignIn from './components/SignIn';

class App extends Component {
  render() {
    return (
      <div className="container">
        {/* <Menu/> */}
        <Router>
          <Route path="/search-task" component={SearchTask} />
          <Route path="/sign-in" component={SignIn} />
        </Router>
      </div>
    );
  }
}

export default App;
