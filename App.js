import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StackNavigation from './app/navigation/StackNavigation';

import configureStore from './app/store/configureStore';
import StoreContext from './app/store/context';
import colors from './app/config/colors';

function App() {
  const [storeLoading, setStoreLoading] = React.useState(true);
  const [store, setStore] = React.useState();
  React.useEffect(() => {
    setStoreLoading(true);
    AsyncStorage.getItem('store')
      .then(value => {
        if (value && value.length) {
          let initialStore = JSON.parse(value);
          console.log('Initial store: ', initialStore);
          setStore(configureStore(initialStore));
        } else {
          setStore(configureStore());
        }
        setStoreLoading(false);
      })
      .catch(error => {
        setStore(configureStore());
        console.log('Error in fetching store: ', error);
        setStoreLoading(false);
      });
  }, []);
  React.useEffect(() => {
    if (store) {
      let unsubscribe = store.subscribe(
        async () =>
          await AsyncStorage.setItem('store', JSON.stringify(store.getState())),
      );
    }
  }, [store]);

  return storeLoading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color={colors.dark.blue} />
    </View>
  ) : (
    <StoreContext.Provider value={{store}}>
      <StackNavigation />
    </StoreContext.Provider>
  );
}

export default App;
