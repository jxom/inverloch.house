import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { reactReduxFirebase } from 'react-redux-firebase';
import * as firebase from 'firebase';
import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from '../reducers';

const isDev = process.env.NODE_ENV !== 'production';

const devMiddleware = appHistory => applyMiddleware(
  thunk,
  routerMiddleware(appHistory),
  createLogger()
);
const prodMiddleware = appHistory => applyMiddleware(
  thunk,
  routerMiddleware(appHistory)
);

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'inverlochhouse-58558.firebaseapp.com',
  databaseURL: 'https://inverlochhouse-58558.firebaseio.com',
  projectId: 'inverlochhouse-58558',
  storageBucket: 'inverlochhouse-58558.appspot.com',
  messagingSenderId: '190003553301'
});

export default (appHistory, initialState) =>
  createStore(
    rootReducer,
    initialState,
    compose(
      persistState([
        // 'user'
      ], { key: 'medipassRedux' }),
      reactReduxFirebase(firebase, { userProfile: 'users' }),
      isDev ? devMiddleware(appHistory) : prodMiddleware(appHistory)
    ),
  );

