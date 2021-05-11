import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';

import cryptoReducer from './cryptos';
import socketReducer from './socket';
import socketMiddleware from './middleware/webSocket';

export default (
  initialState = {
    socket: {
      subs: ['BTC'],
      data: {
        BTC: {
          quantity: '0.00011',
          price: 55978.35,
          value: 6.1576185,
          close: 56000.76,
        },
      },
      current: 6.1576185,
      message: '',
      showMessage: false,
    },
    crypto: {
      cryptos: [
        {
          id: 'BTC',
          name: 'Bitcoin',
          buyPrice: 56496.186069776166,
          quantity: '0.00011',
        },
      ],
      investment: 6.214580467675378,
      darkMode: true,
      currency: 'INR',
    },
  },
) =>
  configureStore({
    reducer: {
      socket: socketReducer,
      crypto: cryptoReducer,
    },
    middleware: [...getDefaultMiddleware(), socketMiddleware],
    preloadedState: initialState,
  });
