import {useContext} from 'react';

import StoreContext from './context';
import * as actions from './cryptos';
import * as socketActions from './socket';

export default useStore = () => {
  const {store} = useContext(StoreContext);

  const getState = () => {
    return store.getState();
  };

  const subscribeStore = onStoreChange => {
    return store.subscribe(onStoreChange);
  };

  const addCrypto = (crypto = null) => {
    if (crypto) {
      store.dispatch(actions.addCrypto({crypto}));
      return;
    }
  };

  const deleteCrypto = (crypto = null) => {
    if (crypto) {
      store.dispatch(actions.deleteCrypto({crypto}));
      return;
    }
  };

  const editCrypto = (crypto = null) => {
    if (crypto) {
      store.dispatch(actions.editCrypto({crypto}));
      return;
    }
  };

  const changeTheme = (theme = null) => {
    if (theme !== null) {
      store.dispatch(actions.changeTheme({theme}));
    }
  };

  const addSub = (newSub, quantity) => {
    store.dispatch(socketActions.addSub({newSub, quantity}));
  };
  const editSub = (sub, price, quantity, isBuy) => {
    store.dispatch(socketActions.editSub({sub, price, quantity, isBuy}));
  };
  const refreshData = (sub, price) => {
    store.dispatch(socketActions.refreshData({sub, price}));
  };
  const removeSub = removeSub => {
    store.dispatch(socketActions.removeSub({removeSub}));
  };
  const connectWs = () => {
    store.dispatch(socketActions.connectWs());
  };

  const disconnectWs = () => {
    store.dispatch(socketActions.disconnectWs());
  };

  const onMessage = () => {
    store.dispatch(socketActions.onMessage());
  };

  const changeCurrency = currency => {
    store.dispatch(actions.changeCurrency({currency}));
  };

  return {
    addCrypto,
    addSub,
    changeCurrency,
    changeTheme,
    connectWs,
    deleteCrypto,
    disconnectWs,
    editCrypto,
    editSub,
    getState,
    onMessage,
    refreshData,
    removeSub,
    subscribeStore,
  };
};
