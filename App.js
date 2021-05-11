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
  const [usdInr, setUsdInr] = React.useState();
  React.useEffect(() => {
    setStoreLoading(true);
    AsyncStorage.getItem('store')
      .then(value => {
        if (value && value.length) {
          let initialStore = JSON.parse(value);
          console.log('Initial store: ', value);
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
          console.log('Expire USDT_INR: ', Date.now() - usd_inr.timestamp);
          if (Date.now() - usd_inr.timestamp > 600000) {
            fetch('https://api.coindcx.com/exchange/ticker')
              .then(response => response.json())
              .then(data => {
                let req = {};
                for (let i = 0; i < data.length; i++) {
                  if (data[i].market === 'USDTINR') {
                    req = data[i];
                    break;
                  }
                }
                let reqData = {USD_INR: req.last_price, timestamp: Date.now()};
                console.log('USD_INR: ', reqData);
                AsyncStorage.setItem('usd_inr', JSON.stringify(reqData));
                setUsdInr(reqData.USD_INR);
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
        fetch('https://api.coindcx.com/exchange/ticker')
          .then(response => response.json())
          .then(data => {
            let req = {};
            for (let i = 0; i < data.length; i++) {
              if (data[i].market === 'USDTINR') {
                req = data[i];
                break;
              }
            }
            let reqData = {USD_INR: req.last_price, timestamp: Date.now()};
            console.log('USD_INR: ', reqData);
            AsyncStorage.setItem('usd_inr', JSON.stringify(reqData));
            setUsdInr(reqData.USD_INR);
            setStoreLoading(false);
          })
          .catch(error => {
            console.log('Error fetching USD_INR: ', error);
            setUsdInr('');
            setStoreLoading(false);
          });
      })
      .catch(error => {
        console.log('Error in fetching store: ', error);
        fetch('https://api.coindcx.com/exchange/ticker')
          .then(response => response.json())
          .then(data => {
            let req = {};
            for (let i = 0; i < data.length; i++) {
              if (data[i].market === 'USDTINR') {
                req = data[i];
                break;
              }
            }
            let reqData = {USD_INR: req.last_price, timestamp: Date.now()};
            console.log('USD_INR: ', reqData);
            AsyncStorage.setItem('usd_inr', JSON.stringify(reqData));
            setUsdInr(reqData.USD_INR);
            setStoreLoading(false);
          })
          .catch(error => {
            console.log('Error fetching USD_INR: ', error);
            setUsdInr('');
            setStoreLoading(false);
          });
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
