export const getMessageConfig = (type, message, actions) => {
  switch (type) {
    case 1:
      return { message, messageType: type, onAccept: actions.onAccept, path: '/inventario' };
    case 2:
    case 3:
      return { message, messageType: type, onAccept: actions.onAccept };
    case 4:
    case 6:
      return { message, messageType: type, onAccept: actions.onConfirm, onCancel: actions.onCancel };
    case 5:
      return { message, messageType: type, onCancel: actions.onCancel };
    default:
      return null;
  }
};
