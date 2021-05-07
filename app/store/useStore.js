import {useContext} from 'react';

import StoreContext from './context';
import * as actions from './cryptos';

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

  return {addCrypto, deleteCrypto, editCrypto, getState, subscribeStore};
};