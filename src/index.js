import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PageLanding from './screens/PageLanding/PageLanding';
import PageOnboarding from './screens/PageOnboarding/PageOnboarding';
import PageApp from './screens/PageApp/PageApp';
import PageResults from './screens/PageResults/PageResults';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const App = () => (
    <Router>
        <div className="App">
            <Route exact path="/" component={PageLanding} />
            <Route path="/start" component={PageOnboarding} />
            <Route path="/app" component={PageApp} />
            <Route path="/results" component={PageResults} />
        </div>
    </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
