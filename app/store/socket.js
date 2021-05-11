import {createSlice} from '@reduxjs/toolkit';

const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    subs: [],
    data: {},
    current: Number(0),
  },
  reducers: {
    connectWs: state => {
      console.log('connecting');
    },
    onMessage: event => {
      console.log('OnMessage: ', event.data);
    },
    disconnectWs: state => {
      console.log('Disconnected');
    },
    addSub: (state, action) => {
      console.log('Adding sub: ', action.payload);
      if (state.subs.indexOf(action.payload.newSub) === -1) {
        state.subs.push(action.payload.newSub);
        state.data[action.payload.newSub] = {};
        state.data[action.payload.newSub].quantity = action.payload.quantity;
      }
    },
    editSub: (state, action) => {
      let item = action.payload;
      let oldData = state.data[item.sub];
      let newQuantity = item.isBuy
        ? Number(oldData.quantity) + Number(item.quantity)
        : Number(oldData.quantity) - Number(item.quantity);
      if (newQuantity === 0) {
        state.subs = state.subs.filter(sub => sub !== item.sub);
        delete state.data[item.sub];
      } else state.data[item.sub].quantity = newQuantity;
      let sum = 0;
      state.subs.forEach(sub => {
        sum = sum + state.data[sub].value;
      });
      state.current = sum;
    },
    removeSub: (state, action) => {
      state.subs = state.subs.filter(sub => sub !== action.payload.removeSub);
      delete state.data[action.payload.removeSub];
      if (state.subs.length === 0) state.current = 0;
    },
    refreshData: (state, action) => {
      let coin = action.payload.sub;
      if (action.payload.price !== undefined && state.data[coin]) {
        state.data[coin].price = action.payload.price;
        state.data[coin].value =
          action.payload.price * state.data[coin].quantity;
      }
      let sum = 0;
      state.subs.forEach(sub => {
        sum = sum + state.data[sub].value;
      });
      state.current = sum;
    },
    addDayClose: (state, action) => {
      if (state.data[action.payload.sub])
        state.data[action.payload.sub].close = action.payload.close;
    },
    displayMessage: (state, action) => {
      state.message = action.payload.message;
      state.showMessage = action.payload.showMessage;
    },
  },
});

export const {
  addSub,
  addDayClose,
  connectWs,
  disconnectWs,
  displayMessage,
  editSub,
  onMessage,
  refreshData,
  removeSub,
} = socketSlice.actions;
export default socketSlice.reducer;
