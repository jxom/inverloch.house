import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { firebaseStateReducer } from '@jmoxey/react-redux-firebase';
import _set from 'lodash/set';
import _pick from 'lodash/pick';

import { CLEAR_ALL_STATE, CLEAR_VALUE, SET_VALUE } from '../actions';

// Keys to not clear upon the CLEAR_ALL_STATE action
const PERSIST_KEYS = ['custom', '_ui', 'location', 'form', 'routing'];

export const request = (state, isFetchingKey = 'isFetching', hasFetchedKey = 'hasFetched') =>
  Object.assign({}, state, { [isFetchingKey]: true, [hasFetchedKey]: false });

export const success = (state, action, isFetchingKey = 'isFetching', hasFetchedKey = 'hasFetched') =>
  Object.assign({}, isFetchingKey === 'isFetching' ? {} : state, {
    [isFetchingKey]: false,
    [hasFetchedKey]: true,
    data: action.payload
  });

export const failure = (state, action, isFetchingKey = 'isFetching', hasFetchedKey = 'hasFetched') =>
  Object.assign({}, isFetchingKey === 'isUpdating' ? state : {}, {
    [isFetchingKey]: false,
    [hasFetchedKey]: false,
    error: action.payload
  });

const appReducer = combineReducers({
  firebase: firebaseStateReducer,
  form: formReducer,
  routing
});

const rootReducer = (state, action) => {
  let newState = Object.assign({}, state);

  if (action.type === CLEAR_ALL_STATE) {
    newState = Object.assign({}, _pick(state, PERSIST_KEYS));
  }

  if (action.type === CLEAR_VALUE) {
    action.keys.forEach(key => _set(newState, key, {}));
    newState = Object.assign({}, state, newState);
  }

  if (action.type === SET_VALUE) {
    newState = Object.assign({}, newState, { [action.key]: action.value });
  }

  return appReducer(newState, action);
};

export default rootReducer;
