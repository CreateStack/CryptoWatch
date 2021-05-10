import AsyncStorage from '@react-native-async-storage/async-storage';

import {BASE_URL} from '../../websocket/constants';
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
  }, 2000);
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
      case '401':
        store.dispatch(
          socketActions.displayMessage({
            message:
              'API Key invalid or not preset. Please generate a new one from settings.',
            showMessage: true,
          }),
        );
        setTimeout(() => {
          store.dispatch(
            socketActions.displayMessage({
              message: '',
              showMessage: false,
            }),
          );
        }, 10000);
      default:
        break;
    }
  };
  console.log('action: ', action.type);
  switch (action.type) {
    case 'socket/connectWs':
      if (socket !== null) socket.close();
      AsyncStorage.getItem('apiKey').then(v => {
        socket = new WebSocket(BASE_URL + '?api_key=' + v);
        socket.onmessage = onMessage(store);

        store.getState().socket.subs.forEach(sub => {
          waitForSocketConnection(socket, () =>
            socket.send(JSON.stringify(createPayload(sub, true))),
          );
          waitForSocketConnection(socket, () =>
            socket.send(JSON.stringify(createPayload(sub, true, 24))),
          );
        });
        next(action);
      });
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
      waitForSocketConnection(socket, () => {
        socket.send(JSON.stringify(createPayload(action.payload.newSub, true)));
        setTimeout(() => {
          socket.send(
            JSON.stringify(createPayload(action.payload.newSub, true, 24)),
          );
        }, 3000);
      });
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
