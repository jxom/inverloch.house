import { combineReducers } from 'redux';

import notificationMessage from './notification-message';

const uiReducer = combineReducers({
  notificationMessage
});

export default uiReducer;
