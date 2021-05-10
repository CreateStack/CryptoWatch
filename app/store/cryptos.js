import {createSlice} from '@reduxjs/toolkit';
import {Alert} from 'react-native';

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {},
  reducers: {
    addCrypto: (state, action) => {
      let item = state.cryptos.filter(
        crypto => crypto.id === action.payload.crypto.id,
      );
      if (item.length > 0) {
        Alert.alert('Crypto already exists. Please Edit or Delete it');
        return;
      }
      state.cryptos.push(action.payload.crypto);
      state.investment = Number(
        Number(state.investment) +
          action.payload.crypto.buyPrice * action.payload.crypto.quantity,
      ).toFixed(2);
    },
    deleteCrypto: (state, action) => {
      state.cryptos = state.cryptos.filter(
        crypto => crypto.id !== action.payload.crypto.id,
      );
      state.investment = Number(
        Number(state.investment) -
          action.payload.crypto.buyPrice * action.payload.crypto.quantity,
      ).toFixed(2);
    },
    editCrypto: (state, action) => {
      let item = action.payload.crypto;
      if (!item) return;
      for (let i = 0; i < state.cryptos.length; i++) {
        if (state.cryptos[i].id === item.id) {
          let oldData = state.cryptos[i];
          let newQuantity = item.buy
            ? Number(oldData.quantity) + Number(item.quantity)
            : Number(oldData.quantity) - Number(item.quantity);
          if (newQuantity === 0) {
            state.cryptos = state.cryptos.filter(
              crypto => crypto.id !== item.id,
            );
            state.investment = Number(
              Number(state.investment) - oldData.buyPrice * oldData.quantity,
            ).toFixed(2);
            break;
          }
          let newBuyPrice = item.buy
            ? (Number(oldData.buyPrice * oldData.quantity) +
                Number(item.price * item.quantity)) /
              newQuantity
            : (Number(oldData.buyPrice * oldData.quantity) -
                Number(item.price * item.quantity)) /
              newQuantity;
          state.cryptos[i].buyPrice = newBuyPrice.toFixed(2);
          state.cryptos[i].quantity = newQuantity;
          let newInvestment = 0;
          newInvestment = item.buy
            ? Number(state.investment) + item.price * item.quantity
            : Number(state.investment) - oldData.buyPrice * item.quantity;
          state.investment = Number(newInvestment).toFixed(2);
          break;
        }
      }
    },
    changeTheme: (state, action) => {
      state.darkMode = action.payload.theme;
    },
  },
});

export const {
  addCrypto,
  changeTheme,
  deleteCrypto,
  editCrypto,
} = cryptoSlice.actions;
export default cryptoSlice.reducer;
