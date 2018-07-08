import React, { Component } from 'react';
import PageLanding from './components/PageLanding/PageLanding';
import PageOnboarding from './components/PageOnboarding/PageOnboarding';
import PageApp from './components/PageApp/PageApp';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
          <Route exact path="/" component={PageLanding} />
          <Route path="/start" component={PageOnboarding} />
          <Route path="/app" component={PageApp} />
      </div>
      </Router>
    );
  }
}

export default App;
