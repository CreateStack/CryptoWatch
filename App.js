import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {w3cwebsocket as W3CWebSocket} from 'websocket';

import API_KEY from './app/config/auth';
import colors from './app/config/colors';

const client = new W3CWebSocket('ws://ws.coinapi.io/v1/');
function App() {
  const [data, setData] = React.useState();
  React.useEffect(() => {
    /*  client.onopen = () => {
      console.log('WebSocket Client Connected');
      client.send(
        JSON.stringify({
          type: 'hello',
          apikey: API_KEY.API_Key,
          heartbeat: false,
          subscribe_data_type: ['ohlcv'],
          subscribe_filter_asset_id: ['BTC', 'ETH'],
          subscribe_filter_period_id: ['10sec'],
          subscribe_filter_exchange_id: ['BINANCEFTS'],
        }),
      );
    }; */
  }, []);
  const [priceBTC, setPriceBTC] = React.useState();
  const [priceETH, setPriceETH] = React.useState();
  React.useEffect(() => {
    if (!data) return;
    const parsedData = JSON.parse(data);
    switch (parsedData.symbol_id.split('_')[2]) {
      case 'BTC':
        setPriceBTC(parsedData.price_close);
        break;
      case 'ETH':
        setPriceETH(parsedData.price_close);
        break;
      default:
        break;
    }
  }, [data]);

  fetch;

  return (
    <View style={styles.container}>
      <View style={styles.coin}>
        <View style={styles.coinDesc}>
          <Image
            source={{
              uri:
                'https://s3.eu-central-1.amazonaws.com/bbxt-static-icons/type-id/png_16/f231d7382689406f9a50dde841418c64.png',
            }}
            style={styles.icon}
          />
          <Text style={styles.coinText}>BTC</Text>
        </View>
        <Text>{priceBTC}</Text>
      </View>
      <View style={styles.coin}>
        <View style={styles.coinDesc}>
          <Image
            source={{
              uri:
                'https://s3.eu-central-1.amazonaws.com/bbxt-static-icons/type-id/png_16/04836ff3bc4d4d95820e0155594dca86.png',
            }}
            style={styles.icon}
          />
          <Text style={styles.coinText}>ETH</Text>
        </View>
        <Text>{priceETH}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  coin: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    paddingHorizontal: 8,
    paddingVertical: 16,
    width: '100%',
  },
  coinDesc: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  coinText: {
    color: colors.black,
    fontSize: 20,
    lineHeight: 21,
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.greyLight,
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  icon: {
    height: 16,
    width: 16,
    marginRight: 10,
  },
});

export default App;
