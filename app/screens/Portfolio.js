import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import Currency from '../component/Currency';
import Footer from '../component/Footer';
import InvestmentOverview from '../component/InvestmentOverview';
import {ms, s, vs} from '../util/scale';
import Separator from '../component/Separator';
import colors from '../config/colors';
import useStore from '../store/useStore';

function Portfolio({navigation, route}) {
  const {
    addCrypto,
    addSub,
    connectWs,
    deleteCrypto,
    disconnectWs,
    getState,
    removeSub,
    subscribeStore,
  } = useStore();
  const [darkMode, setDarkMode] = React.useState(getState().crypto.darkMode);
  const theme = darkMode ? 'dark' : 'light';
  const styles = createStyles(theme);
  const [data, setData] = React.useState([]);
  const [invested, setInvested] = React.useState('0.00');
  const [current, setCurrent] = React.useState('0.00');
  const [refresh, setRefresh] = React.useState(false);
  const [viewHeight, setViewHeight] = React.useState(0);
  const [viewTop, setViewTop] = React.useState(0);
  const [ticker, setTicker] = React.useState({});
  const [currency, setCurrency] = React.useState(getState().crypto.currency);
  const [showMessage, setShowMessage] = React.useState(
    getState().socket.showMessage,
  );
  const {usdInr} = route.params;

  React.useEffect(() => {
    setRefresh(true);
    setData(getState().crypto.cryptos);
    setInvested(getState().crypto.investment);
    setRefresh(false);
    return () => unSubscribe();
  });

  let unSubscribe = subscribeStore(async () => {
    setData(await getState().crypto.cryptos);
    setInvested(await getState().crypto.investment);
    setDarkMode(await getState().crypto.darkMode);
    setTicker(await getState().socket.data);
    setCurrent(await getState().socket.current);
    setCurrency(await getState().crypto.currency);
    setShowMessage(await getState().socket.showMessage);
  });

  const leftAction = item => (
    <TouchableOpacity
      style={{
        backgroundColor: colors[theme].green,
        flex: 0.2,
        justifyContent: 'center',
        paddingHorizontal: 16,
      }}
      onPress={() =>
        navigation.navigate('EditCurrency', {
          item: item,
          theme: theme,
          usdInr: usdInr,
          currency: currency,
        })
      }>
      <Text style={{fontSize: 18, color: colors[theme].white}}>Edit</Text>
    </TouchableOpacity>
  );

  const rightAction = item => (
    <TouchableOpacity
      style={{
        backgroundColor: colors[theme].red,
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 16,
      }}
      onPress={() => {
        setRefresh(true);
        deleteCrypto(item);
        removeSub(item.id);
        setData([]);
        setRefresh(false);
      }}>
      <Text style={{fontSize: ms(18), color: colors[theme].white}}>Delete</Text>
    </TouchableOpacity>
  );
  const renderItem = ({item, index}) => {
    return item ? (
      <Swipeable
        renderLeftActions={() => leftAction(item)}
        renderRightActions={() => rightAction(item)}>
        <Currency
          item={item}
          theme={theme}
          ticker={ticker}
          currency={currency}
          usdInr={usdInr}
        />
      </Swipeable>
    ) : null;
  };

  const onRefresh = () => {
    setRefresh(true);
    disconnectWs();
    setTimeout(() => {
      connectWs();
      setRefresh(false);
    }, 4000);
  };

  return (
    <SafeAreaView style={styles.container}>
      {showMessage && (
        <View style={{backgroundColor: 'rgb(72,72,72)', padding: 8}}>
          <Text style={{color: 'white'}}>{getState().socket.message}</Text>
        </View>
      )}
      <View
        style={styles.holdingsContainer}
        onLayout={event => {
          var {height} = event.nativeEvent.layout;
          setViewTop(height);
        }}>
        <View style={styles.holdings}>
          <Text style={styles.holdingsText}>Holdings </Text>
          <View style={styles.holdingNumberCont}>
            <Text style={styles.holdingsNumberText}>{data.length}</Text>
          </View>
        </View>
        <Separator
          dashColor={colors[theme].blue}
          style={{
            width: '22%',
            marginVertical: 16,
            borderRadius: 100,
            overflow: 'hidden',
          }}
          dashThickness={2}
        />
      </View>
      <View
        style={{
          backgroundColor: colors[theme].tertiary,
          width: '100%',
          height: viewHeight / 2,
          position: 'absolute',
          top: viewTop,
        }}
      />
      <View
        style={styles.investmentContainer}
        onLayout={event => {
          var {height} = event.nativeEvent.layout;
          setViewHeight(height);
        }}>
        <InvestmentOverview
          invested={invested}
          theme={theme}
          current={current}
          currency={currency}
          usdInr={usdInr}
        />
      </View>
      <FlatList
        //contentContainerStyle={styles.flatlistContainer}

        data={data}
        ListEmptyComponent={() => null}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={onRefresh}
        renderItem={renderItem}
        refreshing={refresh}
        style={styles.flatlist}
        ItemSeparatorComponent={() => (
          <Separator dashColor={colors[theme].grey} dashStyle={{height: 0.5}} />
        )}
        decelerationRate={2}
      />
      <View style={styles.footerCont}>
        <Footer
          addNewCurrency={(name, buyPrice, quantity, value) => {
            addCrypto({
              id: value,
              name: name,
              buyPrice: buyPrice,
              quantity: quantity,
            });
            addSub(value, quantity);
          }}
          theme={theme}
          ticker={ticker}
          currency={currency}
          usdInr={usdInr}
        />
      </View>
    </SafeAreaView>
  );
}

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].primary,
      width: '100%',
      height: '100%',
    },
    portfolio: {
      padding: 16,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    portfolioText: {
      color: colors[theme].white,
      fontSize: ms(25),
      fontWeight: 'bold',
    },
    holdingsContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: vs(24),
      backgroundColor: colors[theme].tertiary,
    },
    holdings: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    holdingsText: {
      color: colors[theme].blue,
      fontSize: ms(16),
    },
    holdingsNumberText: {
      color: colors[theme].white,
      fontSize: ms(12),
      fontWeight: 'bold',
      textAlign: 'center',
    },
    holdingNumberCont: {
      backgroundColor: colors[theme].blueDark,
      alignItems: 'center',
      justifyContent: 'center',
      height: s(23),
      width: s(23),
      borderRadius: 20,
    },
    investmentContainer: {
      paddingHorizontal: 16,
      marginBottom: 16,
    },
    footerCont: {
      bottom: 0,
      zIndex: 1,
      elevation: 10,
    },
    flatlist: {
      backgroundColor: colors[theme].primary,
      bottom: 0,
    },
  });

export default Portfolio;
