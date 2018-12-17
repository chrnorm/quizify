import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './redux/reducers';
import loginSaga from './redux/sagas/spotifyLoginSaga';
import trackDownloadSaga from './redux/sagas/trackDownloadSaga';
import questionSaga from './redux/sagas/questionSaga';
import PrivateRoute from './util/PrivateRoute';

import PageLanding from './screens/PageLanding/PageLanding';
import PageOnboarding from './screens/PageOnboarding/PageOnboarding';
import PageApp from './screens/PageApp/PageApp';
import PageResults from './screens/PageResults';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { theme } from './styles/theme';

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
sagaMiddleware.run(questionSaga);

const App = () => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route exact path="/" component={PageLanding} />
                    <PrivateRoute path="/start" component={PageOnboarding} />
                    <PrivateRoute path="/app" component={PageApp} />
                    <PrivateRoute path="/results" component={PageResults} />
                </Switch>
            </ConnectedRouter>
        </ThemeProvider>
    </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
