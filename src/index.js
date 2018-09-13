import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './redux/reducers';
import loginSaga from './redux/sagas/spotifyLoginSaga';
import trackDownloadSaga from './redux/sagas/trackDownloadSaga';

import PageLanding from './screens/PageLanding/PageLanding';
import PageOnboarding from './screens/PageOnboarding/PageOnboarding';
import PageApp from './screens/PageApp/PageApp';
import PageResults from './screens/PageResults/PageResults';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

// redux middlewares
const history = createHistory();
const sagaMiddleware = createSagaMiddleware();

// redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = applyMiddleware(routerMiddleware(history), sagaMiddleware);

const store = createStore(reducers, composeEnhancers(middleware));

// run saga middleware
sagaMiddleware.run(loginSaga);
sagaMiddleware.run(trackDownloadSaga);

const App = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/" component={PageLanding} />
                <Route path="/start" component={PageOnboarding} />
                <Route path="/app" component={PageApp} />
                <Route path="/results" component={PageResults} />
            </Switch>
        </ConnectedRouter>
    </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
