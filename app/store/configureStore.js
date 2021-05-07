import {configureStore} from '@reduxjs/toolkit';
import cryptoReducer from './cryptos';

export default () =>
  configureStore({
    reducer: {
      crypto: cryptoReducer,
    },
  });
