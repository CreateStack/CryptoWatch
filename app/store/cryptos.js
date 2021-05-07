import {createSlice} from '@reduxjs/toolkit';

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    cryptos: [
      {id: 'BTC', name: 'Bitcoin'},
      {id: 'ETH', name: 'Ethereum'},
    ],
  },
  reducers: {
    addCrypto: (state, action) => {
      state.cryptos.push(action.payload.crypto);
    },
    deleteCrypto: (state, action) => {
      state.cryptos = state.cryptos.filter(
        crypto => crypto.id !== action.payload.crypto.id,
      );
    },
    editCrypto: (state, action) => {},
  },
});

export const {addCrypto, deleteCrypto, editCrypto} = cryptoSlice.actions;
export default cryptoSlice.reducer;
