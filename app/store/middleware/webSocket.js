import {API_KEY, BASE_URL} from '../../websocket/constants';
import * as socketActions from '../socket';

let socket = null;

const createPayload = (sub, add, type = 2) => ({
  action: add ? 'SubAdd' : 'SubRemove',
  subs: [type + '~Binance~' + sub + '~USDT' + (type === 24 ? '~D' : '')],
});

function waitForSocketConnection(socket, callback) {
  setTimeout(function () {
    if (socket.readyState === 1) {
      console.log('Connection is alive');
      if (callback != null) {
        callback();
      }
    } else {
      waitForSocketConnection(socket, callback);
    }
  }, 5000);
}

const socketMiddleware = store => next => action => {
  const onMessage = store => event => {
    const payload = JSON.parse(event.data);
    //console.log('Payload: ', payload);
    console.log('Response type: ', payload.TYPE);
    switch (payload.TYPE) {
      case '2':
        store.dispatch(
          socketActions.refreshData({
            sub: payload.FROMSYMBOL,
            price: payload.PRICE,
          }),
        );
        break;
      case '24':
        let timeStamp = payload.TS;
        timeStamp = String(timeStamp) + '000';
        if (
          new Date(Number(timeStamp)).toUTCString().split(' ')[1] ===
          new Date().toUTCString().split(' ')[1]
        ) {
          store.dispatch(
            socketActions.addDayClose({
              sub: payload.FROMSYMBOL,
              close: payload.CLOSE,
            }),
          );
        }
        break;
      default:
        break;
    }
  };
  console.log('action: ', action.type);
  switch (action.type) {
    case 'socket/connectWs':
      if (socket !== null) socket.close();
      socket = new WebSocket(BASE_URL + '?api_key=' + API_KEY);
      socket.onmessage = onMessage(store);

      store.getState().socket.subs.forEach(sub => {
        console.log('Add ', createPayload(sub, true));
        console.log('close ', createPayload(sub, true, 24));
        waitForSocketConnection(socket, () =>
          socket.send(JSON.stringify(createPayload(sub, true))),
        );
        waitForSocketConnection(socket, () =>
          socket.send(JSON.stringify(createPayload(sub, true, 24))),
        );
      });
      next(action);
      break;
    case 'socket/disconnectWs':
      try {
        socket.close();
        socket = null;
      } catch (error) {
        console.log('Error closing socket: ', error);
      }
      next(action);
      break;
    case 'socket/addSub':
      waitForSocketConnection(socket, () =>
        socket.send(JSON.stringify(createPayload(action.payload.newSub, true))),
      );
      next(action);
      break;
    case 'socket/removeSub':
      waitForSocketConnection(socket, () =>
        socket.send(
          JSON.stringify(createPayload(action.payload.removeSub, false)),
        ),
      );
      next(action);
      break;
    default:
      next(action);
  }
};

export default socketMiddleware;
