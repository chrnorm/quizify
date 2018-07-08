import React, { Component } from 'react';
import PageLanding from './components/PageLanding/PageLanding';
import PageOnboarding from './components/PageOnboarding/PageOnboarding';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
          <Route exact path="/" component={PageLanding} />
          <Route path="/start" component={PageOnboarding} />
      </div>
      </Router>
    );
  }
}

export default App;
