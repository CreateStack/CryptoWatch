import React from 'react';
import StackNavigation from './app/navigation/StackNavigation';

const SOCKET_URL = 'wss://ws-feed.pro.coinbase.com';
const ws = new WebSocket(SOCKET_URL);

function App() {
  /* const [btcData, setBtcData] = React.useState(true);
  const [ethData, setEthData] = React.useState(true);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setBtcData(d => !d);
      setEthData(d => !d);
    }, 60000);

    return clearInterval(interval);
  }, []);

  React.useEffect(() => {
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: 'subscribe',
          product_ids: ['ETH-USD', 'BTC-USD'],
          channels: [
            {
              name: 'ticker',
              product_ids: ['ETH-USD', 'BTC-USD'],
            },
          ],
        }),
      );
    };

    ws.onmessage = msg => {
      if (!btcData && !ethData) return;
      if (!msg) return;
      priceData = JSON.parse(msg.data);
      switch (priceData.product_id) {
        case 'ETH-USD':
          ethData && setPriceETH(priceData.price);
          setEthData(false);
          break;
        case 'BTC-USD':
          btcData && setPriceBTC(priceData.price);
          setBtcData(false);
          break;
        default:
          setBtcData(false);
          setEthData(false);
          break;
      }
    };
    ws.onerror = e => {
      console.log(e.message);
    };
    ws.onclose = e => {
      console.log(e.code, e.reason);
    };
  }, []);
  const [priceBTC, setPriceBTC] = React.useState(0);
  const [priceETH, setPriceETH] = React.useState(0);

  return (
    <View style={{...styles.container}}>
      <View style={styles.coin}>
        <View style={styles.coinDesc}>
          <Image
            source={{
              uri: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
            }}
            style={styles.icon}
          />
          <Text style={styles.coinText}>BTC</Text>
        </View>
        <Text>$ {priceBTC}</Text>
      </View>
      <View style={styles.coin}>
        <View style={styles.coinDesc}>
          <Image
            source={{
              uri:
                'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
            }}
            style={styles.icon}
          />
          <Text style={styles.coinText}>ETH</Text>
        </View>
        <Text>$ {priceETH}</Text>
      </View>
    </View> */
  return <StackNavigation />;
}

export default App;
