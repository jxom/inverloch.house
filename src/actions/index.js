const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

export const CLEAR_ALL_STATE = 'CLEAR_ALL_STATE';
export const CLEAR_VALUE = 'CLEAR_VALUE';
export const SET_VALUE = 'SET_VALUE';

export const action = (type, payload = {}) => ({
  type,
  ...payload
});

export const clear = keys => ({
  type: CLEAR_VALUE,
  keys
});

export const set = (key, value) => ({
  type: SET_VALUE,
  key,
  value
});

export const createRequestTypes = base => (
  [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    const a = acc;
    a[type] = `${base}_${type}`;
    return a;
  }, {})
);

export function clearAllState() {
  return {
    type: CLEAR_ALL_STATE
  };
}

export function receiveError(type, err) {
  return {
    type,
    err
  };
}

export function receiveSuccess(type, data) {
  return {
    type,
    data
  };
}

export function request(type, endpoint, data = null) {
  return {
    type,
    endpoint,
    data
  };
}

export const sdkActionCreator = (sdkAction, actions = {}, funcs = {}) =>
  async dispatch => {
    if (actions.request) {
      dispatch(actions.request());
    }

    try {
      const data = await sdkAction();
      if (actions.success) {
        dispatch(actions.success(data));
      }
      if (funcs.success) {
        funcs.success(data);
      }
      return data;
    } catch (err) {
      console.error(err);
      let errorData = err || 'An error occured!';
      if (err && err.data) {
        errorData = err.data;
      }
      if (actions.failure) {
        dispatch(actions.failure(errorData));
      }
      if (funcs.failure) {
        funcs.failure(errorData);
      }
      throw err;
    }
  };
