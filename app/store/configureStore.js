import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';

import cryptoReducer from './cryptos';
import socketReducer from './socket';
import socketMiddleware from './middleware/webSocket';

export default (
  initialState = {
    crypto: {
      cryptos: [
        {id: 'BTC', name: 'Bitcoin', buyPrice: 1, quantity: 1},
        {id: 'ETH', name: 'Ethereum', buyPrice: 2, quantity: 2},
      ],
      investment: Number(5).toFixed(2),
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
