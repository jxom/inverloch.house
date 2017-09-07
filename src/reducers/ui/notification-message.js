import _get from 'lodash/get';
import { NOTIFICATION_MESSAGE_TOGGLE } from '../../actions/ui/notifications';

export default function notificationMessage(state = {}, action) {
  switch (action.type) {
    case NOTIFICATION_MESSAGE_TOGGLE: {
      return Object.assign({}, _get(action, 'payload.message') ? action.payload : {});
    }
    default: return state;
  }
}
