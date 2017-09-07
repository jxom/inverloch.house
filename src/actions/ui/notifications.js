export const NOTIFICATION_MESSAGE_TOGGLE = 'NOTIFICATION_MESSAGE_TOGGLE';
export const toggleNotificationMessage = ({ type = 'info', message, title, path }) => (
  { type: NOTIFICATION_MESSAGE_TOGGLE, payload: { type, message, title, path } }
);
export const successNotif = payload => toggleNotificationMessage({ type: 'success', title: 'Success!', ...payload });
