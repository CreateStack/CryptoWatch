import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StackNavigation from './app/navigation/StackNavigation';

import configureStore from './app/store/configureStore';
import StoreContext from './app/store/context';
import colors from './app/config/colors';

const getUSDINR = () => {
  let rate = null;

  console.log('Rate: ', rate);
  return rate;
};

function App() {
  const [storeLoading, setStoreLoading] = React.useState(true);
  const [store, setStore] = React.useState();
  const [usdInr, setUsdInr] = React.useState();
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
      })
      .catch(error => {
        setStore(configureStore());
        console.log('Error in fetching store: ', error);
      });
    AsyncStorage.getItem('usd_inr')
      .then(value => {
        if (value && value.length) {
          let usd_inr = JSON.parse(value);
          if (Date.now() - usd_inr.timestamp > 8.64e7) {
            fetch(
              'https://free.currconv.com/api/v7/convert?q=USD_INR&compact=ultra&apiKey=29183e987f667a527de3',
            )
              .then(response => response.json())
              .then(data => {
                console.log('Data: ', data);
                data.timestamp = Date.now();
                AsyncStorage.setItem('usd_inr', JSON.stringify(data));
                setUsdInr(data.USD_INR);
                setStoreLoading(false);
              })
              .catch(error => {
                console.log('Erro fetching USD_INR: ', error);
                setUsdInr(usd_inr.USD_INR);
                setStoreLoading(false);
              });
          } else {
            setUsdInr(usd_inr.USD_INR);
            setStoreLoading(false);
          }
        }
        fetch(
          'https://free.currconv.com/api/v7/convert?q=USD_INR&compact=ultra&apiKey=29183e987f667a527de3',
        )
          .then(response => response.json())
          .then(data => {
            console.log('Data: ', data);
            data.timestamp = Date.now();
            AsyncStorage.setItem('usd_inr', JSON.stringify(data));
            setUsdInr(data.USD_INR);
            setStoreLoading(false);
          })
          .catch(error => {
            console.log('Erro fetching USD_INR: ', error);
            setUsdInr('');
            setStoreLoading(false);
          });
      })
      .catch(error => {
        setUsdInr('');
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
      <StackNavigation usdInr={usdInr} />
    </StoreContext.Provider>
  );
}

export default App;
