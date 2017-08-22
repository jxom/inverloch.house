import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';

import registerServiceWorker from './utils/register-service-worker';
import createStore from './utils/get-store';

import routes from './routes';

import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.css';
import './index.css';

registerServiceWorker();

const store = (window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)(hashHistory);
const history = syncHistoryWithStore(hashHistory, store);

// Define the app routes
const Routes = () => (
  <Router history={history} routes={routes}/>
);

// RENDER EVERYTHIN!
ReactDOM.render(
  <Provider store={store}>
    <Routes/>
  </Provider>,
  document.getElementById('root')
);
