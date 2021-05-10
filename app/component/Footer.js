import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';

import colors from '../config/colors';
import getPrice from '../util/getPrice';
import AddCurrency from './AddCurrency';

function Footer({addNewCurrency = () => {}, theme, ticker, usdInr, currency}) {
  let sumPrev = 0;
  let sumNow = 0;
  let profit = 0;
  let profitPer = 0;
  for (var sub in ticker) {
    sumPrev = sumPrev + ticker[sub].close * ticker[sub].quantity;
    sumNow = sumNow + ticker[sub].price * ticker[sub].quantity;
  }
  if (sumPrev != 0) {
    profit = sumNow - sumPrev;
    profitPer = (profit * 100) / sumPrev;
  }
  const styles = createStyles(theme);
  const [addCurrencyVisible, setAddCurrencyVisible] = React.useState(false);
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.desc}>Today's P&L</Text>
        <TouchableOpacity
          style={styles.addContainer}
          onPress={() => setAddCurrencyVisible(visible => !visible)}>
          <Icon name="pluscircleo" size={30} color={colors[theme].blue} />
        </TouchableOpacity>
        <View style={styles.figures}>
          <Text
            style={{
              ...styles.number,
              color: profit >= 0 ? colors[theme].green : colors[theme].red,
            }}>
            {(profit >= 0 ? '+' : '') +
              getPrice(profit, usdInr, currency, 4) +
              ' '}
          </Text>
          <Text
            style={{
              ...styles.percent,
              color: profitPer >= 0 ? colors[theme].green : colors[theme].red,
            }}>
            {' ' +
              (profitPer >= 0 ? '+' : '') +
              Number(profitPer).toFixed(2) +
              '%'}
          </Text>
        </View>
      </View>
      <AddCurrency
        onAddPress={addNewCurrency}
        setVisible={setAddCurrencyVisible}
        visible={addCurrencyVisible}
        theme={theme}
        usdInr={usdInr}
        currency={currency}
      />
    </>
  );
}

const createStyles = theme =>
  StyleSheet.create({
    addContainer: {
      backgroundColor: colors[theme].secondary,
      position: 'absolute',
      left: Dimensions.get('window').width / 2 - 20,
      top: -22,
      borderWidth: 8,
      borderRadius: 100,
      borderColor: colors[theme].secondary,
      elevation: 3,
    },
    container: {
      backgroundColor: colors[theme].secondary,
      paddingHorizontal: 16,
      paddingVertical: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: Dimensions.get('window').width,
      elevation: 10,
    },
    figures: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    desc: {
      color: colors[theme].white,
      fontSize: 16,
    },
    number: {
      color: colors[theme].red,
      fontSize: 16,
    },
    percent: {
      color: colors[theme].red,
      fontSize: 14,
    },
  });

export default Footer;
