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
import Separator from '../component/Separator';
import colors from '../config/colors';
import useStore from '../store/useStore';

function Portfolio({navigation}) {
  const {addCrypto, deleteCrypto, getState, subscribeStore} = useStore();
  const [darkMode, setDarkMode] = React.useState(getState().crypto.darkMode);
  const theme = darkMode ? 'dark' : 'light';
  const styles = createStyles(theme);
  const [data, setData] = React.useState([]);
  const [invested, setInvested] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [viewHeight, setViewHeight] = React.useState(0);
  const [viewTop, setViewTop] = React.useState(0);

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
        navigation.navigate('EditCurrency', {item: item, theme: theme})
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
        setData([]);
      }}>
      <Text style={{fontSize: 18, color: colors[theme].white}}>Delete</Text>
    </TouchableOpacity>
  );
  const renderItem = ({item, index}) => {
    return item ? (
      <Swipeable
        renderLeftActions={() => leftAction(item)}
        renderRightActions={() => rightAction(item)}>
        <Currency item={item} theme={theme} />
      </Swipeable>
    ) : null;
  };

  return (
    <SafeAreaView style={styles.container}>
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
        <InvestmentOverview invested={invested} theme={theme} />
      </View>
      <FlatList
        //contentContainerStyle={styles.flatlistContainer}
        data={data}
        ListEmptyComponent={() => null}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={() => setData(getState().crypto.cryptos)}
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
          addNewCurrency={(name, buyPrice, quantity, value) =>
            addCrypto({
              id: value,
              name: name,
              buyPrice: buyPrice,
              quantity: quantity,
            })
          }
          theme={theme}
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
      fontSize: 25,
      fontWeight: 'bold',
    },
    holdingsContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 24,
      backgroundColor: colors[theme].tertiary,
    },
    holdings: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    holdingsText: {
      color: colors[theme].blue,
      fontSize: 16,
    },
    holdingsNumberText: {
      color: colors[theme].white,
      fontSize: 12,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    holdingNumberCont: {
      backgroundColor: colors[theme].blueDark,
      alignItems: 'center',
      justifyContent: 'center',
      height: 20,
      width: 20,
      borderRadius: 20,
    },
    investmentContainer: {
      paddingHorizontal: 16,
      marginBottom: 16,
    },
    footerCont: {
      //position: 'absolute',
      bottom: 0,
    },
    flatlist: {
      backgroundColor: colors[theme].primary,
      bottom: 0,
    },
  });

export default Portfolio;
